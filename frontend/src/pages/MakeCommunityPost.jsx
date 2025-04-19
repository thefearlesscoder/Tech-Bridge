import axios from "axios";
import React, { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../data";
import { useSelector } from "react-redux";
import { setLoading } from "../slices/authSlice";

const MakeCommunityPost = () => {

  const [projects,setprojects ] = useState([]);

  const { user } = useSelector((state) => state.auth);
  console.log(user) ;

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    skills: "",
    remuneration: "",
    type: "",
    postedBy: "",
    projectId: "", // selected project ID
  });

  const getproectid = async () => { 
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/project/collabprojects`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setprojects(res.data?.data);
      // setprojects([
      //   { id: 1, name: "AI Startup" },
      //   { id: 2, name: "Crypto Dashboard" },
      //   { id: 3, name: "Health Tracker" },
      //   { id: 4, name: "Music Collab Platform" },
      // ])
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects.");
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getproectid();
  } ,[] );


  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    const { title, description, skills, remuneration, type, postedBy, projectId } = newPost;

    if (!title || !description || !skills || !remuneration || !postedBy) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (postedBy === "Collab" && !projectId) {
      toast.error("Please select a project.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/community/addpost`,
        {
          title,
          description,
          lookingFor: skills,
          budget: remuneration,
          type,
          role: postedBy,
          projectId: postedBy === "Collab" ? projectId : undefined,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          Create a New Community Post
        </h2>
        <form onSubmit={handleNewPostSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
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

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Required Skills</label>
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

          {/* Remuneration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Remuneration</label>
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

          {/* Posted By Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Posted By</label>
            <select
              name="postedBy"
              value={newPost.postedBy}
              onChange={handleNewPostChange}
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select who is posting</option>
              <option value="VC">VC</option>
              <option value="Collab">Collab</option>
            </select>
          </div>

          {/* Project Dropdown (conditionally rendered) */}
          {newPost.postedBy === "Collab" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Project</label>
              <select
                name="projectId"
                value={newPost.projectId}
                onChange={handleNewPostChange}
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
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
