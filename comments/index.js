const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; // or empty array

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  // post on 4005/events
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  // send ok with comments
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved:", req.body.type);

  res.send({});
});

// listening on port
app.listen(4001, () => {
  console.log("Listening on 4001");
});
