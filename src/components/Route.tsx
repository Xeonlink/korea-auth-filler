import { useEffect, useState } from "react";

type RouterProps = React.PropsWithChildren<{
  path: string;
}>;

export function Route(props: RouterProps) {
  const { path, children } = props;
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const ctrl = new AbortController();
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("navigate", onLocationChange, { signal: ctrl.signal });

    return () => ctrl.abort();
  }, []);

  return currentPath === path ? children : null;
}
