
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type {
  Project,
  Post,
  StrapiResponse,
  StrapiProject,
  StrapiPost,
} from "~/types";
import { getApiUrl } from "~/lib/api";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sakis Dev Lab" },
    { name: "description", 
      content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
  const apiUrl = getApiUrl();
  try {
    const [projectsRes, postsRes] = await Promise.all([
      fetch(`${apiUrl}/projects?filters[featured][$eq]=true&populate=*`),
      fetch(`${apiUrl}/posts?sort[0]=date:desc&pagination[limit]=3&populate=image`),
    ]);
    if (!projectsRes.ok || !postsRes.ok) {
      return { projects: [], posts: [] };
    }

    const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
    const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

    const projects = projectsJson.data.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
      url: item.url,
      date: item.date,
      category: item.category,
      featured: item.featured,
    }));

    const posts = postsJson.data.map((item) => ({
      id: String(item.id),
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      body: item.body,
      image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    }));

    return { projects, posts };
  } catch {
    return { projects: [], posts: [] };
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
