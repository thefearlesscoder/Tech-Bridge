import React from "react";

const ProjectDetail = () => {
  const teamMembers = [
    { name: "Qabeel Dugal", avatar: "https://ui-avatars.com/api/?name=Qabeel+Dugal&background=0D8ABC&color=fff" },
    { name: "Rupesh Wali", avatar: "https://ui-avatars.com/api/?name=Rupesh+Wali&background=0D8ABC&color=fff" }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="w-full bg-gray-900 border border-gray-700 shadow-xl rounded-2xl p-8 space-y-10">
        
        {/* Image & Title */}
        <div className="space-y-5 text-center">
          <img
            src="https://via.placeholder.com/800x400?text=SecureChat+Preview"
            alt="SecureChat Preview"
            className="rounded-xl w-full max-h-[400px] object-cover shadow-md"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">SecureChat</h1>
          {/* <p className="text-lg text-gray-400">Secure Chat Application</p> */}
          <p className="text-sm text-gray-500">Created on <strong>16th February 2020</strong></p>
        </div>

        {/* What It Does */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">🔐 What It Does</h3>
          <p className="text-gray-300 leading-loose">
            A peer-to-peer mobile chat app that encrypts and decrypts messages and images using AES/DES.
            It uses RSA to securely encrypt keys. With SecureChat, your private conversations stay protected and end-to-end encrypted.
          </p>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">👨‍💻 Team</h3>
          <div className="flex gap-4 flex-wrap">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-800 border border-gray-700 p-3 rounded-xl shadow-sm">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                <span className="text-white font-medium">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">🛠 Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {["Android", "AES", "RSA", "DES"].map((tech) => (
              <span
                key={tech}
                className="bg-purple-700/20 text-purple-300 px-4 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-6 justify-start">
          
          <a
            href="https://github.com/Rupeshwal/SecureChat"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg text-white transition"
          >
            🧑‍💻 View GitHub
          </a>
        </div>
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-purple-400 text-center">🎥 Demo Video</h3>
          <div className="w-full flex justify-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Uop_-7B7McU?si=yQlXu4L122GyI3uu"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Discussion Section */}
<div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow space-y-6">
  <h3 className="text-2xl font-semibold text-purple-400 mb-4">💬 Discussion</h3>

  {/* Comment Form */}
  <form className="space-y-4">
    <textarea
      rows="4"
      placeholder="Share your thoughts or ask a question..."
      className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white transition"
    >
      Post Comment
    </button>
  </form>

  {/* Example Comments */}
  <div className="space-y-4 mt-6">
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">Alex:</span> This looks super useful for secure team comms 🔐 Great work!
      </p>
    </div>
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">Maya:</span> How are the keys exchanged securely between users?
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProjectDetail;
