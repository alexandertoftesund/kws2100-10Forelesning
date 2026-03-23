import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const app = new Hono();

const postgresql = new pg.Pool({
  user: "postgres",
  password: "password",
  database: "postgres",
  host: "localhost",
  port: 5432,
});

app.get("/api/grunnskoler", async (c) => {
  const result = await postgresql.query(
    `select  skolenavn, eierforhold, antallelever, posisjon::json as geometry
     from grunnskoler_d3dd22a6be80438d9f44b0afa9b82b1b.grunnskole s
     `,
  );
  return c.json({
    type: "FeatureCollection",
    features: result.rows.map(({ geometry, ...properties }) => ({
      type: "Feature",
      properties,
      geometry,
    })),
  });
});
serve(app);
