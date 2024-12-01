import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProd = process.env.NODE_ENV === "production";
const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport:
        !isEdge && !isProd
            ? {
                  target: "pino-pretty",
                  options: {
                      colorized: true,
                      ignore: "pid,hostname",
                      translateTime: "SYS:standard",
                  },
              }
            : undefined,
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
});

export default logger;
