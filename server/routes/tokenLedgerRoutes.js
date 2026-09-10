const express = require("express");

const controller =
    require("../controllers/tokenLedgerController");

const router =
    express.Router();


// Token information
router.get(
    "/",
    controller.getTokenInfo
);


// Mint
router.post(
    "/mint",
    controller.mint
);


// Transfer
router.post(
    "/transfer",
    controller.transfer
);


// Balance
router.get(
    "/balance/:address",
    controller.getBalance
);


// Total supply
router.get(
    "/total-supply",
    controller.getTotalSupply
);


module.exports = router;