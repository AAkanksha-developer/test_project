const express = require("express");

const {
  listNFT,
  depositEarnest,
  updateInspection,
  approveSale,
  finalizeSale,
  cancelSale,
  getBalance,
  getEscrowDetails
} = require("../controllers/escrowController");


const router =
  express.Router();


// ======================================================
// SELLER LISTS NFT
// ======================================================

router.post(
  "/list",
  listNFT
);


// ======================================================
// BUYER DEPOSITS EARNEST MONEY
// ======================================================

router.post(
  "/deposit",
  depositEarnest
);


// ======================================================
// INSPECTOR UPDATES INSPECTION
// ======================================================

router.post(
  "/inspection",
  updateInspection
);


// ======================================================
// BUYER / SELLER / LENDER APPROVAL
// ======================================================

router.post(
  "/approve",
  approveSale
);


// ======================================================
// FINALIZE SALE
// ======================================================

router.post(
  "/finalize",
  finalizeSale
);


// ======================================================
// CANCEL SALE
// ======================================================

router.post(
  "/cancel",
  cancelSale
);


// ======================================================
// GET ESCROW BALANCE
// ======================================================

router.get(
  "/balance",
  getBalance
);


// ======================================================
// GET NFT ESCROW DETAILS
// ======================================================

router.get(
  "/:nftId",
  getEscrowDetails
);


module.exports = router;