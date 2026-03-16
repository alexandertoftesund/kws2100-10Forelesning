import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
app.get("/", (c) => c.text("Hello World 9000"));
serve(app);
