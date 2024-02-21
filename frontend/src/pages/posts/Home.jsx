import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";

const Home = () => {
  // Set html title on the first render of page/ on mount
  useEffect(() => {
    document.title = "Homepage";
  }, []);

  // consume/use post context
  const { posts, setPosts } = useContext(PostContext);

  // Loading state for spinner or skeleton
  const [loading, setLoading] = useState(true);

  // On page load for once fetch all posts
  useEffect(() => {
    setTimeout(async () => {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <section className="card">
      <h1 className="title">Latest Posts</h1>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-4xl text-center block"></i>
      )}
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post}></Post>
          </div>
        ))}
    </section>
  );
};

export default Home;
