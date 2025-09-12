import { useEffect, useState } from "react";
import { Card, CardContent } from "./components/card";
import { Badge } from "./components/badge";
import { FaReact, FaPython, FaDocker, FaRobot } from "react-icons/fa";
import { SiMongodb, SiFastapi, SiNodedotjs } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import { motion } from "framer-motion";

export default function Portfolio() {
  useEffect(() => {
    document.title = "My PoCs";
  }, []);

  const [hoveredIcon, setHoveredIcon] = useState(null);

  const poCs = [
    {
      title: "CRUD Contact Manager",
      url: "https://crud-gray-six.vercel.app/",
      description:
        "Full-stack application. Frontend built with React + Vite, backend in Node.js + Express, connected to MongoDB hosted on Render. Provides a fully functional CRUD system for managing persistent data.",
      icons: [
        { icon: <FaReact size={40} color="#61DAFB" />, name: "React", circular: true },
        { icon: <SiNodedotjs size={40} color="#339933" />, name: "Node.js", circular: true },
        { icon: <SiMongodb size={40} color="#47A248" />, name: "MongoDB", circular: true },
        {
          icon: <img src="/render.png" alt="Render" className="w-10 h-10 object-contain" />,
          name: "Render",
          circular: false, // Render rectangular
        },
      ],
    },
    {
      title: "FastAPI Dockerized Microservice",
      url: "https://container-4j5q.onrender.com/docs",
      description:
        "A lightweight, portable backend microservice built with Python and FastAPI, containerized with Docker, and deployed to the cloud for easy integration and demonstration of modern backend skills.",
      icons: [
        { icon: <FaPython size={40} color="#3776AB" />, name: "Python", circular: true },
        { icon: <SiFastapi size={40} color="#009688" />, name: "FastAPI", circular: true },
        { icon: <FaDocker size={40} color="#2496ED" />, name: "Docker", circular: true },
      ],
    },
    {
      title: "AI-Powered Interactive CV",
      url: "https://cv-mariano.vercel.app/",
      description:
        "An AI-powered, interactive version of a professional CV that allows dynamic exploration of skills, experience, and achievements, showcasing innovation in user experience and AI integration.",
      icons: [
        { icon: <MdDescription size={40} color="#FFCA28" />, name: "CV", circular: true },
        { icon: <FaReact size={40} color="#61DAFB" />, name: "React", circular: true },
        { icon: <FaRobot size={40} color="#FF5733" />, name: "ChatBot AI", circular: true },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My PoCs</h1>

      <div className="flex flex-col gap-6">
        {poCs.map((poc, idx) => (
          <motion.a
            key={idx}
            href={poc.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className="bg-gray-800 rounded-xl p-6 hover:shadow-2xl hover:border-2 hover:border-blue-500 transition-all duration-300">
              <CardContent>
                <h2 className="text-2xl font-semibold mb-2">{poc.title}</h2>
                <p className="mb-4 text-gray-300">{poc.description}</p>
                <div className="flex gap-6">
                  {poc.icons.map((item, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => setHoveredIcon(item.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                    >
                      <Badge
                        className={`transition-transform duration-300 hover:scale-125 ${
                          item.circular ? "rounded-full" : "rounded-md"
                        }`}
                      >
                        {item.icon}
                      </Badge>
                      {hoveredIcon === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: -5 }}
                          exit={{ opacity: 0, y: 0 }}
                          className="absolute -top-6 bg-gray-600 text-white text-sm px-2 py-1 rounded shadow-lg pointer-events-none"
                        >
                          {item.name}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
