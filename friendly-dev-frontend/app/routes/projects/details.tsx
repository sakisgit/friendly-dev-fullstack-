
import type {Route} from "./+types/details";
import type { Project, StrapiProject } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export async function loader({
    request, 
    params,
}:Route.LoaderArgs):Promise<Project> {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:1337/api";
    const documentId = params.documentId;

    // Fetch by documentId using filter
    const res = await fetch(`${apiUrl}/projects?filters[documentId][$eq]=${documentId}&populate=image`);

    if(!res.ok) throw new Response('Project not found', {status:404});

    const json: { data: StrapiProject[]; meta?: any } = await res.json();
    
    if (!json.data || json.data.length === 0) {
        throw new Response('Project not found', {status:404});
    }
    
    const p = json.data[0];

    const rawImageUrl =
        p.image?.formats?.medium?.url ??
        p.image?.formats?.small?.url ??
        p.image?.url ??
        "";

    const image = rawImageUrl
        ? `${rawImageUrl}`
        : "/images/no-image.png";

    const project: Project = {
        id: String(p.id),
        documentId: p.documentId,
        title: p.title,
        description: p.description,
        image,
        url: p.url,
        date: p.date,
        category: p.category,
        featured: p.featured,
    };

    return project;
};

export function HydrateFallback() {
    return <img src="/spinner.gif" alt="Loadding..."/>;
}

const formatDate = (isoDate?: string) => {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const ProjectDetailsPage = ({loaderData}:Route.ComponentProps) => {
  const project = loaderData;
  return (
    <>
        <Link 
            to='/projects' 
            className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
        >
            <FaArrowLeft className="mr-2"/> Back To Projects
        </Link>

        <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full rounded-lg shwdow-md"
                />
            </div>
                
            <div>
                    <h1 className="text-3xl font-bolt text-blue-400 mb-4 ">{project.title}</h1>
                    <p className="text-gray-300 text-sm mb-4">
                        {/* {new Date(project.date).toLocaleDateString('en-GB')} - {project.category} */}
                        {formatDate(project.date)} - {project.category}
                    </p>
                    <p className="text-gray-200 mb-6 ">
                        {project.description}
                    </p>
                    <a 
                        href={project.url} 
                        target="_blanked"
                        className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
                    >
                        View Live Site →    
                    </a>
            </div>
        </div>
    </>
  )
}

export default ProjectDetailsPage