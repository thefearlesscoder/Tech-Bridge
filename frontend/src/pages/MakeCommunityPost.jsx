import React, { useState } from "react";

const MakeCommunityPost = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    skills: "",
    remuneration: "",
  });

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description || !newPost.skills || !newPost.remuneration) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate a successful post creation
    alert("Post created successfully!");
    console.log("New Post:", newPost);

    // Reset the form
    setNewPost({ title: "", description: "", skills: "", remuneration: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          Create a New Community Post
        </h2>
        <form onSubmit={handleNewPostSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleNewPostChange}
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter the title of your post"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleNewPostChange}
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your requirements"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Required Skills
            </label>
            <input
              type="text"
              name="skills"
              value={newPost.skills}
              onChange={handleNewPostChange}
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter skills separated by commas (e.g., React, Node.js)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Remuneration
            </label>
            <input
              type="text"
              name="remuneration"
              value={newPost.remuneration}
              onChange={handleNewPostChange}
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter remuneration (e.g., $500)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeCommunityPost;