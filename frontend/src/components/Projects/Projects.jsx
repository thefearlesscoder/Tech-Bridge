import React from "react";
import Img1 from "../../assets/startupIdeas/teaching.png";
import Img2 from "../../assets/startupIdeas/boutique.png";
import Img3 from "../../assets/startupIdeas/books.png";
import Img4 from "../../assets/startupIdeas/powerplant.png";
import { FaStar } from "react-icons/fa6";

const ProjectsData = [
  {
    id: 1,
    owner:"Antony",
    img: Img1,
    title: "Teaching project",
    rating: 5.0,
    category:"Teaching",
    aosDelay: "0",
  },
  {
    id: 2,
    owner:"David",
    img: Img2,
    title: "Boutique Idea",
    rating: 4.5,
    category:"Teaching",
    aosDelay: "200",
  },
  {
    id: 3,
    owner:"Sushmitha",
    img: Img3,
    title: "Books Startup",
    rating: 4.7,
    category:"Books",
    aosDelay: "400",
  },
  {
    id: 4,
    owner:"Rahul",
    img: Img4,
    title: "Power plant Startup",
    rating: 4.4,
    category:"Power plant",
    aosDelay: "600",
  },
  {
    id: 5,
    owner:"Antony",
    img: Img2,
    title: "Women startup idea",
    rating: 4.5,
    category:"Teaching",
    aosDelay: "800",
  },
];

const Projects = ({searchQuery=""}) => {
  const filteredProjects = searchQuery
  ? ProjectsData.filter((project) =>
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : ProjectsData;

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Projects for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Projects
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {filteredProjects.length > 0 ? (
              filteredProjects.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.category}</p>
                  <p className="text-sm text-gray-600">Owner : {data.owner}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))): (
              <p className="text-center text-gray-500 col-span-full">No projects found.</p>
            )}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
