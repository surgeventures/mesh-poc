import { describe } from "../../enmesh";

export const service = describe({
  name: "Appointments",
  handler: {
    openapi: {
      endpoint: "http://localhost:3001/",
      source: "http://localhost:3001/api-json",
    },
  },
  transforms: [
    {
      prefix: {
        mode: "bare",
      },
    },
  ],
});
