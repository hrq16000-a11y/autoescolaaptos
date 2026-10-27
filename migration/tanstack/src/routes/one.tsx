import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/1')({
  beforeLoad: () => {
    throw redirect({ to: '/', statusCode: 301 });
  },
});
