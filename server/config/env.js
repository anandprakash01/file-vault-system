import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().min(1024).max(65535).default(3000),
  MONGO_URI: z.string().startsWith("mongodb"),
  JWT_SECRET_KEY: z.string().min(10),
  JWT_EXPIRE: z.string().default("7d"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log(`[ERROR] Invalid or Missing environment variables`);
  console.log(_env.error.format());
  process.exit(1);
}

const env = Object.freeze(_env.data);

export default env;
