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

  const useNavigate = () => {
    const navigate = (path: InferPath<R>) => {
      window.history.pushState({}, "", path as string);
    };

    return navigate;
  };

  return {
    router: routeMap as Map<InferPath<R>, () => React.ReactNode>,
    useNavigate,
  };
}

// const { useNavigate, router } = createRouter([
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

type RouterProps<T extends string> = {
  router: Map<T, () => React.ReactNode>;
  defaultPath: T;
};

export function Router<T extends string>(props: RouterProps<T>) {
  const { router } = props;
  console.log(window.location.hash);
  const [currentPath, setCurrentPath] = useState<T>(
    router.has(window.location.hash as T) ? (window.location.hash as T) : props.defaultPath,
  );

  useEffect(() => {
    const ctrl = new AbortController();
    const onLocationChange = () => setCurrentPath(window.location.hash as T);
    window.addEventListener("popstate", onLocationChange, { signal: ctrl.signal });

    return () => ctrl.abort();
  }, []);

  return router.get(currentPath) ? createElement(router.get(currentPath)!) : null;
}
