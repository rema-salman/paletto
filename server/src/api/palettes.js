const PaletteService = require("../services/palette-service");

const colorsys = require("colorsys");
const { jStat } = require("jstat");
const kmeans = require("node-kmeans");

const convert = require("color-convert");

module.exports = (app) => {
  const service = new PaletteService();

  //   MAIN SERVER ROUTE
  app.post("/api/palettes", async (req, res) => {
    selectedImages = req.body;

    const resizedImages = await service.resizeImages(selectedImages);
    const imagesData = await service.getImageData(resizedImages);

    const labColors = service.getLabColors(imagesData);

    let resultListWithColors = [];
    let clusterPalettes = [];
    let mainPalette = [];

    kmeans.clusterize(labColors, { k: 5 }, (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);

        for (let i = 0; i < result.length; i++) {
          mainPalette.push(`#${convert.lab.hex(result[i].centroid)}`);
          clusterPalettes = [];
          for (let t = 0; t < result[i].clusterInd.length; t++) {
            clusterPalettes.push(
              convert.lab.hex(labColors[result[i].clusterInd[t]])
            );
          }
          resultListWithColors.push(clusterPalettes);
        }

        const finalPalettes = resultListWithColors[0].map((color, index) => {
          return [
            `#${color}`,
            `#${resultListWithColors[1][index]}`,
            `#${resultListWithColors[2][index]}`,
            `#${resultListWithColors[3][index]}`,
            `#${resultListWithColors[4][index]}`,
          ];
        });

        let results = { mainPalette, finalPalettes };
        return res.status(200).json(results);
      }
    });
  });
};
