import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/user.js";
import genAuthToken from "../util/genAuthToken.js";

export const registerUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required().max(30),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const { name, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed_password,
    });
    await newUser.save();
    const token = genAuthToken(newUser);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const signIn = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email ...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password...");

  const token = genAuthToken(user);

  res.status(201).send(token);
};
