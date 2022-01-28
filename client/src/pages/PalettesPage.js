import React, {
  Fragment,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import useFetchPalettes from "../hooks/useFetchPalettes";
import { useSelectionContext } from "../hooks/useSelectionContext";

import Loader from "../components/Loader";
import Error from "../components/Error";

import styles from "./HomePage.module.css";
import { FaLessThan } from "react-icons/fa";
import useFBTracker from "../hooks/useFBTracker";

function PalettesPage() {
  const { selectedImages } = useContext(useSelectionContext);

  const {
    error1,
    loading1,
    mainPalette,
    secondaryPalettes,
    getPalettes,
    getRGBColors,
    getCMYKColors,
  } = useFetchPalettes();

  const [coppied, setCoppied] = useState(false);

  const optionRef = useRef(null);

  const [optionsDisabled, setOptionDisabled] = useState({
    HEX: true,
    RGB: false,
    CMYK: false,
  });

  const { addEventToTracker } = useFBTracker();

  // Use effect to envoke getting the palettes
  useEffect(() => {
    getPalettes(selectedImages);
  }, []);

  function handleOptionChange(e) {
    e.preventDefault();
    if (e.target.value === "0") {
      setOptionDisabled({
        HEX: true,
        RGB: false,
        CMYK: false,
      });
      addEventToTracker(
        "Palette",
        "color_mode_changed",
        "Selected Color_Mode: HEX"
      );
    } else if (e.target.value === "1") {
      setOptionDisabled({
        HEX: false,
        RGB: true,
        CMYK: false,
      });
      addEventToTracker(
        "Palette",
        "color_mode_changed",
        "Selected Color_Mode: RGB"
      );
    } else if (e.target.value === "2") {
      setOptionDisabled({
        HEX: false,
        RGB: false,
        CMYK: true,
      });
      addEventToTracker(
        "Palette",
        "color_mode_changed",
        "Selected Color_Mode: CMYK"
      );
    }
  }

  function handleMainColorsCoppy(index) {
    if (optionRef.current.value === "0") {
      navigator.clipboard.writeText(mainPalette[index]);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${mainPalette[index]}`
      );
    } else if (optionRef.current.value === "1") {
      // convert HEX to RGB
      const colorModeRGB = getRGBColors();
      // needs to be coppied like this (1,78,143)
      var indexColorStr = `(${colorModeRGB.RGBList[index][0]},${colorModeRGB.RGBList[index][1]},${colorModeRGB.RGBList[index][2]})`;
      navigator.clipboard.writeText(indexColorStr);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${indexColorStr}`
      );
    } else if (optionRef.current.value === "2") {
      // convert HEX to CMYK
      const colorModeCMYK = getCMYKColors();
      var indexColorStr = `(${colorModeCMYK.CMYKList[index][0]},${colorModeCMYK.CMYKList[index][1]},${colorModeCMYK.CMYKList[index][2]})`;
      navigator.clipboard.writeText(indexColorStr);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${indexColorStr}`
      );
    }
    setCoppied("Coppied!");
  }

  function handleSecondaryColorsCoppy(index, innerIndex) {
    if (optionRef.current.value === "0") {
      navigator.clipboard.writeText(secondaryPalettes[index][innerIndex]);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${secondaryPalettes[index][innerIndex]}`
      );
    } else if (optionRef.current.value === "1") {
      // convert HEX to RGB
      const colorModeRGB = getRGBColors();
      // needs to be coppied like this (1,78,143)
      var indexColorStr = `(${colorModeRGB.RGBList2[index][innerIndex][0]},${colorModeRGB.RGBList2[index][innerIndex][1]},${colorModeRGB.RGBList2[index][innerIndex][2]})`;
      navigator.clipboard.writeText(indexColorStr);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${indexColorStr}`
      );
    } else if (optionRef.current.value === "2") {
      // convert HEX to CMYK
      const colorModeCMYK = getCMYKColors();
      var indexColorStr = `(${colorModeCMYK.CMYKList2[index][innerIndex][0]},${colorModeCMYK.CMYKList2[index][innerIndex][1]},${colorModeCMYK.CMYKList2[index][innerIndex][2]})`;
      navigator.clipboard.writeText(indexColorStr);
      addEventToTracker(
        "Palette",
        "clipboard_color_coppied",
        `color_coppied: ${indexColorStr}`
      );
    }
    setCoppied("Coppied!");
  }

  // For showing coppied MSG for a second then remove it
  function delayState() {
    setTimeout(() => {
      setCoppied(false);
    }, 1000);
  }

  return (
    <Fragment>
      <div className="d-flex m-5 justify-content-around align-items-center flex-wrap">
        <Link to="/" className={`btn  ${styles.button}`}>
          <FaLessThan style={{ marginRight: "0.5rem" }} />
          Back
        </Link>
        <div>
          <h5>Color Mode</h5>
          <select
            ref={optionRef}
            defaultValue={"0"}
            className="form-select"
            aria-label="Default select example "
            onChange={(e) => handleOptionChange(e)}
          >
            <option value="0" disabled={optionsDisabled.HEX}>
              HEX
            </option>
            <option value="1" disabled={optionsDisabled.RGB}>
              RGB
            </option>
            <option value="2" disabled={optionsDisabled.CMYK}>
              CMYK
            </option>
          </select>
        </div>
      </div>
      {loading1 && <Loader />}
      {error1 && <Error />}
      {/* show coppid message */}
      {delayState()}
      {coppied ? <p style={{ textAlign: "center" }}>{coppied}</p> : null}
      {/* COLOR PALETTES */}
      {mainPalette.length > 0 && secondaryPalettes.length > 0 ? (
        <div
          className="container"
          style={{ height: "75vh", overflowY: "scroll" }}
        >
          <div className="d-flex m-2 justify-content-center align-items-center">
            {mainPalette.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "10rem",
                  height: "5rem",
                  padding: "2rem",
                  backgroundColor: color,
                }}
                onClick={() => {
                  console.log(index);
                  handleMainColorsCoppy(index);
                }}
              />
            ))}
          </div>
          {secondaryPalettes.map((palette, keyInd) => (
            <div
              key={keyInd}
              className="d-flex m-2 justify-content-center align-items-center"
            >
              {palette.map((color, index) => (
                <div
                  key={index}
                  // className={styles.color}
                  style={{
                    width: "10rem",
                    height: "5rem",
                    padding: "2rem",
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    console.log(keyInd, index);
                    handleSecondaryColorsCoppy(keyInd, index);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default PalettesPage;
