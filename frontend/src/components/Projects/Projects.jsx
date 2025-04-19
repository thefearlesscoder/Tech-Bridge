import React from "react";
import Img1 from "../../assets/startupIdeas/teaching.png";
import Img2 from "../../assets/startupIdeas/boutique.png";
import Img3 from "../../assets/startupIdeas/books.png";
import Img4 from "../../assets/startupIdeas/powerplant.png";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { setLoading } from "../../slices/authSlice";
import { BASE_URL } from "../../../data";
import { useNavigate } from "react-router-dom";

const ProjectsData = [
  {
    _id: 1,
    userId: { _id: "1", fullname: "Varsha" },
    img: Img1,
    title: "Teaching project",
    price: 500,
    category: ["Teaching"],
    aosDelay: "200",
    email: "varshasakaray005@gmail.com",
  },
  {
    _id: 2,
    userId: { _id: "2", fullname: "David" },
    img: Img2,
    title: "Boutique Idea",
    price: 700,
    category: ["Blockchain"],
    aosDelay: "300",
    email: "david@example.com",
  },
  {
    _id: 3,
    userId: { _id: "3", fullname: "Sushmitha" },
    img: Img3,
    title: "Startup",
    price: 400,
    category: ["Web"],
    aosDelay: "400",
    email: "sushmitha@example.com",
  },
  {
    _id: 4,
    userId: { _id: "4", fullname: "Rahul" },
    img: Img4,
    title: "Startup",
    price: 900,
    category: ["Energy"],
    aosDelay: "500",
    email: "rahul@example.com",
  },
  {
    _id: 5,
    userId: { _id: "5", fullname: "Antony" },
    img: Img2,
    title: "Women startup idea",
    price: 600,
    category: ["Web"],
    aosDelay: "600",
    email: "antony@example.com",
  },
];

const Projects = ({ searchQuery = "" }) => {
  const [allProjects, setAllProjects] = useState([]);
  const navigate = useNavigate();

  const getProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/project/completedprojects`, {
        withCredentials: true,
      });
      console.log("Projects response:", response.data);
      setAllProjects(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  };

  const filteredProjects = searchQuery
    ? allProjects.filter((project) => {
        const categoryMatch = Array.isArray(project.category)
          ? project.category[0]?.toLowerCase().includes(searchQuery.toLowerCase())
          : project.category?.toLowerCase().includes(searchQuery.toLowerCase());

        const ownerMatch = project.userId?.fullname
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        return categoryMatch || ownerMatch;
      })
    : ProjectsData;

  // const handleApply = async (projectId) => {
  //   try {
  //     const response = await axios.post(`/api/v1/apply/${projectId}`);
  //     alert(response.data.message);
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Something went wrong");
  //   }
  // };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="mt-14 mb-12 w-full">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-primary text-sm font-medium">
            Top Selling Projects for You
          </p>
          <h1 data-aos="fade-up" className="text-3xl md:text-4xl font-bold mt-2">
            Projects
          </h1>
          <p data-aos="fade-up" className="text-sm md:text-lg text-gray-500 mt-3">
            Discover innovative projects looking for collaborators and investors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data._id}
                className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-xl w-[200px] sm:w-[220px] p-4 flex flex-col items-center"
              >
                <img
                  src={data.img || Img1}
                  alt={data.title}
                  className="h-[180px] w-full object-cover rounded-lg mb-3"
                />
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.category?.[0]}</p>
                  <p className="text-sm text-gray-600">
                    Owner: {data.userId?.fullname || "Unknown"}
                  </p>
                  <div className="flex justify-center items-center gap-1 text-sm">
                    <FaIndianRupeeSign className="text-blue-400" />
                    <span className="text-gray-700">{data.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => { navigate(`/project-detail/${data._id}`)} }
                  className="mt-4 bg-primary text-gray-850 py-1.5 px-4 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105"
                >
                  View Detail
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
