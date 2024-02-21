import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../controllers/postsController.js";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../components/Alert";

const CreatePost = () => {
  // Set html title on the first render of page/ on mount
  useEffect(() => {
    document.title = "Create a Blog Post";
  }, []);

  // Consume/use post context
  const { posts, setPosts } = useContext(PostContext);

  // use navigate after creating post navigate to ...
  const navigate = useNavigate();

  // Error state init as null
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const data = await createPost(title, body);
      setPosts([...posts, data.post]);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create a Blog Post</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Post Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          placeholder="Post Body"
          rows="10"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="btn">Post</button>
      </form>

      {error && <Alert message={error} />}
    </section>
  );
};

export default CreatePost;
