export const BaseURL = "https://blog-mern-backend-kohl.vercel.app";

// Get *all* posts
export const getPosts = async () => {
  const res = await fetch(`${BaseURL}/api/posts`);
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// Get user posts
export const getUserPosts = async () => {
  const res = await fetch(`${BaseURL}/api/posts/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// Create Post
export const createPost = async (title, body) => {
  if (!title || !body) {
    throw Error("All fields are required");
  }

  const res = await fetch(`${BaseURL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// Delete Post
export const deletePost = async (id) => {
  const res = await fetch(`${BaseURL}/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// Modify/update post
export const updatePost = async (id, title, body) => {
  if (!title || !body) {
    throw Error("All fields are required");
  }

  const res = await fetch(`${BaseURL}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};
