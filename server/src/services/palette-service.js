const Jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas");
const kmeans = require("node-kmeans");
const convert = require("color-convert");

class PaletteService {
  async resizeImages(images) {
    const resultListWithSresizedImage64 = [];
    await Promise.all(
      images.map(async (img) => {
        const image = await Jimp.read(img.urls.regular);
        await image.resize(200, 200);
        await image.quality(100);
        const resizedImage64 = await image.getBase64Async(Jimp.MIME_PNG);

        resultListWithSresizedImage64.push({ img, resizedImage64 });
      })
    );

    return resultListWithSresizedImage64;
  }

  async getImageData(images) {
    const resultListWithImageData = [];
    for (const item of images) {
      try {
        // load the current image
        const image = await loadImage(item.resizedImage64);
        // create a new canvas using same dimensions as the images
        const canvas = createCanvas(200, 200);
        // isolate the context
        const ctx = canvas.getContext("2d");
        // draw image onto canvas starting at coordinate 0,0
        ctx.drawImage(image, 0, 0);
        // grab image data from canvas
        const imageData = ctx.getImageData(0, 0, 200, 200);
        // isolate pixel by pixel data
        const rgba = imageData.data;
        // total number of pixels
        const totalPixels = 200 * 200;
        //  total number of values [r,g,b,a,r,g,b,a....]
        const totalValues = totalPixels * 4;

        //  for storing the RGB Color Obj
        const imageColors = [];
        // loop over RGBA pixel quartets
        for (let i = 0; i < totalValues; i += 4) {
          // construct rgb color object
          const R = rgba[i];
          const G = rgba[i + 1];
          const B = rgba[i + 2];
          const color = { R, G, B };
          imageColors.push(color);
        }

        // construct imagesData from each image pixelcolors
        resultListWithImageData.push(imageColors);
      } catch (error) {
        console.log(`Error processing ${item}`);
        console.log(error);
      }
    }
    return resultListWithImageData;
  }

  // gets HSV from the image-pixel colours
  getLabColors(imagesData) {
    const labList = [];
    imagesData.forEach((image) => {
      image.forEach((imageRGBcolors) => {
        // convert from RGB to HEX then CIE-LAB: no direct conversion exists
        let hexColors = convert.rgb.hex(
          imageRGBcolors.R,
          imageRGBcolors.G,
          imageRGBcolors.B
        );
        let lab = convert.hex.lab(hexColors);

        labList.push(lab);
      });
    });
    return labList;
  }

  // CLUSTER RGB COLORS
  async getInitalColorPalette(labColors) {
    let resultListWithColors = [];
    let clusterPalettes = [];
    let mainPalette = [];

    kmeans.clusterize(labColors, { k: 5 }, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);

        for (let i = 0; i < result.length; i++) {
          mainPalette.push(convert.lab.hex(result[i].centroid));
          clusterPalettes = [];
          for (let t = 0; t < result[i].clusterInd.length; t++) {
            clusterPalettes.push(
              convert.lab.hex(labColors[result[i].clusterInd[t]])
            );
          }
          resultListWithColors.push(clusterPalettes);
        }
        const palettes = resultListWithColors[0].map((color, index) => {
          return {
            hex0: color,
            hex1: resultListWithColors[1][index],
            hex2: resultListWithColors[2][index],
            hex3: resultListWithColors[3][index],
            hex4: resultListWithColors[4][index],
          };
        });
        let results = { mainPalette, palettes };
        return results;
      }
    });
  }
}

module.exports = PaletteService;
