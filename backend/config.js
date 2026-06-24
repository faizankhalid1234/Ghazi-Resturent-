import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = Number(process.env.PORT) || 3001;
export const DATA_DIR = path.join(__dirname, "data");
export const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
export const ADMIN_USERS_FILE = path.join(DATA_DIR, "admin-users.json");
export const ADMIN_SESSIONS_FILE = path.join(DATA_DIR, "admin-sessions.json");
export const SITE_FILE = path.join(DATA_DIR, "site.json");

export const DEFAULT_ADMIN = {
  email: "admin@bhandukhan.com",
  password: "admin123",
  name: "Admin",
};

export const CORS_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];
