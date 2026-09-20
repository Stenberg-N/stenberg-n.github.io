import { projects } from "$lib/projects";
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = ({ params }) => {
  const project = projects.find(
    (p) => p.slug === params.slug
  );

  if (!project) {
    throw error(404, 'Project not found');
  }

  return { project };
};

export const entries = () => {
  return projects.map((p) => ({ slug: p.slug }));
};