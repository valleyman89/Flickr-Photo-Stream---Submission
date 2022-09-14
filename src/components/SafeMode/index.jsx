import React from "react";
import { usePictureContext } from "../../context/pictureContext";
import "./SafeMode.css";

const SafeMode = () => {
  const { sfwMode, setSfwMode } = usePictureContext();
  return (
    <button
      className="safe-mode-btn pointer"
      onClick={() => (sfwMode ? setSfwMode(false) : setSfwMode(true))}
    >
      {sfwMode ? "🙀" : "🐱"}
    </button>
  );
};

export default SafeMode;
