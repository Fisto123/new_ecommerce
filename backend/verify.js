import jwt from 'jsonwebtoken'
export const auth = (req, res,next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //getting the token
    jwt.verify(token, "secret", (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authentitcated!");
  }
};
export const verify  = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

