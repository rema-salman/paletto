import React, { useState, useEffect, useContext } from "react";
import { useSelectionContext } from "../../hooks/useSelectionContext";
import styles from "./ImagesCard.module.css";
import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import useFBTracker from "../../hooks/useFBTracker";

export default function ImageCard({ image, palette, isSmall }) {
  const {
    selectedImages,
    addImageToSelectedImagesList,
    removeImageFromSelectedImagesList,
  } = useContext(useSelectionContext);

  const [isSelected, setIsSelected] = useState(false);
  const { addEventToTracker } = useFBTracker();
  useEffect(() => {
    const storedImage = selectedImages.find(
      (object) => object.image.id === image.id
    );

    if (storedImage) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedImages, image]);

  const handleClick = () => {
    const imagesCard = { image, palette };
    if (isSelected) {
      removeImageFromSelectedImagesList(imagesCard);
      addEventToTracker(
        "Selection",
        "removed_image_btn_clicked",
        `imageID: ${imagesCard.image.id}`
      );
    } else {
      addImageToSelectedImagesList(imagesCard);
      addEventToTracker(
        "Selection",
        "add_image_btn_clicked",
        `imageID: ${imagesCard.image.id}`
      );
    }
  };

  return (
    <div
      key={image.id}
      style={{
        height: isSmall ? "10rem" : "20rem",
        width: isSmall ? "20rem" : "20rem",
      }}
      className={`card m-4 ${styles.card}`}
    >
      <div
        className={styles.addBtn}
        style={{ backgroundColor: isSelected ? "#E55336" : "#60c95d" }}
        onClick={handleClick}
      >
        <p>{isSelected ? <FaRegTrashAlt /> : <FaRegHeart />}</p>
      </div>
      <img
        className={`card-img-top ${styles.img}`}
        style={{ height: isSmall ? "6rem" : "15rem" }}
        src={image.urls.regular}
        alt="Card image cap"
      />
      <div
        className={`d-flex justify-content-between align-items-center flex-wrap ${styles.colors_wrapper}`}
      >
        {palette.map((color, index) => (
          <div
            key={index}
            className={styles.color}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
