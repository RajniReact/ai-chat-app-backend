const { Router } = require("express");
const PaymentController = require("../controllers/paymentController");

module.exports = (io) => {
  const router = Router();
  const paymentController = new PaymentController(io);

  router.post("/order", paymentController.createOrder);
  router.post("/verify", paymentController.verifyPayment);

  return router;
};
