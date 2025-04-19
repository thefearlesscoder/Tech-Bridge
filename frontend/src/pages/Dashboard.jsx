import React from "react";
import Hero from "../components/Hero/Hero";
// TopProjects
import Banner from "../components/Banner/Banner";
import Subscribe from "../components/Subscribe/Subscribe";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";
import Popup from "../components/Popup/Popup";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";
import TopProjects from "../components/TopProjects/TopProjects";

const Dashboard = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero handleOrderPopup={handleOrderPopup} />
      <Projects />
      <TopProjects handleOrderPopup={handleOrderPopup} />
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Dashboard;
