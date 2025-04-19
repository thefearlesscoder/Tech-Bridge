import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg flex flex-col justify-between transition-shadow duration-300 ease-in-out rounded-lg p-6 w-full">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      <div className="mt-4">
        <p className="text-gray-500 font-semibold text-sm">{project.location}</p>
        <p className="text-richblack-700 font-bold text-sm">
          {new Date(project.date).toDateString()}
        </p>
      </div>

      <div className="mt-4">
        <Link to={`/project/${project.id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
