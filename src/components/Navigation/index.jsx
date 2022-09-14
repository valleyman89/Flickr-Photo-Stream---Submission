import React from "react";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div>
      <h1 className="pointer">
        <a style={{ all: "unset" }} href="/">
          Flickr Photo Stream
        </a>
        <strong>tap a photo to see more...</strong>
      </h1>
    </div>
  );
};

export default Navigation;
