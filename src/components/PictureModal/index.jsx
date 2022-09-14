import React from "react";
import { usePictureContext } from "../../context/pictureContext";
import "./PictureModal.css";

const PictureModal = ({ picture, tags, closeModal }) => {
  const { setSearch, getTags } = usePictureContext();

  const handleTag = (tag) => {
    setSearch(tag);
    closeModal(false);
  };

  tags = getTags(tags, 0);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div>
          <button
            className="pointer close"
            onClick={() => {
              closeModal(false);
            }}
          >
            close
          </button>
        </div>
        <div
          className="modal-description"
          dangerouslySetInnerHTML={{ __html: picture.description }}
        ></div>
        <h3>{picture.title}</h3>
        <div className="modal-tags">
          {tags.map((tag, index) => (
            <button
              onClick={() => handleTag(tag)}
              className="modal-tag"
              key={index}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PictureModal;
