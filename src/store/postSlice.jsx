import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Blog Post 1",
    content: "React is a very good Frontend framework",
    dateCreated: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: "2",
    title: "Blog Post 2",
    content: "React is a very good Frontend framework to begin with",
    dateCreated: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            dateCreated: new Date().toISOString(),
          },
        };
      },
    },
    updatePost: {
      reducer(state, action) {
        const { id, title, content } = action.payload;
        let objIndex = state.findIndex((obj) => obj.id == id);
        state[objIndex].title = title;
        state[objIndex].content = content;
        state[objIndex].dateCreated = new Date().toISOString();

        // state = [...posts, action.payload];
      },
      prepare(id, title, content) {
        console.log("updated", id, title, content);
        return {
          payload: {
            id: id,
            title,
            content,
            dateCreated: new Date().toISOString(),
          },
        };
      },
    },
    deletePost: {
      reducer(state, action) {
        let objIndex = state.findIndex((obj) => obj.id == action.payload.id);
        state.splice(objIndex, 1);
      },
      prepare(id) {
        return {
          payload: {
            id: id,
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const { postAdded, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
