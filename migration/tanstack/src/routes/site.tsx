import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/site')({
  beforeLoad: () => {
    throw redirect({ to: '/', statusCode: 301 });
  },
});
