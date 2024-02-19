import { useState } from "react";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/usersController";

const Register = () => {
  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(
        formData.username,
        formData.password,
        formData.passwordConfirm
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create an account</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input
          className="input"
          type="text"
          autoFocus
          placeholder="Username"
          name="username"
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          name="password"
          id="password"
          value={formData.passwordConfirm}
          onChange={(e) =>
            setFormData({ ...formData, passwordConfirm: e.target.value })
          }
        />
        <button className="btn">Register</button>
      </form>
      {error && <Alert message={error} />}
    </section>
  );
};

export default Register;
