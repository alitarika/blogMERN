import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../../controllers/postsController.js";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../components/Alert";

const UpdatePost = () => {
  // Consume/use post context
  const { posts, setPosts } = useContext(PostContext);

  // use navigate after creating post navigate to ...
  const navigate = useNavigate();

  const location = useLocation();

  // Error state init as null
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState(location.state.title);
  const [body, setBody] = useState(location.state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = await updatePost(location.state._id, title, body);
      const updatedPosts = posts.filter((post) => post._id !== data.post._id);
      setPosts([...updatedPosts, data.post]);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Modify Post</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder={location.state.title}
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          placeholder={location.state.body}
          rows="10"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="btn">Modify Post</button>
      </form>

      {error && <Alert message={error} />}
    </section>
  );
};

export default UpdatePost;
