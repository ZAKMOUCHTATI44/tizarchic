import Medusa from "@medusajs/medusa-js";
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: "http://localhost:9000",
  publishableApiKey:
    "pk_f0a397ce11f2ecfd756645e9d1a2e07d40a4c1fe13fe302731a93cbb982af6bc",
});

export default medusa;
