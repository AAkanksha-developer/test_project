require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,

  rpcUrl: process.env.RPC_URL,

  privateKey: process.env.PRIVATE_KEY,

  counterAddress:
    process.env.COUNTER_CONTRACT_ADDRESS,

  realEstateAddress:
    process.env.REALESTATE_CONTRACT_ADDRESS
};

if (!config.rpcUrl) {
  throw new Error("RPC_URL is missing");
}

if (!config.privateKey) {
  throw new Error("PRIVATE_KEY is missing");
}

if (!config.counterAddress) {
  console.warn(
    "COUNTER_CONTRACT_ADDRESS is not configured"
  );
}

if (!config.realEstateAddress) {
  console.warn(
    "REALESTATE_CONTRACT_ADDRESS is not configured"
  );
}

module.exports = config;