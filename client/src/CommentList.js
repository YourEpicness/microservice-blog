import React from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]); // empty array since API sends back array of comments
  //
  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4002/posts/${postId}/comments`
  //   ); // async retrieval of data from API

  //   setComments(res.data); //update state with fetched data
  // };

  // useEffect(() => {
  //   fetchData(); // gets data on basically component mount
  // }, []); // empty array as second arg, so its only called once

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>; // return a list element with a special key of our comment id
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
