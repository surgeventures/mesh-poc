require("dd-trace").init();

const fs = require("fs");
const jose = require("node-jose");

const keyFile = "keys.json";

if (!fs.existsSync(keyFile)) {
  const keyStore = jose.JWK.createKeyStore();

  keyStore
    .generate("RSA", 2048, { alg: "RS256", use: "sig" })
    .then((result) => {
      fs.writeFileSync(
        keyFile,
        JSON.stringify(keyStore.toJSON(true), null, "  ")
      );
    });
}

const express = require("express");
const app = express();
const port = 3004;
const ms = require("ms");

app.get("/jwks", async (req, res) => {
  const ks = fs.readFileSync(keyFile);

  const keyStore = await jose.JWK.asKeyStore(ks.toString());

  res.json(keyStore.toJSON());
});

app.get("/tokens", async (req, res) => {
  const JWKeys = fs.readFileSync("keys.json");

  const keyStore = await jose.JWK.asKeyStore(JWKeys.toString());

  const [key] = keyStore.all({ use: "sig" });

  const opt = { compact: true, jwk: key, fields: { typ: "jwt" } };

  const validPayload = JSON.stringify({
    exp: Math.floor((Date.now() + ms("1d")) / 1000),
    iat: Math.floor(Date.now() / 1000),
    sub: "valid-token",
  });

  const expiredPayload = JSON.stringify({
    exp: Math.floor((Date.now() - ms("1d")) / 1000),
    iat: Math.floor(Date.now() / 1000),
    sub: "expired-token",
  });

  const expiringIn15SecondsPayload = JSON.stringify({
    exp: Math.floor((Date.now() + ms("15s")) / 1000),
    iat: Math.floor(Date.now() / 1000),
    sub: "expiring-in-15s-token",
  });

  const validToken = await jose.JWS.createSign(opt, key)
    .update(validPayload)
    .final();

  const expiredToken = await jose.JWS.createSign(opt, key)
    .update(expiredPayload)
    .final();

  const expiringIn15SecondsToken = await jose.JWS.createSign(opt, key)
    .update(expiringIn15SecondsPayload)
    .final();

  res.json({ validToken, expiredToken, expiringIn15SecondsToken });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
