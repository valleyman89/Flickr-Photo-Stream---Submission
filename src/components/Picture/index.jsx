import React, { useState, Suspense } from "react";
import { usePictureContext } from "../../context/pictureContext";
import Loading from "../common/loading";
import "./Picture.css";
const PictureModal = React.lazy(() => import("../PictureModal"));

const Picture = (props) => {
  const { picture } = props;
  const { sfwMode, getTags } = usePictureContext();
  const [openModal, setOpenModal] = useState(false);

  let tags = getTags(picture.splitTags, 10);

  return (
    <div className="picture-container">
      <div
        className={"picture margin shadow" + (sfwMode ? " safe-mode" : "")}
        style={{
          backgroundImage: `url(${picture.media.m})`,
        }}
      >
        <button
          className="picture pointer btn"
          onClick={() => setOpenModal(true)}
          name={picture.author_id}
          aria-label={picture.author_id}
        ></button>
      </div>
      <span className="title-container truncate">
        <span>
          <a href={picture.link} rel="noreferrer" target="_blank">
            {picture.title}
          </a>
          {" by "}
          <a
            href={`https://www.flickr.com/photos/${picture.author_id}`}
            rel="noreferrer"
            target="_blank"
          >
            {picture.shortAuthor}
          </a>
        </span>
      </span>
      <div
        className="picture-description truncate"
        dangerouslySetInnerHTML={{ __html: picture.shortDescription }}
      ></div>
      <ul className="tags">
        {tags.map((tag, index) => (
          <li key={index}>{tag.slice(0, 21)}</li>
        ))}
      </ul>
      {openModal && (
        <Suspense fallback={<Loading />}>
          <PictureModal
            picture={picture}
            tags={tags}
            closeModal={setOpenModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Picture;
