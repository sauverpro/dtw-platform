"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const env_1 = require("../src/config/env");
const prisma = new client_1.PrismaClient();
async function main() {
    const passwordHash = await bcryptjs_1.default.hash(env_1.env.ADMIN_PASSWORD, 12);
    await prisma.adminUser.upsert({
        where: { email: env_1.env.ADMIN_EMAIL },
        update: { passwordHash },
        create: { email: env_1.env.ADMIN_EMAIL, passwordHash }
    });
    const defaultJsonPath = node_path_1.default.resolve(__dirname, "default-site-content.json");
    const defaultContent = JSON.parse(await (0, promises_1.readFile)(defaultJsonPath, "utf-8"));
    await prisma.siteContent.upsert({
        where: { key: "main" },
        update: {},
        create: {
            key: "main",
            content: defaultContent,
            version: 1
        }
    });
    console.log("Seed complete");
}
main()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
