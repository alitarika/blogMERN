import { BaseURL } from "./postsController";

// Login user
export const loginUser = async (username, password) => {
  if (!username || !password) {
    throw Error("All fields are required");
  }

  const res = await fetch(`${BaseURL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);

  return data;
};

// Register User
export const registerUser = async (username, password, passwordConfirm) => {
  if (!username || !password || !passwordConfirm) {
    throw Error("All fields are required");
  }

  if (password !== passwordConfirm) {
    throw Error("Passwords do not match");
  }

  const res = await fetch(`${BaseURL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);

  return data;
};
