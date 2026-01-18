import { ReactNode } from "react";
import { render } from "tinky";
import { createStdout } from "./create-stdout.js";

/**
 * Renders a React component to a string, simulating Tinky rendering.
 *
 * @param node - The React component to render.
 * @param options - Configuration options.
 * @param options.columns - The width of the simulated terminal in columns.
 * @returns The rendered string output.
 */
export const renderToString: (
  node: ReactNode,
  options?: { columns?: number },
) => string = (node, options) => {
  const stdout = createStdout(options?.columns ?? 100);

  render(node, {
    stdout,
    debug: true,
  });

  return stdout.get();
};
