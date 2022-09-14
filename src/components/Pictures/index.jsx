import React, { Suspense } from "react";
import { usePictureContext } from "../../context/pictureContext";
import Loading from "../common/loading";
import "./Pictures.css";
const Picture = React.lazy(() => import("../Picture"));

const Pictures = () => {
  const { pictures, search } = usePictureContext();
  return (
    <div className="pictures margin">
      {pictures &&
        pictures
          .filter((picture) => {
            const photoTitle = picture.title.trim().toLowerCase();
            const photoTags = picture.splitTags;
            const combinedSearch = [photoTitle, ...photoTags];

            return !search ? picture : combinedSearch.includes(search);
          })
          .filter(
            (originalPicture, pictureIndex, newPictures) =>
              newPictures.findIndex((newPicture) => {
                return newPicture.link === originalPicture.link;
              }) === pictureIndex
          )
          .map((picture, index) => (
            <Suspense key={index} fallback={<Loading />}>
              <Picture picture={picture} />
            </Suspense>
          ))}
    </div>
  );
};

export default Pictures;
