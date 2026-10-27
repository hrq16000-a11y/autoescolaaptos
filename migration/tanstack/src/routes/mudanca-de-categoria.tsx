import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/mudanca-de-categoria')({
  beforeLoad: () => {
    throw redirect({ to: '/inclusao-categoria', statusCode: 301 });
  },
});
