const MyProjectsCard = ({ project }) => {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-purple-400 mb-2">{project.title}</h2>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <p className="text-sm text-gray-400 mb-2"><strong>Price:</strong> ${project.price}</p>
        <p className="text-sm text-gray-400 mb-2"><strong>Skills:</strong> {project.requiredSkills.join(', ')}</p>
        {project.mediaUrls.length > 0 && (
          <img src={project.mediaUrls[0]} alt="project" className="mt-4 w-full rounded" />
        )}
      </div>
    );
  };
  export default MyProjectsCard;
  