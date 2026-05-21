import fileIndex from "./public/index.html";
import fileJs from "./public/main.js";

const server = Bun.serve({
    routes: {},
    // (optional) fallback for unmatched routes:
    // Required if Bun's version < 1.2.3
    async fetch(req) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const filePath = pathname === "/" ? "./public/index.html" : `./public${pathname}`;
        const file = Bun.file(filePath);
        const exists = await file.exists();
        if (!exists) {
            return new Response("Not Found", { status: 404 });
        }
        return new Response(file);
    },
});
console.log(`Server running at ${server.url}`);