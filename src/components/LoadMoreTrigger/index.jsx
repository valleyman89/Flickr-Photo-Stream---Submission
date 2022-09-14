import React from "react";
import { usePictureContext } from "../../context/pictureContext";
import { useInView } from "react-intersection-observer";

const LoadMoreTrigger = () => {
  const { setScrollStatus } = usePictureContext();
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div ref={ref}>
      <span style={{ display: "none" }}>
        {setTimeout(() => setScrollStatus(inView), 0)}
      </span>
    </div>
  );
};

export default LoadMoreTrigger;
