const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

// get any posts from /posts endpoint
app.get("/posts", (req, res) => {
  res.send(posts);
});

// post any posts to the /posts endpoint
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex"); // produces something like khjr3232
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // use axios to make post req
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

// listening on port
app.listen(4000, () => {
  console.log("running with k8s v2");
  console.log("Listening on 4000");
});
