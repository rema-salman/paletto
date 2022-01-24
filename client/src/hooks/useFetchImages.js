import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://paletto-app.herokuapp.com/api/images";

export default function useFetchImages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const submitRequest = (query, page) => {
    setSearchQuery(query);
    setError(false);
    setLoading(true);
    setImages([]);
    setCurrentPage(page);

    // get data from server
    axios
      .get(`${BASE_URL}?query=${query}&page=${page}`)
      .then((res) => {
        console.log(res);

        //  sucess but empty data
        if (res.data.images.length === 0 || res.data.total_pages === 0) {
          setLoading(false);
          setError("There are no results for your search");
        } else {
          setLoading(false);
          console.log(res.data.total_pages);
          setImages(res.data.images);
          setTotalPages(res.data.total_pages);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError("Something went wrong");
      });
  };

  return {
    images,
    loading,
    error,
    query,
    totalPages,
    currentPage,
    submitRequest,
  };
}
