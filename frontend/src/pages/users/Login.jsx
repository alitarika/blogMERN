import { useContext, useState, useEffect } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Set html title on the first render of page/ on mount
  useEffect(() => {
    document.title = "Log In";
  }, []);

  // Consume/use user context
  const { setUser } = useContext(UserContext);

  // useNavigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(username, password);
      setUser({ username, posts: [] });
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Log in to your account</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          className="input"
          type="text"
          autoFocus
          autoComplete="username"
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>
      {error && <Alert message={error} />}
    </section>
  );
};

export default Login;
