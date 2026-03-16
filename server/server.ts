import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
app.get("/api/test", (c) => {
  console.log("Testing");
  return c.text("Hello World 9000");
});
app.get("*", serveStatic({ root: "../dist" }));
serve(app);
