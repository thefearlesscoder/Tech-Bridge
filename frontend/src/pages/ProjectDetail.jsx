import axios from "axios";
import React, { useEffect, useState } from "react";
import { setLoading } from "../slices/authSlice";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../data";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [mybookmark, setMybookmark] = useState([]);

  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const sessionId = searchParams.get("session_id");


  const paymentdone = async () => { 
    try {
      const res = await axios.post(
        `${BASE_URL}/purchase/${id}`,
        { sessionId },
        { withCredentials: true }
      );
      console.log("Payment response:", res.data);
      setProject(res.data?.data);
      console.log("Payment successful!");
      toast.success("Payment successful! Thank you for your purchase.");
    } catch (e) {
      console.log("Payment error:", e);
      toast.error("Payment failed. Please try again.");
    }
  }
  useEffect( () => {
    if (paymentStatus === "success") {

      paymentdone();
    }
  }, [paymentStatus]);

  const { token , loading } =  useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getProjectDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/project/details/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setProject(res.data?.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast.error("Failed to fetch project details.");
    } finally {
      setLoading(false);
    }
  };
  
  const getMyBookmark = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/project/bookmarkedprojects`, {
        withCredentials: true,
      });
      console.log(res.data);
      setMybookmark(res.data?.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Failed to fetch bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectDetails();
    getMyBookmark();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <p className="text-xl text-red-500">Project details not found.</p>
      </div>
    );
  }

  const handlewishlist = async() => {
    setLoading(true);
    try {

      if ( mybookmark.includes(id) ) {
        const res = await axios.delete(
          `${BASE_URL}/project/removebookmark/${id}`,
          { withCredentials: true }
        );

        console.log(res.data);
        toast.success("Removed from wishlist!");
        setMybookmark((prev) => prev.filter((item) => item !== project._id));
        setLoading(false);
        console.log(mybookmark)
        return;
      }
      
      const res = await axios.post(
        `${BASE_URL}/project/addbookmark/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Added to wishlist!");
      setMybookmark((prev) => [...prev, project._id]);
      console.log("mybook -> ",mybookmark)
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist.");
    }finally {
      setLoading(false);
    }
  }

  const {
    userId,
    title,
    description,
    category,
    views,
    viewLogs,
    lookingForCollaborators,
    requiredSkills,
    price,
    gitHub,
    pitchDeckUrl,
    mediaUrls,
  } = project;

  const len = viewLogs?.length || 0;

  const handleAddToWishlist = () => {
    toast.success("Added to Wishlist!");
    // You can also send a POST request to save wishlist to DB if needed
  };


  // payment integration
  
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QJ5RTAI8xVNoO7TqaukjHHfkOi5Nj0OPYYTToUwQkjukxrZ3RH0QZ92gH1bvqyUlxevQAz0hIHqkSomC1FFrPtQ00CCVZnGM8"
      );

      const body = {
        project ,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        `${BASE_URL}/project/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
          credentials: "include" 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      // console.log(response) ;
      const session = await response.json();
      console.log("Session object:", session); // Debug: Check session data

      if (!session.id) {
        throw new Error("Session ID is missing in the response");
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      console.log("Result from Stripe:", result); // Debug: Check result data
      // console.log(result)
      if (result.error) {
        console.error(result.error.message);
      }
      
      // addingDetails() ;
      // navigate(session.session_url) ;
    } catch (error) {
      console.error("Error:", error);
    }

    // toast.success("Payment Success");
  };

  const commonfun = async () => {
    // makePayment() ;
    if (token == null || token == undefined ) {
        toast.error("You need to login") ;
    }else {

      const res = await makePayment();
      
        // await makePayment() ;
        // navigate(`/register-succes/${id}`);
        // toast.success("Registed successfull");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-700 shadow-xl rounded-2xl p-8 space-y-10">

        {/* Title and Category */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h1>
          <p className="text-sm text-gray-400">
            <strong>Category:</strong> {category?.join(", ")}
          </p>

          {/* Wishlist Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlewishlist}
              className={`${
                mybookmark.includes(id) ? "bg-red-600 hover:bg-red-700" : "bg-pink-600 hover:bg-pink-700"
              } text-white font-semibold px-6 py-2 rounded-xl transition duration-300`}
            >
              {mybookmark.includes(id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl p-5 shadow">
          <img
            src={userId?.avatar}
            alt="Owner Avatar"
            className="w-14 h-14 rounded-full border border-purple-600 object-cover"
          />
          <div>
            <h3 className="text-lg font-medium text-white">{userId?.fullname}</h3>
            <p className="text-sm text-gray-400">{userId?.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">Description</h3>
          <p className="text-gray-300 leading-loose">{description}</p>
        </div>

        {/* Required Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">
            Full Tech Stack / Tools Used
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
        <div className="flex flex-col gap-4 items-center">
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
                (url.includes("cloudinary.com") && url.includes("video"));
              const isImage =
                url.endsWith(".jpg") ||
                url.endsWith(".jpeg") ||
                url.endsWith(".png") ||
                url.endsWith(".webp") ||
                url.endsWith(".gif");

              if (isYouTube) {
                const videoId = url.includes("v=")
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
            <strong>👀 Views:</strong> {len}
          </p>
        </div>

        {/* Collaborator Info or Buy Button */}
        {lookingForCollaborators ? (
          <div className="bg-yellow-700/20 border border-yellow-600 rounded-xl p-4 shadow">
            <p className="text-yellow-400 font-bold text-center">
              🚀 This project is looking for collaborators!
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <button onClick={commonfun} className="bg-green-500 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-green-600 transition duration-300">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
