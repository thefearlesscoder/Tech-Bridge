import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../data";

const WishlistPage = () => {
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/project/bookmarkedprojects`, {
        withCredentials: true,
      });
      console.log(res.data);
      setBookmarkedProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching bookmarks", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl text-center font-bold mb-4">Your Wishlist</h1>
      {Array.isArray(bookmarkedProjects) && bookmarkedProjects.length === 0 ? (
        <p>No bookmarked projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(bookmarkedProjects) &&
            bookmarkedProjects.map((project) => (
              <div
                key={project._id}
                className="border p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-2 text-sm text-blue-500">
                  {project.category?.join(", ")}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
