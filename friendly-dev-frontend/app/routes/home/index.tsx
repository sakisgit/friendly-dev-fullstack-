
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import CurrentlyBuilding from "~/components/CurrentlyBuilding";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type {
  Project,
  Post,
  StrapiResponse,
  StrapiProject,
  StrapiPost,
} from "~/types";
import { getApiUrl, getImageUrl } from "~/lib/api";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sakis Dev Lab" },
    { name: "description", 
      content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[]; inProgress: Project[] }> {
  const apiUrl = getApiUrl();
  try {
    const [projectsRes, postsRes, inProgressRes] = await Promise.all([
      fetch(`${apiUrl}/projects?filters[featured][$eq]=true&sort[0]=date:desc&populate=*`),
      fetch(`${apiUrl}/posts?sort[0]=date:desc&pagination[limit]=3&populate=image`),
      fetch(`${apiUrl}/projects?filters[inProgress][$eq]=true&sort[0]=date:desc&populate=*`),
    ]);
    if (!projectsRes.ok || !postsRes.ok) {
      return { projects: [], posts: [], inProgress: [] };
    }

    const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
    const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

    // Optional section: a failure here must not break the rest of the page.
    const inProgressJson: StrapiResponse<StrapiProject> = inProgressRes.ok
      ? await inProgressRes.json()
      : { data: [] };

    const toProject = (item: StrapiProject): Project => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: getImageUrl(item.image?.url),
      url: item.url,
      date: item.date,
      category: item.category,
      featured: item.featured,
      inProgress: item.inProgress ?? false,
    });

    const projects = projectsJson.data.map(toProject).filter((p) => !p.inProgress);
    const inProgress = inProgressJson.data.map(toProject);

    const posts = postsJson.data.map((item) => ({
      id: String(item.id),
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      body: item.body,
      image: getImageUrl(item.image?.url),
    }));

    return { projects, posts, inProgress };
  } catch {
    return { projects: [], posts: [], inProgress: [] };
  }
}

const HomePage = ({loaderData }: Route.ComponentProps) => {

  const {projects, posts, inProgress} = loaderData;
  // console.log(posts);
  

  return (
      <>
        <FeaturedProjects projects={projects} count={2}/>
        <CurrentlyBuilding projects={inProgress}/>
        <AboutPreview/>
        <LatestPosts posts={posts}/>
      </>
  );
};

export default HomePage;
