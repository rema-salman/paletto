import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { Link } from "react-router-dom";

import useFetchImages from "../hooks/useFetchImages";
import { useSelectionContext } from "../hooks/useSelectionContext";

import Header from "../components/Header";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Form from "../components/Form";
import ImageCard from "../components/ImageCard/ImageCard";
import Pagination from "../components/Pagination";

import styles from "./HomePage.module.css";
import useFBTracker from "../hooks/useFBTracker";

function HomePage() {
  const [page, setPage] = useState(1);
  const {
    images,
    loading,
    error,
    query,
    totalPages,
    currentPage,
    submitRequest,
  } = useFetchImages();

  const { selectedImages, removeSelections } = useContext(useSelectionContext);

  function onSubmit(value) {
    submitRequest(value, page);
  }

  const isScreenMounted = useRef(true);
  useEffect(() => {
    return () => (isScreenMounted.current = false);
  }, []);

  const { addEventToTracker } = useFBTracker();

  return (
    <Fragment>
      {/* Form */}
      {selectedImages.length === 0 && query === "" ? (
        <Form submitSearch={onSubmit} />
      ) : (
        <Header submitSearch={onSubmit} query={query} />
      )}

      {/* Error */}
      {error && <Error message={error} />}

      {/* Loader */}
      {loading && (
        <Fragment>
          <Loader />
          {addEventToTracker("Performance", "search_results_loading", "")}
        </Fragment>
      )}

      <div className="row">
        {/* SelectedImages container */}
        {selectedImages && selectedImages.length > 0 ? (
          <div className="col-3">
            {/* selected images */}
            <h3 className="m-3" style={{ textAlign: "center" }}>
              Selected Images
            </h3>
            <div className="d-flex justify-content-around align-items-center">
              <Link
                to="/palettes"
                className={`btn ${styles.button}`}
                onClick={() =>
                  addEventToTracker(
                    "Palette-Generation",
                    "get_Palettes_btn_clicked",
                    `N of selected images:${selectedImages.length}`
                  )
                }
              >
                Get Palettes
              </Link>
              <button
                type="submit"
                className={`btn ${styles.deleteBtn}`}
                onClick={() => {
                  removeSelections();
                  addEventToTracker(
                    "Selection",
                    "remove_all_btn_clicked",
                    `N of selected images:${selectedImages.length}`
                  );
                }}
              >
                Remove All
              </button>
            </div>

            <div
              className={`d-flex m-3 justify-content-around align-items-center flex-wrap ${styles.selectionWraper}`}
            >
              {!loading && selectedImages.length > 0
                ? selectedImages.map((item) => (
                    <ImageCard
                      key={item.image.id}
                      image={item.image}
                      palette={item.palette}
                      isSmall={true}
                    />
                  ))
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Images container */}
        {images && images.length > 0 ? (
          <div className={selectedImages.length > 0 ? "col-9" : ""}>
            {totalPages === 1 ? (
              ""
            ) : (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                query={query}
                submitRequest={submitRequest}
              />
            )}
            <div
              className={`d-flex m-3 justify-content-around align-items-center flex-wrap ${styles.imageGridWrapper}`}
            >
              {images.map((image) => (
                <ImageCard
                  image={image.img}
                  palette={image.fiveColors}
                  key={image.img.id}
                  isSmall={false}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default HomePage;
