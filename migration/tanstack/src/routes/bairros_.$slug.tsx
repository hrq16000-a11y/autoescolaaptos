import { createFileRoute, notFound } from '@tanstack/react-router';
import Page, { getNeighborhoodJsonLd } from '@/pages/NeighborhoodPage';
import { getNeighborhoodBySlug } from '../../../../src/data/neighborhoods';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/bairros_/$slug')({
  loader: ({ params }) => {
    const neighborhood = getNeighborhoodBySlug(params.slug);
    if (!neighborhood) throw notFound();
    return neighborhood;
  },
  head: ({ loaderData: neighborhood }) => neighborhood ? pageHead(`${neighborhood.title} | Autoescola APTOS`, neighborhood.metaDescription, `/bairros/${neighborhood.slug}`, getNeighborhoodJsonLd(neighborhood)) : {},
  component: Page,
});
