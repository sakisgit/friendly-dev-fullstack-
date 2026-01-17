
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type {
  Project,
  PostMeta,
  StrapiResponse,
  StrapiProject,
} from "~/types";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev" },
    { name: "description", 
      content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  try {
    // Fetch posts-meta.json using the same pattern as blog route
    const postsUrl = new URL("/posts-meta.json", request.url);

    // Strapi URLs from env
    const apiUrl =
      import.meta.env.VITE_API_URL || "http://localhost:1337/api";
    const strapiUrl =
      import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

    const [projectRes, postRes] = await Promise.all([
      // VITE_API_URL already contains /api
      fetch(`${apiUrl}/projects?populate=image`),
      fetch(postsUrl.href),
    ]);

    if (!projectRes.ok) {
      throw new Error(
        `Failed to fetch projects: ${projectRes.status} ${projectRes.statusText}`,
      );
    }

    if (!postRes.ok) {
      throw new Error(
        `Failed to fetch posts: ${postRes.status} ${postRes.statusText}`,
      );
    }

    const projectsJson: StrapiResponse<StrapiProject> =
      await projectRes.json();
    const posts: PostMeta[] = await postRes.json();

    const projects: Project[] = projectsJson.data.map((p) => {
      const rawImageUrl =
        p.image?.formats?.medium?.url ??
        p.image?.formats?.small?.url ??
        p.image?.url ??
        "";

      const image = rawImageUrl
        ? `${strapiUrl}${rawImageUrl}`
        : "/images/no-image.png";

      return {
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
    });

    return { projects, posts };
  } catch (error) {
    console.error("Loader Error:", error);
    throw error;
  }
}

const HomePage = ({loaderData }: Route.ComponentProps) => {

  const {projects, posts} = loaderData;
  // console.log(posts);
  

  return (
      <>
        <FeaturedProjects projects={projects} count={2}/>
        <AboutPreview/>
        <LatestPosts posts={posts}/>
      </>
  );
};

export default HomePage;
