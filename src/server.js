// src/server.js
import { decode, encode } from "js-base64";
import { createServer, Model, Response } from "miragejs";

const dummyUser = {
  name: "Test",
  email: "test@test.com",
  password: "test",
};

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", dummyUser);
    },

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        const user = schema.users.where(JSON.parse(request.requestBody));
        if (user.length) {
          console.log(user);
          return new Response(
            200,
            {},
            {
              token: encode(JSON.stringify(user.models[0]?.attrs)),
            }
          );
        }

        return new Response(204);
      });
      this.post("/register", (schema, request) => {
        const user = schema.users.create(JSON.parse(request.requestBody));
        if (user?.attrs) {
          return new Response(
            200,
            {},
            {
              token: encode(JSON.stringify(user?.attrs)),
            }
          );
        }

        return new Response(204);
      });
      this.get("/me", (schema, request) => {
        const token = request.requestHeaders.token;
        console.log(JSON.parse(decode(token)));
        return new Response(200, {}, JSON.parse(decode(token)));
      });
    },
  });

  return server;
}
