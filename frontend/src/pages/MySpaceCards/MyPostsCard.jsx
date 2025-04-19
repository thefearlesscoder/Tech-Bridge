const MyPostsCard = ({ post }) => {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-purple-400 mb-2">{post.title}</h2>
        <p className="text-gray-300 mb-4">{post.description}</p>
        <p className="text-sm text-gray-400 mb-2"><strong>Budget:</strong> ${post.budget}</p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          {post.lookingFor.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-400"><strong>Role:</strong> {post.role}</p>
      </div>
    );
  };
  export default MyPostsCard;
  