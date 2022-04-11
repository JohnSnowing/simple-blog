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
      prepare(title, content, dateCreated) {
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
  },
});

export const selectAllPost = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
