
import type {Route} from "./+types/details";
import type { Project, StrapiProject } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { getApiUrl, getImageUrl } from "~/lib/api";
import InProgressBadge from "~/components/InProgressBadge";

export async function loader({
    request, 
    params,
}:Route.LoaderArgs):Promise<Project> {
    const apiUrl = getApiUrl();
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

    const image = getImageUrl(rawImageUrl);

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
        inProgress: p.inProgress ?? false,
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
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h1 className="text-3xl font-bold text-blue-400">{project.title}</h1>
                        {project.inProgress && <InProgressBadge />}
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                        {/* {new Date(project.date).toLocaleDateString('en-GB')} - {project.category} */}
                        {formatDate(project.date)} - {project.category}
                    </p>
                    <p className="text-gray-200 mb-6 ">
                        {project.description}
                    </p>
                    {project.inProgress && !project.url ? (
                        <span className="inline-block text-gray-400 bg-gray-800 border border-gray-700 px-6 py-2 rounded cursor-default">
                            🚧 Live demo coming soon
                        </span>
                    ) : (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
                        >
                            {project.inProgress ? 'View Early Preview →' : 'View Live Site →'}
                        </a>
                    )}
            </div>
        </div>
    </>
  )
}

export default ProjectDetailsPage