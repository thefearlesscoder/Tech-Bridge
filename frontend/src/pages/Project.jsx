import React from "react";
import { Link } from "react-router-dom";

export const Project = () => {
  const projects = [
    {
      userId: "644b1f9e8f1b2c001c8e4a1a",
      title: "SecureChat",
      description: "A mobile chat application (P2P) with AES/DES encryption/decryption of messages and images, using RSA for key encryption/decryption.",
      techStack: ["React Native", "Node.js", "AES", "RSA"],
      category: "Communication",
      views: 120,
      lookingForCollaborators: true,
    },
    {
      userId: "644b1f9e8f1b2c001c8e4a1c",
      title: "HealthBridge",
      description: "A smart healthcare platform for real-time vitals tracking and remote doctor access.",
      techStack: ["Python", "Django", "IoT", "Machine Learning"],
      category: "Healthcare",
      views: 85,
      lookingForCollaborators: false,
    },
    {
      userId: "644b1f9e8f1b2c001c8e4a1d",
      title: "EcoTrack",
      description: "Track your carbon footprint with detailed analytics and green tips.",
      techStack: ["React", "Node.js", "MongoDB"],
      category: "Environment",
      views: 200,
      lookingForCollaborators: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Projects
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-purple-400 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Category:</strong> {project.category}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Tech Stack:</strong> {project.techStack.join(", ")}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Views:</strong> {project.views}
                </p>
                {project.lookingForCollaborators && (
                  <p className="text-sm text-yellow-400 font-bold">
                    Need Collaborator
                  </p>
                )}
              </div>
              <Link to="/project-detail" state={{ project }}>
                <button
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Know More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
