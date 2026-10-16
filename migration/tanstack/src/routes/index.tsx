import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/')({ component: MigrationStatus });
function MigrationStatus() {
  return <main><h1>APTOS — ambiente de validação</h1><p>Estrutura TanStack Start em migração. Este ambiente não substitui o site público.</p></main>;
}
