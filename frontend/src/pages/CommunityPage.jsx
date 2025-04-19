import React, { useState } from "react";

const CommunityPage = () => {


  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Looking for a Frontend Developer",
      description: "We need a React developer to build the UI for our project.",
      skills: ["React", "JavaScript", "CSS"],
      remuneration: "$500",
      applicants: 0,
    },
    {
      id: 2,
      title: "Backend Developer Needed",
      description: "Seeking a Node.js developer to handle server-side logic.",
      skills: ["Node.js", "Express", "MongoDB"],
      remuneration: "$700",
      applicants: 0,
    },
    {
      id: 3,
      title: "UI/UX Designer Wanted",
      description: "Looking for a designer to create wireframes and prototypes.",
      skills: ["Figma", "Adobe XD", "Creativity"],
      remuneration: "$300",
      applicants: 0,
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    skills: "",
    remuneration: "",
  });

  const handleApply = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, applicants: post.applicants + 1 } : post
      )
    );
    alert(`Applied to: ${posts.find((post) => post.id === id).title}`);
  };

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

    const newPostData = {
      id: posts.length + 1,
      title: newPost.title,
      description: newPost.description,
      skills: newPost.skills.split(",").map((skill) => skill.trim()), // Convert skills to an array
      remuneration: newPost.remuneration,
      applicants: 0,
    };

    setPosts((prevPosts) => [newPostData, ...prevPosts]);
    setNewPost({ title: "", description: "", skills: "", remuneration: "" });
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