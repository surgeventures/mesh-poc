const tracer = require("dd-trace");

tracer.init({
  logInjection: true,
  plugins: false,
});

tracer.use("express");
tracer.use("http");
tracer.use("http2");
tracer.use("grpc");
