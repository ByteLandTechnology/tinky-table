import { type WriteStream } from "tinky";

/**
 * Fake process.stdout for testing.
 * Captures all output written to it.
 */
type FakeStdout = {
  /**
   * Returns the output from the last call to write.
   */
  get: () => string;

  /**
   * Returns the output from the first call to write.
   */
  firstCall: () => string;

  /**
   * Returns the total number of calls to write.
   */
  callCount: () => number;

  /**
   * Contains all the output that was written to stdout as a single string.
   */
  output: string;
  emit: (event: string, ...args: unknown[]) => boolean;
  listeners: (event: string) => ((...args: unknown[]) => void)[];
} & WriteStream;

/**
 * Creates a mocked stdout stream for capturing output.
 *
 * @param columns - Number of columns in the fake terminal. Default is 100.
 * @returns A fake stdout object.
 */
export const createStdout = (columns?: number): FakeStdout => {
  const frames: string[] = [];
  const calls: { args: [string] }[] = [];
  const eventListeners = new Map<string, ((...args: unknown[]) => void)[]>();

  const stdout: FakeStdout = {
    columns: columns ?? 100,
    rows: 24,

    write: (str: string) => {
      // Ignore cursor hide/show sequences
      if (str === "\x1B[?25l" || str === "\x1B[?25h") {
        return true;
      }
      frames.push(str);
      calls.push({ args: [str] });
      return true;
    },

    emit: (event: string, ...args: unknown[]) => {
      const listeners = eventListeners.get(event) || [];
      listeners.forEach((fn) => fn(...args));
      return listeners.length > 0;
    },

    on: (event: string, fn: (...args: unknown[]) => void) => {
      const listeners = eventListeners.get(event) || [];
      listeners.push(fn);
      eventListeners.set(event, listeners);
      return stdout;
    },

    off: (event: string, fn: (...args: unknown[]) => void) => {
      const listeners = eventListeners.get(event) || [];
      const index = listeners.indexOf(fn);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
      return stdout;
    },

    listeners: (event: string) => eventListeners.get(event) || [],

    get: () => (calls[calls.length - 1]?.args[0] as string) || "",
    firstCall: () => (calls[0]?.args[0] as string) || "",
    callCount: () => calls.length,
    output: "",
  };

  Object.defineProperty(stdout, "output", {
    get: () => frames.join(""),
  });

  return stdout;
};
