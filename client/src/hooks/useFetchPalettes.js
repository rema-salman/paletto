import { useState } from "react";
import axios from "axios";
import convert from "color-convert";

const BASE_URL = "https://paletto.glitch.me/api/palettes";

export default function useFetchPalettes(selectedImages) {
  const [loading1, setLoading] = useState(false);
  const [error1, setError] = useState(false);

  const [mainPalette, setPalette] = useState([]);
  const [secondaryPalettes, setPalettes] = useState([]);
  const [RGBPalettes, setRGBPalettes] = useState(null);

  const getPalettes = (selectedImages) => {
    let selectedImagesWithoutPalettes = [];
    selectedImages.forEach((element) => {
      selectedImagesWithoutPalettes.push(element.image);
    });

    setError(false);
    setLoading(true);
    setPalettes([]);

    // get data from server
    axios
      .post(BASE_URL, selectedImagesWithoutPalettes)
      .then((res) => {
        // console.log(res.data);

        setPalette(res.data.mainPalette);

        let middle = Math.ceil(res.data.finalPalettes.length / 25);

        let middle1 = Math.ceil(res.data.finalPalettes.length / 50);
        let last = Math.ceil(res.data.finalPalettes.length / 100);

        let middelArr = res.data.finalPalettes.slice(middle, middle + 2);
        let invento = res.data.finalPalettes.slice(middle1, middle1 + 2);
        let lastArr = res.data.finalPalettes.slice(last, last + 2);

        setPalettes([
          ...res.data.finalPalettes.slice(0, 3),
          ...middelArr,
          ...invento,
          ...lastArr,
        ]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError("Something went wrong");
      });
  };

  const getRGBColors = () => {
    const RGBList = [];
    const RGBList2 = [];
    mainPalette.forEach((element) => {
      const HEXcolor = element.replace("#", "");
      const RGB = convert.hex.rgb(HEXcolor);
      RGBList.push(RGB);
    });

    secondaryPalettes.forEach((element) => {
      const elementsList = [];
      for (let i = 0; i < element.length; i++) {
        const HEXcolor = element[i].replace("#", "");
        const RGB = convert.hex.rgb(HEXcolor);
        elementsList.push(RGB);
      }
      RGBList2.push(elementsList);
    });
    return {
      RGBList,
      RGBList2,
    };
  };

  const getCMYKColors = () => {
    const CMYKList = [];
    const CMYKList2 = [];
    mainPalette.forEach((element) => {
      const HEXcolor = element.replace("#", "");
      const CMYK = convert.hex.rgb(HEXcolor);
      CMYKList.push(CMYK);
    });

    secondaryPalettes.forEach((element) => {
      const elementsList = [];
      for (let i = 0; i < element.length; i++) {
        const HEXcolor = element[i].replace("#", "");
        const CMYK = convert.hex.rgb(HEXcolor);
        elementsList.push(CMYK);
      }
      CMYKList2.push(elementsList);
    });
    return {
      CMYKList,
      CMYKList2,
    };
  };

  return {
    loading1,
    error1,
    mainPalette,
    secondaryPalettes,
    getPalettes,
    getRGBColors,
    getCMYKColors,
  };
}
