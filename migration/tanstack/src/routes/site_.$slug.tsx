import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/site_/$slug')({
  beforeLoad: () => {
    throw redirect({ to: '/', hash: 'contato', statusCode: 301 });
  },
});
