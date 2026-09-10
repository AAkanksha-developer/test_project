const { ethers } = require("ethers");

const RPC_URL =
    process.env.RPC_URL || "http://127.0.0.1:8545";

const PRIVATE_KEY =
    process.env.PRIVATE_KEY;

const CONTRACT_ADDRESS =
    process.env.TOKEN_LEDGER_ADDRESS;


if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is missing in .env"
    );
}


if (!CONTRACT_ADDRESS) {
    throw new Error(
        "TOKEN_LEDGER_ADDRESS is missing in .env"
    );
}


// ==========================================
// PROVIDER
// ==========================================

const provider =
    new ethers.JsonRpcProvider(
        RPC_URL
    );


// ==========================================
// WALLET
// ==========================================

const wallet =
    new ethers.Wallet(
        PRIVATE_KEY,
        provider
    );


// ==========================================
// ABI
// ==========================================

const tokenLedgerABI = [

    "function name() view returns (string)",

    "function symbol() view returns (string)",

    "function totalSupply() view returns (uint256)",

    "function getTotalSupply() view returns (uint256)",

    "function balanceOf(address account) view returns (uint256)",

    "function mint(address to, uint256 amount)",

    "function transfer(address to, uint256 amount) returns (bool)"
];


// ==========================================
// CONTRACT
// ==========================================

const tokenLedger =
    new ethers.Contract(
        CONTRACT_ADDRESS,
        tokenLedgerABI,
        wallet
    );


// ==========================================
// GET TOKEN INFO
// ==========================================

const getTokenInfo = async () => {

    const [
        name,
        symbol,
        totalSupply
    ] = await Promise.all([

        tokenLedger.name(),

        tokenLedger.symbol(),

        tokenLedger.totalSupply()

    ]);


    return {

        address:
            CONTRACT_ADDRESS,

        name,

        symbol,

        totalSupply:
            totalSupply.toString()

    };
};


// ==========================================
// MINT
// ==========================================

const mint = async (
    to,
    amount
) => {

    if (!ethers.isAddress(to)) {

        throw new Error(
            "Invalid recipient address"
        );

    }


    const tx =
        await tokenLedger.mint(
            to,
            amount
        );


    const receipt =
        await tx.wait();


    const balance =
        await tokenLedger.balanceOf(
            to
        );


    return {

        transactionHash:
            receipt.hash,

        to,

        amount:
            amount.toString(),

        balance:
            balance.toString()

    };
};


// ==========================================
// TRANSFER
// ==========================================

const transfer = async (
    to,
    amount
) => {

    if (!ethers.isAddress(to)) {

        throw new Error(
            "Invalid recipient address"
        );

    }


    const tx =
        await tokenLedger.transfer(
            to,
            amount
        );


    const receipt =
        await tx.wait();


    const senderBalance =
        await tokenLedger.balanceOf(
            wallet.address
        );


    const receiverBalance =
        await tokenLedger.balanceOf(
            to
        );


    return {

        transactionHash:
            receipt.hash,

        from:
            wallet.address,

        to,

        amount:
            amount.toString(),

        balances: {

            sender:
                senderBalance.toString(),

            receiver:
                receiverBalance.toString()

        }

    };
};


// ==========================================
// BALANCE
// ==========================================

const getBalance = async (
    address
) => {

    if (!ethers.isAddress(address)) {

        throw new Error(
            "Invalid address"
        );

    }


    const balance =
        await tokenLedger.balanceOf(
            address
        );


    return {

        address,

        balance:
            balance.toString()

    };
};


// ==========================================
// TOTAL SUPPLY
// ==========================================

const getTotalSupply = async () => {

    const supply =
        await tokenLedger.totalSupply();


    return supply.toString();
};


module.exports = {

    getTokenInfo,

    mint,

    transfer,

    getBalance,

    getTotalSupply

};