import React, { createContext, useState, useEffect } from "react";

// initial state
const initialState = {
  selectedImages: localStorage.getItem("selectedImages")
    ? JSON.parse(localStorage.getItem("selectedImages"))
    : [],
};

// create context
export const useSelectionContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(
      "selectedImages",
      JSON.stringify(state.selectedImages)
    );
  }, [state]);

  // actions
  const addImageToSelectedImagesList = (imageCard) => {
    setState({
      ...state,
      selectedImages: [...state.selectedImages, imageCard],
    });
  };

  const removeImageFromSelectedImagesList = (imageCard) => {
    setState({
      ...state,
      selectedImages: state.selectedImages.filter(
        (currentImage) => currentImage.image.id !== imageCard.image.id
      ),
    });
  };

  const removeSelections = () => {
    localStorage.removeItem("selectedImages");
    localStorage.clear();
    setState({ selectedImages: [] });
  };

  return (
    <useSelectionContext.Provider
      value={{
        selectedImages: state.selectedImages,
        addImageToSelectedImagesList,
        removeImageFromSelectedImagesList,
        removeSelections,
      }}
    >
      {props.children}
    </useSelectionContext.Provider>
  );
};
