import BlogPage from "@/components/BlogPage";

const { AuthContextProvider } = require("@/app/AuthContext");

const Blog = () => {
  return (
    <AuthContextProvider>
      <BlogPage />
    </AuthContextProvider>
  );
};

export default Blog;
