import { useContext, useEffect, useState } from "react";
import { getUserPosts, deletePost } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import Post from "../../components/Post";
import Alert from "../../components/Alert";

const Dashboard = () => {
  // Consume/use user context
  const { user, setUser } = useContext(UserContext);

  // Loading state for spinner or skeleton
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const data = await getUserPosts();
      // user context data updated with its post data
      setUser({ ...user, posts: data });
      // stop rendering skeleton or spinner
      setLoading(false);
    }, 300);
  }, []);
  console.log(user);

  // Handle delete post
  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
        // Delete the post
        const data = await deletePost(_id);
        // 200 res -> success: `Post with the title '${title}' is deleted.`,
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newPosts = user.posts.filter((post) => post._id !== _id);
      setUser({ ...user, posts: newPosts });
    }
  };

  return (
    <section className="card">
      <h1 className="title">{user.username}'s Dashboard</h1>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-4xl text-center block"></i>
      )}

      {user.posts.map((post) => (
        <div key={post._id}>
          <Post post={post}>
            <div className="flex items-center gap-2">
              <Link
                className="fa-solid fa-pen-to-square  text-green-500 hover:bg-green-200 nav-link text-base size-8"
                title="Update"
                state={post}
                to="/update"
              ></Link>
              <button
                className="fa-solid fa-trash-can nav-link text-base text-red-500 hover:bg-red-200 size-8"
                title="Delete"
                onClick={() => handleDelete(post._id)}
              ></button>
            </div>
          </Post>
        </div>
      ))}
    </section>
  );
};

export default Dashboard;
