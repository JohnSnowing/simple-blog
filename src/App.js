import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import PostList from "./component/post/PostList";
import { ToastContainer, Flip } from "react-toastify";
import AddPostForm from "./component/post/AddPostForm";
import Layout from "./component/layout/Layout";
import SinglePost from "./component/post/SinglePost";
import { Route, Routes } from "react-router-dom";
import EditPostForm from "./component/post/EditPostForm";

function App() {
  return (
    <main className="App">
      <ToastContainer transition={Flip} pauseOnFocusLoss={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePost />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
