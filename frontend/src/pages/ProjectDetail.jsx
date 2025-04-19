import axios from "axios";
import React, { useEffect, useState } from "react";
import { setLoading } from "../slices/authSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../data";

const ProjectDetail = () => {
  const { id } = useParams();

  const project1 = {
    category: ["WEB"],
    createdAt: "2025-04-19T10:25:41.473Z",
    description:
      "A tool that uses NLP and ML algorithms to evaluate resumes and match candidates with job descriptions in real-time.",
    gitHub: "https://resumely.vercel.app",
    interests: [],
    isApproved: false,
    isFeatured: false,
    lookingForCollaborators: false,
    mediaUrls: [
      "https://www.youtube.com/watch?v=odemiExeDU8",
    ],
    pitchDeckUrl: "https://example.com/pitch-deck.pdf",
    price: 2012,
    purchased: false,
    requiredSkills: ["NLP", "Machine Learning", "UI/UX", "Python"],
    title: "AI-Powered Resume Analyzer",
    updatedAt: "2025-04-19T10:25:41.473Z",
    userId: {
      _id: "68031e67917d625433f6917e",
      fullname: "Jack Sparrow",
      avatar:
        "http://res.cloudinary.com/chai-or-code/image/upload/v1745034904/TechBridge/ab0ious83by7e5adsvvz.jpg",
      email: "v52166400@gmail.com",
    },
    viewLogs: [],
    views: 0,
    __v: 0,
    _id: "68037a25ab757c05e49ff81e",
  };

  const[ project, setProject] = useState({});

  const getProjectDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/project/details/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setProject(res.data?.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast.error("Failed to fetch project details.");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

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
    category,
    views,
    lookingForCollaborators,
    requiredSkills,
    price,
    gitHub,
    pitchDeckUrl,
    mediaUrls,
  } = project;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-700 shadow-xl rounded-2xl p-8 space-y-10">
        {/* Title and Category */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {title}
          </h1>
          <p className="text-sm text-gray-400">
            <strong>Category:</strong> {category?.join(", ")}
          </p>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl p-5 shadow">
          <img
            src={userId?.avatar}
            alt="Owner Avatar"
            className="w-14 h-14 rounded-full border border-purple-600 object-cover"
          />
          <div>
            <h3 className="text-lg font-medium text-white">
              {userId?.fullname}
            </h3>
            <p className="text-sm text-gray-400">{userId?.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">
            Description
          </h3>
          <p className="text-gray-300 leading-loose">{description}</p>
        </div>

        {/* Required Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">
            Tech Used
          </h3>
          <div className="flex flex-wrap gap-3">
            {requiredSkills?.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-700/20 text-purple-300 px-4 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub & Pitch Deck */}
        <div className="flex flex-col gap-4">
          {gitHub && (
            <a
              href={gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub Repository
            </a>
          )}
          
        </div>

        {/* Media Preview */}
        {mediaUrls && mediaUrls.length > 0 && (
          <div className="my-6 space-y-6">
            {mediaUrls.map((url, index) => {
              const isYouTube =
                url.includes("youtube.com") || url.includes("youtu.be");
              const isVideo =
                url.endsWith(".mp4") ||
                url.endsWith(".mov") ||
                url.includes("cloudinary.com") && url.includes("video");
              const isImage =
                url.endsWith(".jpg") ||
                url.endsWith(".jpeg") ||
                url.endsWith(".png") ||
                url.endsWith(".webp") ||
                url.endsWith(".gif");

              if (isYouTube) {
                const videoId =
                  url.includes("v=")
                    ? url.split("v=")[1]?.split("&")[0]
                    : url.split("/").pop();
                return (
                  <div key={index} className="my-6">
                    <iframe
                      className="rounded-lg w-full mx-auto"
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`YouTube Video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                );
              }

              if (isVideo) {
                return (
                  <div key={index} className="my-6">
                    <video
                      controls
                      className="rounded-lg w-full max-w-4xl mx-auto"
                      src={url}
                    />
                  </div>
                );
              }

              if (isImage || (!isYouTube && !isVideo)) {
                return (
                  <div key={index} className="my-6">
                    <img
                      className="rounded-lg w-full max-w-4xl mx-auto"
                      src={url}
                      alt={`Media ${index + 1}`}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}


        {/* Price & Views */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
          <p>
            <strong>💰 Price:</strong> ₹{price}
          </p>
          <p>
            <strong>👀 Views:</strong> {views}
          </p>
        </div>

        {/* Collaborator Info */}
        {lookingForCollaborators ? (
          <div className="bg-yellow-700/20 border border-yellow-600 rounded-xl p-4 shadow">
            <p className="text-yellow-400 font-bold text-center">
              🚀 This project is looking for collaborators!
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-green-600 transition duration-300">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
