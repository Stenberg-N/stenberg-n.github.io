import { samples } from '$lib/samples.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = ({ params }) => {
  const sample = samples.find((s) => s.slug === params.slug);

  if (!sample) throw error(404, 'No sample found');

  return { sample };
};

export const entries = () => {
  return samples.map((s) => ({ slug: s.slug }));
};