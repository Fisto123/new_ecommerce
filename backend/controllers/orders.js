import Order from "../models/order.js";
import moment from "moment";

export const getOrderStats = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const orders = await Order.aggregate([
      {
        //start from prevMonth till now
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
export const getAllOrders = async (req, res) => {
  const query = req.query.new;

  try {
    const orders = query
      ? await Order.find().sort({ id: -1 }).limit(4)
      : await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body
      },
      {new:true}
    )
     
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).send(order)
  } catch (err) {
    res.status(500).send(err);
  }
};
