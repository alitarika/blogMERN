import { useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";

const Login = () => {
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
