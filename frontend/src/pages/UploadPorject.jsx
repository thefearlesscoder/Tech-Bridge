import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../components/Snipper";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../data";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!name || !category || !description || !links || !videoUrl) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/project/addproject`,
        {
          title:name,
          category,
          description,
          gitHub:links,
          mediaUrls:videoUrl, 
        },
        {
          withCredentials: true,
        }
      );

      // setMessage("✅ Project created successfully!");
      if ( res.data.success) {
        setName("");
        setCategory("");
        setDescription("");
        setLinks("");
        setVideoUrl(""); 
        toast.success("Project created successfully!");
        navigate("/"); 
      }
      else {
        toast.error("Project creation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-950">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Upload a User Project
        </h1>

        {message && (
          <div className="mb-4 text-center text-sm text-yellow-600 dark:text-yellow-400">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="WEB">WEB</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Web3">Web3</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="GameDev">GameDev</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Project URL</label>
            <input
              type="text"
              placeholder="e.g., GitHub, Live Demo"
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">YouTube / Video URL</label>
            <input
              type="url"
              placeholder="e.g., https://youtu.be/your-demo"
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {loading ? "Submitting..." : "Upload Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
