const { ethers } = require("ethers");

// ======================================================
// ENVIRONMENT
// ======================================================

const RPC_URL = process.env.RPC_URL;
const ESCROW_CONTRACT_ADDRESS =
  process.env.ESCROW_CONTRACT_ADDRESS;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!RPC_URL) {
  throw new Error("RPC_URL is not configured");
}

if (!ESCROW_CONTRACT_ADDRESS) {
  throw new Error(
    "ESCROW_CONTRACT_ADDRESS is not configured"
  );
}

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not configured");
}


// ======================================================
// ESCROW ABI
// ======================================================

const escrowABI = [

  // ------------------------------
  // LIST
  // ------------------------------

  "function list(uint256 _nftID, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public payable",

  // ------------------------------
  // DEPOSIT EARNEST
  // ------------------------------

  "function depositEarnest(uint256 _nftID) public payable",

  // ------------------------------
  // INSPECTION
  // ------------------------------

  "function updateInspectionStatus(uint256 _nftID, bool _passed) public",

  // ------------------------------
  // APPROVE SALE
  // ------------------------------

  "function approveSale(uint256 _nftID) public",

  // ------------------------------
  // FINALIZE
  // ------------------------------

  "function finalizeSale(uint256 _nftID) public",

  // ------------------------------
  // CANCEL
  // ------------------------------

  "function cancelSale(uint256 _nftID) public",

  // ------------------------------
  // GET BALANCE
  // ------------------------------

  "function getBalance() public view returns (uint256)",

  // ------------------------------
  // GET LISTED STATUS
  // ------------------------------

  "function isListed(uint256) public view returns (bool)",

  // ------------------------------
  // PURCHASE PRICE
  // ------------------------------

  "function purchasePrice(uint256) public view returns (uint256)",

  // ------------------------------
  // ESCROW AMOUNT
  // ------------------------------

  "function escrowAmount(uint256) public view returns (uint256)",

  // ------------------------------
  // BUYER
  // ------------------------------

  "function buyer(uint256) public view returns (address)",

  // ------------------------------
  // INSPECTION STATUS
  // ------------------------------

  "function inspectionPassed(uint256) public view returns (bool)",

  // ------------------------------
  // APPROVAL
  // ------------------------------

  "function approval(uint256, address) public view returns (bool)",

  // ------------------------------
  // SELLER
  // ------------------------------

  "function seller() public view returns (address)",

  // ------------------------------
  // INSPECTOR
  // ------------------------------

  "function inspector() public view returns (address)",

  // ------------------------------
  // LENDER
  // ------------------------------

  "function lender() public view returns (address)",

  // ------------------------------
  // NFT ADDRESS
  // ------------------------------

  "function nftAddress() public view returns (address)"
];


// ======================================================
// PROVIDER
// ======================================================

const provider =
  new ethers.JsonRpcProvider(RPC_URL);


// ======================================================
// WALLET
// ======================================================

const wallet =
  new ethers.Wallet(
    PRIVATE_KEY,
    provider
  );


// ======================================================
// CONTRACT
// ======================================================

const escrow =
  new ethers.Contract(
    ESCROW_CONTRACT_ADDRESS,
    escrowABI,
    wallet
  );


// ======================================================
// LIST NFT
// ======================================================

const listNFT = async (
  nftId,
  buyerAddress,
  purchasePrice,
  escrowAmount
) => {

  if (!ethers.isAddress(buyerAddress)) {
    throw new Error("Invalid buyer address");
  }

  const tx =
    await escrow.list(
      nftId,
      buyerAddress,
      purchasePrice,
      escrowAmount
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString(),

    buyer:
      buyerAddress,

    purchasePrice:
      purchasePrice.toString(),

    escrowAmount:
      escrowAmount.toString()

  };
};


// ======================================================
// DEPOSIT EARNEST
// ======================================================

const depositEarnest = async (
  nftId,
  amount
) => {

  const tx =
    await escrow.depositEarnest(
      nftId,
      {
        value: amount
      }
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString(),

    amount:
      ethers.formatEther(amount),

    amountWei:
      amount.toString()

  };
};


// ======================================================
// UPDATE INSPECTION
// ======================================================

const updateInspection = async (
  nftId,
  passed
) => {

  const tx =
    await escrow.updateInspectionStatus(
      nftId,
      passed
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString(),

    inspectionPassed:
      passed

  };
};


// ======================================================
// APPROVE SALE
// ======================================================

const approveSale = async (
  nftId
) => {

  const tx =
    await escrow.approveSale(
      nftId
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString(),

    approvedBy:
      wallet.address

  };
};


// ======================================================
// FINALIZE SALE
// ======================================================

const finalizeSale = async (
  nftId
) => {

  const tx =
    await escrow.finalizeSale(
      nftId
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString()

  };
};


// ======================================================
// CANCEL SALE
// ======================================================

const cancelSale = async (
  nftId
) => {

  const tx =
    await escrow.cancelSale(
      nftId
    );

  const receipt =
    await tx.wait();

  return {

    success: true,

    transactionHash:
      receipt.hash,

    nftId:
      nftId.toString()

  };
};


// ======================================================
// GET ESCROW BALANCE
// ======================================================

const getBalance = async () => {

  const balance =
    await escrow.getBalance();

  return {

    balanceWei:
      balance.toString(),

    balanceETH:
      ethers.formatEther(balance)

  };
};


// ======================================================
// GET ESCROW DETAILS
// ======================================================

const getEscrowDetails = async (
  nftId
) => {

  const [

    listed,

    purchasePrice,

    escrowAmount,

    buyer,

    inspectionPassed,

    seller,

    inspector,

    lender,

    nftAddress

  ] = await Promise.all([

    escrow.isListed(nftId),

    escrow.purchasePrice(nftId),

    escrow.escrowAmount(nftId),

    escrow.buyer(nftId),

    escrow.inspectionPassed(nftId),

    escrow.seller(),

    escrow.inspector(),

    escrow.lender(),

    escrow.nftAddress()

  ]);


  // ------------------------------------
  // APPROVAL STATUS
  // ------------------------------------

  const buyerApproved =
    await escrow.approval(
      nftId,
      buyer
    );

  const sellerApproved =
    await escrow.approval(
      nftId,
      seller
    );

  const lenderApproved =
    await escrow.approval(
      nftId,
      lender
    );


  return {

    nftId:
      nftId.toString(),

    escrowContract:
      ESCROW_CONTRACT_ADDRESS,

    nftAddress,

    listed,

    purchasePriceWei:
      purchasePrice.toString(),

    purchasePriceETH:
      ethers.formatEther(
        purchasePrice
      ),

    escrowAmountWei:
      escrowAmount.toString(),

    escrowAmountETH:
      ethers.formatEther(
        escrowAmount
      ),

    buyer,

    seller,

    inspector,

    lender,

    inspectionPassed,

    approvals: {

      buyer:
        buyerApproved,

      seller:
        sellerApproved,

      lender:
        lenderApproved

    }

  };
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {

  listNFT,

  depositEarnest,

  updateInspection,

  approveSale,

  finalizeSale,

  cancelSale,

  getBalance,

  getEscrowDetails

};