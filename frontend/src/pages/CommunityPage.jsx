import axios from "axios";
import React, { useEffect, useState } from "react";

const CommunityPage = () => {
  const [vcPosts, setVcPosts] = useState([]);
  const [collabPosts, setCollabPosts] = useState([]);
  const [role, setRole] = useState("All");


  useEffect(() => {
    const fetchVcPosts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/community/getpostofrole",
          { role: "VC" },
          { withCredentials: true }
        );
        setVcPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching VC posts:", error);
      }
    };

    const fetchCollabPosts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/community/getpostofrole",
          { role: "Collab" },
          { withCredentials: true }
        );
        setCollabPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Collab posts:", error);
      }
    };

    fetchVcPosts();
    fetchCollabPosts();
  }, []);

  const allPosts = [...vcPosts, ...collabPosts];
  const filteredPosts =
    role === "All" ? allPosts : allPosts.filter((post) => post.role === role);

  const handleApply = (id) => {
    alert(`Applied to: ${allPosts.find((post) => post._id === id)?.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Community Posts</h1>

      <div className="mb-6 text-center">
  <label htmlFor="role-filter" className="text-lg font-medium mr-4">
    Filter by Role:
  </label>
  <div className="inline-block relative">
    <select
      id="role-filter"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="appearance-none bg-gray-700 text-white py-2 pl-4 pr-7 rounded-lg border border-gray-600 "
    >
      <option value="All">All</option>
      <option value="VC">VC</option>
      <option value="Collab">Collab</option>
    </select>
    {/* Custom dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
      ▼
    </div>
  </div>
</div>


      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
           key={`${post._id}-${post.role}`}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4">{post.description}</p>

              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Looking For:
              </h3>
              <ul className="list-disc list-inside text-gray-400 mb-4">
                {post.lookingFor.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              {post.role === "VC" && (
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Budget:</strong> ${post.budget}
                </p>
              )}

              <p className="text-sm text-gray-400">
                <strong>Role:</strong> {post.role}
              </p>
            </div>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => handleApply(post._id)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
