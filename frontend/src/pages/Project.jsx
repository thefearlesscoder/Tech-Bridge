import React from "react";
import ProjectCard from "../components/ProjectCard";

export const Project = () => {
  const projects = [
    {
      title: "SecureChat",
      description: "A mobile chat application (P2P) with AES/DES encryption/decryption of messages and images, using RSA for key encryption/decryption.",
      location: "Hack 36",
      date: "2020-02-16",
      team: ["Qabeel Dugal", "Rupesh Wali"],
      id: "securechat"
    },
    {
      title: "HealthBridge",
      description: "A smart healthcare platform for real-time vitals tracking and remote doctor access.",
      location: "Health Hack '24",
      date: "2024-11-08",
      team: ["Aditi Sharma", "Rohan Patel"],
      id: "healthbridge"
    },
    {
      title: "EcoTrack",
      description: "Track your carbon footprint with detailed analytics and green tips.",
      location: "EcoHack",
      date: "2023-09-12",
      team: ["Neha Verma", "Arjun Roy"],
      id: "ecotrack"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};
