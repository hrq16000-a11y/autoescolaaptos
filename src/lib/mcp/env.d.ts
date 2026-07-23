// Ambient shim: MCP tool files under src/lib/mcp/ are bundled by the mcp plugin
// into a Deno edge function where `process.env` is available. Declaring it here
// lets Vite's TS type-check pass in the client context.
declare const process: { env: Record<string, string | undefined> };
