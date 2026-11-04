const port = Number(Bun.env.PORT ?? 3000);

const server = Bun.serve({
  port,
  routes: {
    "/": () => Response.json({ name: "gh-lab", status: "ok" }),
    "/health": () => Response.json({ status: "ok", uptime: process.uptime() }),
    "/health/live": () => new Response("OK", { status: 200 }),
  },
  fetch() {
    return Response.json({ error: "Not Found" }, { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);
