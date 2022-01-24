const ImageService = require("../services/image-service");

module.exports = (app) => {
  const service = new ImageService();

  //get Top products and category
  app.get("/api/images", async (req, res, next) => {
    const { query, page } = req.query;

    const { data } = await service.GetImages(query, page);
    const images = await service.GetPalettes(data.results);

    return res.status(200).json({ total_pages: data.total_pages, images });
  });
};
