import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/modelo1')({
  beforeLoad: () => {
    throw redirect({ to: '/', statusCode: 301 });
  },
});
