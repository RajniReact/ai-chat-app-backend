const Razorpay = require("razorpay");
const crypto = require("crypto");
const { razorpayKeyId, razorpayKeySecret } = require("../config/env");

class PaymentService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }

  async createOrder() {
    return this.razorpay.orders.create({
      amount: 49900, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
  }

  verifySignature(orderId, paymentId, signature) {
    const expected = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return expected === signature;
  }
}

module.exports = PaymentService;
