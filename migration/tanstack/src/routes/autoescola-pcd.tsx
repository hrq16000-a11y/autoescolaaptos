import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/autoescola-pcd')({
  beforeLoad: () => {
    throw redirect({ to: '/pcd', statusCode: 301 });
  },
});
