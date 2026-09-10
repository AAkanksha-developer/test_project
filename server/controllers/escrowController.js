const asyncErrorHandler =
  require("../middlewares/helpers/asyncErrorHandler");

const escrowService =
  require("../services/escrowService");


// ======================================================
// LIST NFT
// ======================================================

exports.listNFT = asyncErrorHandler(
  async (req, res, next) => {

    const {
      nftId,
      buyer,
      purchasePrice,
      escrowAmount
    } = req.body;


    // Validation

    if (nftId === undefined) {

      return res.status(400).json({

        success: false,

        message:
          "nftId is required"

      });

    }


    if (!buyer) {

      return res.status(400).json({

        success: false,

        message:
          "buyer is required"

      });

    }


    if (
      purchasePrice === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "purchasePrice is required"

      });

    }


    if (
      escrowAmount === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "escrowAmount is required"

      });

    }


    const result =
      await escrowService.listNFT(

        nftId,

        buyer,

        purchasePrice,

        escrowAmount

      );


    res.status(200).json({

      success: true,

      message:
        "NFT listed successfully",

      data:
        result

    });

  }
);


// ======================================================
// DEPOSIT EARNEST
// ======================================================

exports.depositEarnest =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId,
        amount
      } = req.body;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      if (amount === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "amount is required"

        });

      }


      const result =
        await escrowService.depositEarnest(

          nftId,

          amount

        );


      res.status(200).json({

        success: true,

        message:
          "Earnest money deposited successfully",

        data:
          result

      });

    }
  );


// ======================================================
// UPDATE INSPECTION
// ======================================================

exports.updateInspection =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId,
        passed
      } = req.body;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      if (passed === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "passed is required"

        });

      }


      const result =
        await escrowService.updateInspection(

          nftId,

          passed

        );


      res.status(200).json({

        success: true,

        message:
          "Inspection status updated successfully",

        data:
          result

      });

    }
  );


// ======================================================
// APPROVE SALE
// ======================================================

exports.approveSale =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId
      } = req.body;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      const result =
        await escrowService.approveSale(
          nftId
        );


      res.status(200).json({

        success: true,

        message:
          "Sale approved successfully",

        data:
          result

      });

    }
  );


// ======================================================
// FINALIZE SALE
// ======================================================

exports.finalizeSale =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId
      } = req.body;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      const result =
        await escrowService.finalizeSale(
          nftId
        );


      res.status(200).json({

        success: true,

        message:
          "Sale finalized successfully",

        data:
          result

      });

    }
  );


// ======================================================
// CANCEL SALE
// ======================================================

exports.cancelSale =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId
      } = req.body;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      const result =
        await escrowService.cancelSale(
          nftId
        );


      res.status(200).json({

        success: true,

        message:
          "Sale cancelled successfully",

        data:
          result

      });

    }
  );


// ======================================================
// GET BALANCE
// ======================================================

exports.getBalance =
  asyncErrorHandler(
    async (req, res, next) => {

      const result =
        await escrowService.getBalance();


      res.status(200).json({

        success: true,

        data:
          result

      });

    }
  );


// ======================================================
// GET ESCROW DETAILS
// ======================================================

exports.getEscrowDetails =
  asyncErrorHandler(
    async (req, res, next) => {

      const {
        nftId
      } = req.params;


      if (nftId === undefined) {

        return res.status(400).json({

          success: false,

          message:
            "nftId is required"

        });

      }


      const result =
        await escrowService.getEscrowDetails(
          nftId
        );


      res.status(200).json({

        success: true,

        data:
          result

      });

    }
  );