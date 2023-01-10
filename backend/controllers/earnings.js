import Order from "../models/order.js";
import moment from "moment";

export const getEarningsStats = async (req, res) => {
 const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getOneWeekSales = async (req, res) => {
  const lastSevenDay_s = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(lastSevenDay_s) } } },
      {
        $project: {
          da_y: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$da_y",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
