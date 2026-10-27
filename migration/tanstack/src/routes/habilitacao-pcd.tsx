import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/habilitacao-pcd')({
  beforeLoad: () => {
    throw redirect({ to: '/pcd', statusCode: 301 });
  },
});
