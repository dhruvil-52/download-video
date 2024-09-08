const express = require("express");
const cors = require("cors");
const { alldown } = require("nayan-media-downloader");
const { alldl } = require("rahad-all-downloader");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.post("/downloadmp4", async (req, res) => {
  const url = req.body.data.url;
  console.log("url", url);
  try {
    const resp = await downloadByRahad(url);
    console.log("rahad", resp);
    if (resp && resp.data && resp.data.videoUrl) {
      const response = resp.data.videoUrl;
      res.status(200).send({ downloadVideoUrl: response });
    } else {
      const resp = await downloadByNayan(url);
      console.log("nayan", resp);
      if (resp && resp.data && resp.data.high) {
        const response = resp.data.high;
        res.status(200).send({ downloadVideoUrl: response });
      } else {
        console.error("Error in downloadByNayan: Not allowed");
        res.status(500).send("Not allowed");
      }
    }
  } catch (error) {
    console.error("Error in downloadByRahad:", error);
    try {
      const resp = await downloadByNayan(url);
      console.log("nayan", resp);
      if (resp && resp.data && resp.data.high) {
        const response = resp.data.high;
        res.status(200).send({ downloadVideoUrl: response });
      } else {
        console.error("Error in downloadByNayan: Not allowed");
        res.status(500).send("Not allowed");
      }
    } catch (error) {
      console.error("Error in downloadByNayan:", error);
      res.status(500).send("Error downloading video");
    }
  }
});

const downloadByNayan = async (url) => {
  return alldown(url); // Ensure this returns a Promise
};

const downloadByRahad = async (url) => {
  return alldl(url); // Ensure this returns a Promise
};
