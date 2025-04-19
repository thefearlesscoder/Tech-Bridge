import { useState } from "react";
import axios from "axios";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !video || !description) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("video", video);
    formData.append("description", description);

    try {
      setLoading(true);
      const res = await axios.post("/api/Products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Project created successfully!");
      setName("");
      setVideo(null);
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Upload a New Project
        </h1>

        {message && (
          <div className="mb-4 text-center text-sm text-yellow-400">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 px-4 py-2 rounded text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
