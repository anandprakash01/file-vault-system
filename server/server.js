import http from "http";
import os from "os";
import cluster from "cluster";

import env from "./config/env.js";
import connectDB from "./config/db.js";
import app from "./src/app.js";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`[PRIMARY] Process (PID: ${process.pid}) is booting...`);
  console.log(`[PRIMARY] detecting ${numCPUs} CPU cores, forking workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `[WORKER ${worker.id}] (PID: ${worker.process.pid}) exited with code ${code}, booting replacement...`,
    );
    cluster.fork();
  });
} else {
  const server = http.createServer(app);

  const startServer = async () => {
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(
        `[WORKER ${cluster.worker.id}] (PID: ${process.pid}) is listing on port ${env.PORT} in [${env.NODE_ENV}] mode`,
      );
    });
  };

  startServer();

  process.on("uncaughtException", err => {
    console.log(`[ERROR] Uncaught Exception, Shutting down...`);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.log(`[ERROR] Unhandled Rejection, Shutting down...`);
    server.close(() => {
      process.exit(1);
    });
  });
}
