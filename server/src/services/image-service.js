const axios = require("axios");
const Vibrant = require("node-vibrant");

const { UPSPLASH_ACCESS_KEY, UPSPLASH_SECRET_KEY } = require("../config");

class ImageService {
  //  get images
  async GetImages(query, page) {
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=20&client_id=${UPSPLASH_ACCESS_KEY}`;

    try {
      const response = await axios.get(unsplashURL);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async GetPalettes(images) {
    const resultListWithColors = [];
    await Promise.all(
      images.map(async (img) => {
        const palettes = await Vibrant.from(img.urls.regular).getPalette();
        const palette = [];
        for (const swatch in palettes) {
          palette.push(palettes[swatch].getHex());
        }
        const fiveColors = [];
        for (let i = 0; i < 5; i++) {
          fiveColors[i] = palette[i];
        }
        resultListWithColors.push({ img, fiveColors });
      })
    );
    return resultListWithColors;
  }
}

module.exports = ImageService;
