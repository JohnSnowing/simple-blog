import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";

const Post = ({ orderedPosts, searching, searchValue, sorting }) => {
  const history = useNavigate();
  if (searchValue !== "") {
    return (
      <div>
        {orderedPosts
          .filter((value) => {
            if (value.title.toLowerCase().includes(searchValue.toLowerCase())) {
              return value;
            }
          })
          .map((post, key) => {
            return (
              <Card key={post.id} className="mb-4">
                <Card.Header>Blog Post {post.id}</Card.Header>
                <Card.Title className="p-2">{post.title}</Card.Title>
                <Card.Text className="p-2">
                  {post.content.substring(0, 100)}
                </Card.Text>
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
            );
          })}
      </div>
    );
  }

  if (sorting) {
    return (
      <div>
        {sorting.map((post) => (
          <Card key={post.id} className="mb-4">
            <Card.Header>Blog Post {post.id}</Card.Header>
            <Card.Title className="p-2">{post.title}</Card.Title>
            <Card.Text className="p-2">
              {post.content.substring(0, 100)}
            </Card.Text>
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
        ))}
      </div>
    );
  }
  return (
    <div>
      {orderedPosts.map((post) => (
        <Card key={post.id} className="mb-4">
          <Card.Header>Blog Post {post.id}</Card.Header>
          <Card.Title className="p-2">{post.title}</Card.Title>
          <Card.Text className="p-2">
            {post.content.substring(0, 100)}
          </Card.Text>
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
      ))}
    </div>
  );
};

export default Post;
