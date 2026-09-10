const tokenService =
    require("../services/tokenLedgerService");


// ==========================================
// TOKEN INFO
// ==========================================

exports.getTokenInfo =
    async (req, res) => {

        try {

            const data =
                await tokenService.getTokenInfo();


            res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// ==========================================
// MINT
// ==========================================

exports.mint =
    async (req, res) => {

        try {

            const {
                to,
                amount
            } = req.body;


            if (!to) {

                return res.status(400).json({

                    success: false,

                    message:
                        "to is required"

                });

            }


            if (
                amount === undefined
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "amount is required"

                });

            }


            const result =
                await tokenService.mint(
                    to,
                    amount
                );


            res.status(200).json({

                success: true,

                message:
                    "Tokens minted successfully",

                data:
                    result

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// ==========================================
// TRANSFER
// ==========================================

exports.transfer =
    async (req, res) => {

        try {

            const {
                to,
                amount
            } = req.body;


            if (!to) {

                return res.status(400).json({

                    success: false,

                    message:
                        "to is required"

                });

            }


            if (
                amount === undefined
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "amount is required"

                });

            }


            const result =
                await tokenService.transfer(
                    to,
                    amount
                );


            res.status(200).json({

                success: true,

                message:
                    "Tokens transferred successfully",

                data:
                    result

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// ==========================================
// BALANCE
// ==========================================

exports.getBalance =
    async (req, res) => {

        try {

            const {
                address
            } = req.params;


            const result =
                await tokenService.getBalance(
                    address
                );


            res.status(200).json({

                success: true,

                data:
                    result

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// ==========================================
// TOTAL SUPPLY
// ==========================================

exports.getTotalSupply =
    async (req, res) => {

        try {

            const totalSupply =
                await tokenService.getTotalSupply();


            res.status(200).json({

                success: true,

                totalSupply

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };