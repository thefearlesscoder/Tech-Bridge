import React from "react";
import { useLocation } from "react-router-dom";

const ProjectDetail = () => {
  const location = useLocation();
  const project = location.state?.project;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl text-red-500">Project details not found.</p>
      </div>
    );
  }

  const {
    userId,
    title,
    description,
    techStack,
    category,
    views,
    lookingForCollaborators,
  } = project;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="w-full bg-gray-900 border border-gray-700 shadow-xl rounded-2xl p-8 space-y-10">
        {/* Image & Title */}
        <div className="space-y-5 text-center">
          <img
            src="https://via.placeholder.com/800x400?text=Project+Preview"
            alt={`${title} Preview`}
            className="rounded-xl w-full max-h-[400px] object-cover shadow-md"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {title}
          </h1>
          <p className="text-sm text-gray-500">
            <strong>Category:</strong> {category}
          </p>
        </div>

        {/* User ID */}
        {/* <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">
            👤 User ID
          </h3>
          <p className="text-gray-300">{userId}</p>
        </div> */}

        {/* Description */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">
            🔍 Description
          </h3>
          <p className="text-gray-300 leading-loose">{description}</p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">
            🛠 Technologies Used
          </h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-purple-700/20 text-purple-300 px-4 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Views */}
        <div>
          <p className="text-sm text-gray-400">
            <strong>Views:</strong> {views}
          </p>
        </div>

        {/* Collaborator Info */}
        {lookingForCollaborators && (
          <div className="bg-yellow-700/20 border border-yellow-600 rounded-xl p-4 shadow">
            <p className="text-yellow-400 font-bold text-center">
              🚀 This project is looking for collaborators!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
