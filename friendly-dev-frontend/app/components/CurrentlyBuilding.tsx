import type { Project } from "~/types";

const CurrentlyBuilding = ({ projects }: { projects: Project[] }) => {
  if (projects.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">
        🛠️ Currently Building
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col sm:flex-row gap-5 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
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
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  In Progress
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{project.description}</p>
              <span className="text-sm text-gray-400">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
