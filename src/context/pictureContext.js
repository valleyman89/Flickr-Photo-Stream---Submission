import React, { createContext, useEffect, useState } from "react";

export const PictureContext = createContext();

export const formatImageData = (images) => {
  const imageObject = images.map((image) => ({
    ...image,
    shortAuthor: image.author
      .slice(0, image.author.length - 2)
      .split('("')
      .pop(),
    splitTags: image.tags === "" ? (image.tags = []) : image.tags.split(" "),
    title: image.title.length < 2 ? "untitled" : image.title,
    shortDescription: image.description.split("/></a></p>").pop(),
  }));

  return imageObject;
};

export const PictureProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [scrollStatus, setScrollStatus] = useState(false);
  const [search, setSearch] = useState();
  const [sfwMode, setSfwMode] = useState(false);

  useEffect(() => {
    const flickrApiCall = async () => {
      try {
        const url =
          "feeds/photos_public.gne?format=json&nojsoncallback=1&safe_search=1&tags=cat";
        const response = await fetch(url);
        let dataToJson = await response.json();
        setPictures([...pictures, ...formatImageData(dataToJson.items)]);
      } finally {
        setLoading(false);
      }
    };
    flickrApiCall();
  }, [scrollStatus]);

  const getTags = (tagArray, maxNumberOfTags) => {
    return maxNumberOfTags > 0 ? tagArray.slice(0, maxNumberOfTags) : tagArray;
  };

  return (
    <PictureContext.Provider
      value={{
        loading,
        pictures,
        search,
        sfwMode,
        getTags,
        setPictures,
        setScrollStatus,
        setSearch,
        setSfwMode,
      }}
    >
      {children}
    </PictureContext.Provider>
  );
};

export const usePictureContext = () => {
  return React.useContext(PictureContext);
};
