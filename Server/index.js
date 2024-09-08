const express = require("express");
const cors = require("cors");
const { alldown } = require("nayan-media-downloader");
const { ytdown } = require("nayan-media-downloader");
const { ndown } = require("nayan-media-downloader");
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
  console.log(url);

  try {
    console.log("here");
    let resp = await alldown(url);
    console.log(resp);
    res.status(200).send(resp.data);
  } catch (error) {
    try {
      let resp = await ytdown(url);
      console.log(resp);
      res.status(200).send(resp.data);
    } catch {
      let resp = await ndown(url);
      console.log(resp);
      res.status(200).send(resp.data);
    }
    res.status(500).send("Error downloading video");
  }
});
