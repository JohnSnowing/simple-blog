import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePost, selectPostById, updatePost } from "../../store/postSlice";

const errorStatesMain = {
  postContent: false,
  postTitle: false,
};

const EditPostForm = () => {
  const dispatch = useDispatch();
  const [errorStates, setErrorStates] = useState(errorStatesMain);

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, postId));

  const formik = useFormik({
    initialValues: {
      postTitle: post.title,
      postContent: post.content,
    },
    validate: (values) => {
      if (values.postTitle) {
        setErrorStates((prevState) => ({
          ...prevState,
          postTitle: false,
        }));
      }
      if (values.postContent) {
        setErrorStates((prevState) => ({
          ...prevState,
          postContent: false,
        }));
      }
    },
    onSubmit: (values) => {
      if (values.postTitle.trim() === "" || values.postContent.trim() === "") {
        if (!values.firstname) {
          setErrorStates((prevState) => ({
            ...prevState,
            postTitle: true,
          }));
        }

        if (!values.postContent) {
          setErrorStates((prevState) => ({
            ...prevState,
            postContent: true,
          }));
        }
        alert("Fill in all Fields");
      } else {
        dispatch(
          //   postAdded({
          //     id: nanoid(),
          //     title: values.postTitle,
          //     content: values.postContent,
          //     dateCreated: datePosted.toLocaleDateString(),
          //   })
          // use prepare to generate id inside callback inside the slice
          updatePost(post.id, values.postTitle, values.postContent)
        );

        toast("Post Edited");

        formik.resetForm();

        navigate(`/post/${postId}`);
      }
    },
  });

  const handleDelete = () => {
    dispatch(deletePost(postId));

    toast("Post deleted");

    navigate(`/`);
  };

  if (!post) {
    return (
      <section>
        <h2>Post Not found</h2>
      </section>
    );
  }

  return (
    <Container>
      <div className="border border-primary p-3 mb-3 mt-3">
        <h1>Edit Post</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              id="postTitle"
              name="postTitle"
              type="text"
              placeholder="Enter Title"
              value={formik.values.postTitle}
              onChange={formik.handleChange}
            />
          </Form.Group>
          {errorStates.postTitle && (
            <p className="error-text">Post title is required</p>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="postContent"
              name="postContent"
              placeholder="Enter Title"
              value={formik.values.postContent}
              onChange={formik.handleChange}
            />
          </Form.Group>
          {errorStates.postContent && (
            <p className="error-text">Post content is required</p>
          )}
          <Button type="submit">Update Post</Button>
          <Button
            className="btn btn-danger ms-3"
            type="button"
            onClick={handleDelete}
          >
            Delete Post
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditPostForm;
