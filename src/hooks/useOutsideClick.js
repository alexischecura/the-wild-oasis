import { useEffect, useRef } from "react";

export function useOutsideClick(handle, useCapture = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handle();
        }
      }

      document.addEventListener("click", handleClick, useCapture);

      return function () {
        document.removeEventListener("click", handleClick, useCapture);
      };
    },
    [handle, useCapture]
  );
  return ref;
}
