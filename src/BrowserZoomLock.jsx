import { useEffect } from "react";

export default function BrowserZoomLock() {
  useEffect(() => {
    const preventBrowserZoom = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ["+", "=", "-", "_", "0"].includes(event.key)
      ) {
        event.preventDefault();
      }
    };

    const preventWheelZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", preventBrowserZoom, true);
    document.addEventListener("wheel", preventWheelZoom, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener("keydown", preventBrowserZoom, true);
      document.removeEventListener("wheel", preventWheelZoom, true);
    };
  }, []);

  return null;
}
