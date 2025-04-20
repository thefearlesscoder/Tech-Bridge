import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyPostsCard from './MySpaceCards/MyPostsCard';
import MyProjectsCard from './MySpaceCards/MyProjectsCard';
import PurchasedProjectCard from './MySpaceCards/PurchasedProjectCard';

export const MySpace = () => {
  const tabs = ["My Posts", "My Projects", "Purchased Projects", "Applied for Colab"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { user } = useSelector((state) => state.auth);

  const [myPosts, setMyPosts] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [myPurchasedProjects, setMyPurchasedProjects] = useState([]);
  const [myAppliedProjects, setMyAppliedProjects] = useState([]);

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

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/project/myprojects", {
          withCredentials: true,
        });
        setMyProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching my projects:", error);
      }
    };
    fetchMyProjects();
  }, []);

  useEffect(() => {
    const fetchMyPurchasedProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/purchase/mypurchases", {
          withCredentials: true,
        });
        setMyPurchasedProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching my purchases:", error);
      }
    };
    fetchMyPurchasedProjects();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-purple-700 dark:text-purple-400 mb-10 drop-shadow">
        My Space
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-300 dark:border-gray-700 mb-6">
        <div className="flex justify-center flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-md dark:bg-purple-500"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-purple-400 rounded-b-md transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 text-center">
        {activeTab === "My Posts" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myPosts.map((post) => (
              <MyPostsCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {activeTab === "My Projects" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myProjects.map((proj) => (
              <MyProjectsCard key={proj._id} project={proj} />
            ))}
          </div>
        )}

        {activeTab === "Purchased Projects" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myPurchasedProjects.map((purchase) => (
              <PurchasedProjectCard key={purchase._id} purchase={purchase} />
            ))}
          </div>
        )}

        {activeTab === "Applied for Colab" && (
          <div className="text-lg text-gray-500 dark:text-gray-300">
            Collaborations you applied for will appear here...
          </div>
        )}
      </div>
    </div>
  );
};
