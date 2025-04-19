import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const MySpace = () => {
  const tabs = ["My Posts", "My Projects", "Purchased Projects", "Applied for Colab"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { user } = useSelector((state) => state.auth);
    console.log(user);

 const [myPosts, setMyPosts] = useState([]);
 const [myProjects, setMyProjects] = useState([]);

 useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/community/getmyposts", {
          withCredentials: true,
        });
        setMyPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };

    fetchMyPosts();
  }, []);

  console.log("My Posts", myPosts);

  return (
    <div className="p-6 text-white bg-gray-950 min-h-screen">
      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-10">
        My Stuffs
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex justify-center space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-base font-medium relative transition-all duration-200 
                ${activeTab === tab ? "text-purple-400" : "text-gray-400"} 
                hover:text-purple-300`}
            >
              {tab}
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-purple-500 transition-all duration-300 
                  ${activeTab === tab ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
              ></span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6 text-center text-gray-300">
        {activeTab === "My Posts" && <div>Show user's posts here...</div>}
        {activeTab === "My Projects" && <div>List of user's created projects...</div>}
        {activeTab === "Purchased Projects" && <div>List of purchased projects...</div>}
        {activeTab === "Applied for Colab" && <div>Collaborations user applied for...</div>}
      </div>
    </div>
  );
};
