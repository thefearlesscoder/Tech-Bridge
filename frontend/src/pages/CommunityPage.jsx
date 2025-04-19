import axios from "axios";
import React, { useEffect, useState } from "react";

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get("http://localhost:8000/api/v1/community/getpostofrole");
            setPosts(response.data); 
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchPosts();
      }, []);


  const handleApply = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, applicants: post.applicants + 1 } : post
      )
    );
    alert(`Applied to: ${posts.find((post) => post.id === id).title}`);
  };




  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Community Posts</h1>

      

      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-purple-400 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4">{post.description}</p>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Required Skills:
              </h3>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                {post.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-400 mb-2">
                <strong>Remuneration:</strong> {post.remuneration}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Applicants:</strong> {post.applicants}
              </p>
            </div>
            <button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => handleApply(post.id)}
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