import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllPost } from "../../store/postSlice";
import Pagination from "../layout/Pagination";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector(selectAllPost);
  const [newPosts, setNewPosts] = useState(posts);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const orderedPost = posts
    .slice()
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = orderedPost.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOrderTitle = () => {
    setSorting(
      orderedPost.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => {
        if (a.title < b.title) {
          return a.title.localeCompare(b.title);
        }
        if (a.title > b.title) {
          return b.title.localeCompare(a.title);
        }
      })
    );
  };

  const handlePostOrderDate = () => {
    setSorting(
      orderedPost.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => {
        if (a.dateCreated < b.dateCreated) {
          return a.dateCreated.localeCompare(b.dateCreated);
        }
        if (a.dateCreated > b.dateCreated) {
          return b.dateCreated.localeCompare(a.dateCreated);
        }
      })
    );
  };

  return (
    <Container>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Post Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </Form.Group>
      <Button type="button" onClick={handleOrderTitle}>
        Sort Title
      </Button>
      &nbsp;
      <Button type="button" onClick={handlePostOrderDate}>
        Sort Date Crated
      </Button>
      <Post
        orderedPosts={currentPosts}
        sorting={sorting}
        searchValue={searchValue}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={orderedPost.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default PostList;
