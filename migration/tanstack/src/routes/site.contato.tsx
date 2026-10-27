import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/site/contato')({
  beforeLoad: () => {
    // Keep the legacy contact intent while landing on the migrated home.
    throw redirect({ to: '/', hash: 'contato', statusCode: 301 });
  },
});
