import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToStart = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.getElementById("bottom-container").scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
