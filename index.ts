const server = Bun.serve({
  routes: {
    "/": Bun.file("./public/index.html"),
    "/main.css": Bun.file("./public/main.css"),
    "/main.js": Bun.file("./public/main.js"),
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);


//===================================

const server = Bun.serve({
    routes: {},
    async fetch(req) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const localPath = pathname === "/" ? "public/src/index.html" : `public/src${pathname}`;
        const file = Bun.file(localPath);
        const exists = await file.exists();
        if (!exists)
            return new Response("Not Found", { status: 404 });
        return new Response(file);
    },});
console.log(`Server running at ${server.url}`);

