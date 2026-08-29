import { useEffect, useRef } from "react";

function useAutoScroll([chatMessages, isLoading]){
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  return containerRef;

}

export default useAutoScroll;