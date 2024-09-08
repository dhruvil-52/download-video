const express = require("express");
const cors = require("cors");
const { alldown } = require("nayan-media-downloader");
const { alldl } = require("rahad-all-downloader");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON request bodies

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.post("/downloadmp4", async (req, res) => {
  const url = req.body.data.url;
  try {
    let resp = await downloadByRahad(url);
    let response = resp.data.videoUrl;
    res.status(200).send({ downloadVideoUrl: response });
  } catch (error) {
    try {
      let resp = await downloadByNayan(url);
      let response = resp.data.high;
      res.status(200).send({ downloadVideoUrl: response });
    } catch (error) {
      res.status(500).send("Error downloading video");
    }
  }
});

const downloadByNayan = (url) => {
  let resp = alldown(url);
  return resp;
};

const downloadByRahad = (url) => {
  const result = alldl(url);
  return result;
};
