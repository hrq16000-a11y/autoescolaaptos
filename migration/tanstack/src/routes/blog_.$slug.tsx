import { createFileRoute, redirect } from '@tanstack/react-router';
import Page, { getArticleJsonLd } from '@/pages/BlogPost';
import { getPostBySlug } from '../../../../src/data/blogData';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/blog_/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw redirect({ to: '/blog', statusCode: 302 });
    return post;
  },
  head: ({ loaderData: post }) => post ? pageHead(`${post.title} | Autoescola APTOS`, post.description, `/blog/${post.slug}`, getArticleJsonLd(post), 'article') : {},
  component: Page,
});
