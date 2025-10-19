/**
 * A flag to determine if the current environment is development.
 */
export const DEV_MODE = process.env.NODE_ENV !== 'production';

/**
 * A logger that will only log messages in development mode.
 */
export const DEV_LOGGER = DEV_MODE
  ? console
  : {
      log: () => {},
      warn: () => {},
      error: () => {},
    };

/**
 * Logs a message to the console.
 *
 * @param message - The message to log.
 * @param component - The component that is logging the message.
 * @param args - Additional arguments to log.
 * @returns void
 * @example
 * log("Hello, world!");
 * log("Hello, world!", "MyComponent");
 * log("Hello, world!", "MyComponent", { foo: "bar" });
 */
export const log = (message: string, component?: string, ...args: any[]) => {
  const componentLog = component ? `[${component}] ` : ' ';
  const logPrefix = `[NovaWaveUI]${componentLog}`;

  DEV_LOGGER.log(logPrefix + message, ...args);
};

/**
 * Logs a warning message to the console.
 *
 * @param message - The message to log.
 * @param component - The component that is logging the message.
 * @param args - Additional arguments to log.
 * @returns void
 * @example
 * warn("Hello, world!");
 * warn("Hello, world!", "MyComponent");
 * warn("Hello, world!", "MyComponent", { foo: "bar" });
 */
export const warn = (message: string, component?: string, ...args: any[]) => {
  const componentLog = component ? `[${component}] ` : ' ';
  const logPrefix = `[NovaWaveUI]${componentLog}Warning: `;

  DEV_LOGGER.warn(logPrefix + message, ...args);
};

/**
 * Logs an error message to the console.
 *
 * @param message - The message to log.
 * @param component - The component that is logging the message.
 * @param args - Additional arguments to log.
 * @returns void
 * @example
 * error("Hello, world!");
 * error("Hello, world!", "MyComponent");
 * error("Hello, world!", "MyComponent", { foo: "bar" });
 */
export const error = (message: string, component?: string, ...args: any[]) => {
  const componentLog = component ? `[${component}] ` : ' ';
  const logPrefix = `[NovaWaveUI]${componentLog}Error: `;

  DEV_LOGGER.error(logPrefix + message, ...args);
};
