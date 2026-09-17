import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch first 8 posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            _limit: 8,
          },
        });

        setPosts(response.data);
      } catch (error) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      // Remove post from UI
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );
    } catch (error) {
      alert("Failed to delete post.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading posts...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <h1 className="mb-10 text-center text-4xl font-bold text-gray-800">
          Posts Feed
        </h1>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Title */}
              <h2 className="mb-3 text-xl font-bold capitalize text-blue-600">
                {post.title}
              </h2>

              {/* Body */}
              <p className="mb-6 flex-1 leading-relaxed text-gray-600">
                {post.body}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                Delete Post
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
