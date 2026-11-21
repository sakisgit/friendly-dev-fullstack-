import { Link } from "react-router";
import type { Project } from "~/types";
import InProgressBadge from "./InProgressBadge";

const CurrentlyBuilding = ({ projects }: { projects: Project[] }) => {
  if (projects.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">
        🛠️ Currently Building
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.documentId}`}
            className="flex flex-col sm:flex-row gap-5 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transform transition duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full sm:w-56 h-40 sm:h-auto object-cover"
            />
            <div className="p-5 sm:pl-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-blue-400">
                  {project.title}
                </h3>
                <InProgressBadge />
              </div>
              <p className="text-sm text-gray-300 mb-3">{project.description}</p>
              <span className="text-sm text-gray-400">{project.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
