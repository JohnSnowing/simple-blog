import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllPost } from "../../store/postSlice";
import TimeAgo from "./TimeAgo";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const posts = useSelector(selectAllPost);

  const orderedPost = posts
    .slice()
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));

  const history = useNavigate();

  const renderPosts = orderedPost.map((post) => (
    <Card key={post.id} className="mb-4">
      <Card.Header>Blog Post {post.id}</Card.Header>
      <Card.Title className="p-2">{post.title}</Card.Title>
      <Card.Text className="p-2">{post.content.substring(0, 100)}</Card.Text>
      <TimeAgo timestamp={post.dateCreated} />
      <div className="p-3">
        <Button
          onClick={() => {
            history(`/post/${post.id}`);
          }}
          style={{ width: "150px" }}
          variant="primary"
        >
          More Details
        </Button>
      </div>
    </Card>
  ));
  return (
    <Container>
      <section className="mt-3">{renderPosts}</section>
    </Container>
  );
};

export default PostList;
