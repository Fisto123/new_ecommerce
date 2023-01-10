import User from "../models/user.js";
import moment from "moment";
import bcrypt from "bcrypt";
export const getUserStats = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const users = await User.aggregate([
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
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
export const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ id: -1 }).limit(4)
      : await User.find();
     
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!(user.email === req.body.email)){
       const emailInUse = await User.findOne({email:req.body.email})
       if(emailInUse)
         return res.status(400).send('That email is already taken');
    }
    if(req.body.password && user){
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      user.password = hashedPassword;
    }
     const updatedUser = await User.findOneAndUpdate(req.params.id,
      {
        name:req.body.name,
         email:req.body.email,
          isAdmin:req.body.isAdmin,
           password:user.password
      },
      {new:true}
      )
      console.log(updatedUser);
      res.status(200).send({
        _id:updatedUser._id,
          name:updatedUser.name,
            email:updatedUser.email,
              admin:updatedUser.isAdmin,
      })
  } catch (error) {
    res.status(500).send(error);
  }
};