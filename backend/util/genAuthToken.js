import jwt from "jsonwebtoken";

const genAuthToken = (user) => {
  const jwtSecretKey = "secret";
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwtSecretKey,
    {
      expiresIn: "1d",
    }
  );

  return token;
};
export default genAuthToken;
