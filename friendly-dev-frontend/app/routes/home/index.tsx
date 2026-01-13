
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type { Project } from "~/types";
import type { PostMeta} from "~/types";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev" },
    { name: "description", 
      content: "Custom website development" },
  ];
}

export async function loader({request,}:Route.LoaderArgs): Promise<{projects:Project[]; posts: PostMeta[]}> {
  try {
    // Fetch posts-meta.json using the same pattern as blog route
    const postsUrl = new URL('/posts-meta.json', request.url);
    
    // Check if VITE_API_URL is configured, use default if not
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const [projectRes, postRes] = await Promise.all([
      fetch(`${apiUrl}/projects`),
      fetch(postsUrl.href)
    ]);

    if(!projectRes.ok) {
      throw new Error(`Failed to fetch projects: ${projectRes.status} ${projectRes.statusText}`);
    }

    if(!postRes.ok) {
      throw new Error(`Failed to fetch posts: ${postRes.status} ${postRes.statusText}`);
    }

    const [projects, posts] = await Promise.all([
      projectRes.json(),
      postRes.json()
    ]);

    // console.log('Loader - Projects:', projects);
    // console.log('Loader - Posts:', posts);
    
    return {projects, posts};
  } catch (error) {
    console.error('Loader Error:', error);
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
