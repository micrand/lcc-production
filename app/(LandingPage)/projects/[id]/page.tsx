import ProjectDetailsContainer from "@/components/projects/ProjectDetailsContainer";
import { fetchProjectById } from "@/services/data";
import { notFound } from "next/navigation";
import { getIDFromProjectSlug } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchProjectById(getIDFromProjectSlug(id)).catch(() => null);
  return {
    title: project ? `${project.title || ''}` : "projet",
    description: project ? `${project.title || ''}` : "projet climatique",
  };
}

const FicheProject = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const project = await fetchProjectById(getIDFromProjectSlug(getIDFromProjectSlug(id))).catch((err) => {
    if (err.response?.status === 404) notFound();
    throw err;
  });
  if (!project) notFound();
  return (
    <ProjectDetailsContainer project={project} />
  );
};

export default FicheProject;
