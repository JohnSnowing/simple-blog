import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import TimeAgo from "./TimeAgo";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));

  const history = useNavigate();

  if (!post) {
    return (
      <section>
        <h1>Post Not Found</h1>
      </section>
    );
  }
  return (
    <Container>
      <Card key={post.id} className="mb-4">
        <Card.Header>Blog Post {post.id}</Card.Header>
        <Card.Title className="p-2">{post.title}</Card.Title>
        <Card.Text className="p-2">{post.content}</Card.Text>
        <TimeAgo timestamp={post.dateCreated} />
        <div className="p-3">
          <Button
            onClick={() => history(`post/edit/${post.id}`)}
            style={{ width: "150px" }}
            variant="primary"
          >
            Edit Post
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default SinglePost;
