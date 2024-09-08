const express = require("express");
const cors = require("cors");
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
  console.log(url);
  alldl(url).then(
    (resp) => {
      console.log("22",resp.data);
      if (resp.data && resp.data.videoUrl) {
        let response = resp.data.videoUrl;
        res.status(200).send({ downloadVideoUrl: response });
      } else {
        console.log("25");
        res.status(500).send("Error downloading video");
      }
    },
    (err) => {
      console.log("err 29", err);
      res.status(500).send("Error downloading video");
    }
  );
});
