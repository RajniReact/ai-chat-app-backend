const PaymentService = require("../services/PaymentService");

class PaymentController {
  constructor(io) {
    this.io = io;
    this.paymentService = new PaymentService();
  }

  createOrder = async (req, res) => {
    try {
      const order = await this.paymentService.createOrder();
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not create order" });
    }
  };

  verifyPayment = async (req, res) => {
    try {
      const { orderId, paymentId, signature, userId } = req.body;

      const valid = this.paymentService.verifySignature(
        orderId,
        paymentId,
        signature
      );

      if (!valid) {
        return res.status(400).json({ success: false });
      }

      this.io.emit("premium_unlocked", { userId });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  };
}

module.exports = PaymentController;
