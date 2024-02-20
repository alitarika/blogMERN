import { createContext, useContext, useState } from "react";

// Init post context
export const PostContext = createContext();

const PostProvider = ({ children }) => {
  // posts state/context init as an empty array
  const [posts, setPosts] = useState([]);

  // Custom provider wrapper for post context
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
