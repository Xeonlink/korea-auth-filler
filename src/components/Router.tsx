import { useEffect, useState, createElement } from "react";

type PathString<T extends string> = T extends `${infer U}/${infer V}`
  ? U extends string
    ? V extends string
      ? never
      : U
    : never
  : T;

type Route<T extends string> =
  | {
      path: PathString<T>;
      render: () => React.ReactNode;
    }
  | {
      path: PathString<T>;
      routes: Route<T>[];
    };

type InferPath<T extends Route<string>[]> = T extends (infer R)[]
  ? R extends {
      path: infer U extends string;
      render: () => React.ReactNode;
      routes: infer R2 extends Route<string>[];
    }
    ? `/${U}` | `/${U}${InferPath<R2>}`
    : R extends {
          path: infer U extends string;
          render: () => React.ReactNode;
        }
      ? `/${U}`
      : R extends {
            path: infer U extends string;
            routes: infer R2 extends Route<string>[];
          }
        ? `/${U}${InferPath<R2>}`
        : never
  : never;

class Router<T extends string> {
  private routeMap: Map<T, () => React.ReactNode>;
  private subscribers: (() => void)[];
  private currentPath: T;

  constructor(routeMap: Map<T, () => React.ReactNode>) {
    this.subscribers = [];
    this.routeMap = routeMap;
    this.currentPath = window.location.hash as T;
  }

  public subscribe(callback: () => void) {
    this.subscribers.push(callback);

    return () => {
      this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
    };
  }

  public notify() {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  }

  public getRouteMap() {
    return this.routeMap;
  }

  public navigate(path: T) {
    this.currentPath = path;

    const url = new URL(window.location.href);
    url.hash = path;
    window.history.pushState({}, "", url.toString());
    this.notify();
  }

  public getCurrentPath() {
    return this.currentPath;
  }
}

export function createRouter<T extends string, R extends Route<T>[] = Route<T>[]>(routes: R) {
  const routeMap = new Map<string, () => React.ReactNode>();

  const dfs = (basePath: string, routes: Route<string>[]) => {
    for (const route of routes) {
      if ("render" in route) {
        routeMap.set(`${basePath}/${route.path}`, route.render);
      }
      if ("routes" in route) {
        dfs(`${basePath}/${route.path}`, route.routes);
      }
    }
  };
  dfs("", routes);

  return new Router(routeMap as Map<InferPath<R>, () => React.ReactNode>);
}

// const router = createRouter([
//   {
//     path: "test",
//     routes: [
//       {
//         path: "profile",
//         render: () => <div>Profile</div>,
//       },
//     ],
//   },
//   {
//     path: "tes1",
//     render: () => <div>Home</div>,
//     routes: [
//       {
//         path: "profile1",
//         routes: [
//           {
//             path: "profile2",
//             render: () => <div>Profile2</div>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

export function useNavigate<T extends string>(router: Router<T>) {
  const navigate = (path: T) => {
    router.navigate(path);
  };

  return navigate;
}

type RouterProps<T extends string> = {
  router: Router<T>;
  defaultPath: T;
};

export function RouteProvider<T extends string>(props: RouterProps<T>) {
  const { router, defaultPath } = props;

  const routeMap = router.getRouteMap();
  const [currentPath, setCurrentPath] = useState<T>(defaultPath);

  useEffect(() => {
    return router.subscribe(() => {
      setCurrentPath(router.getCurrentPath());
    });
  }, []);

  return routeMap.get(currentPath) ? createElement(routeMap.get(currentPath)!) : null;
}

// export function Test() {
//   return <RouteProvider defaultPath="/test/profile" router={router} />;
// }
