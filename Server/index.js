const express = require("express");
const cors = require("cors");
const { alldown } = require("nayan-media-downloader");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON request bodies

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.post("/downloadmp4", async (req, res) => {
  console.log("here", req.body); // Access request body
  const url = req.body.data.url; // Get URL from the body
  console.log(url);

  try {
    let resp = await alldown(url);
    console.log(resp.data);
    res.status(200).send(resp.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading video");
  }
});
