import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { postAdded } from "../../store/postSlice";

const errorStatesMain = {
  postContent: false,
  postTitle: false,
};

const AddPostForm = () => {
  const [errorStates, setErrorStates] = useState(errorStatesMain);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      postContent: "",
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
          postAdded(values.postTitle, values.postContent)
        );

        toast("Post Added");

        formik.resetForm();
      }
    },
  });

  return (
    <Container>
      <div className="border border-primary p-3 mb-3 mt-3">
        <h1>Create Post</h1>
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
          <Button type="submit">Save Post</Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddPostForm;
