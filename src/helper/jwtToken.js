const { sign, decode } = require("jsonwebtoken");
const { jwtSecret } = require("../config/variables");

const generateJWTToken = (user) => {
  const userInfo = {
    userId: user.userId,
    email: user.email
  };
  const token = sign(userInfo, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
};


const getTokenExpirationDate = (token) => {
  const decodedToken = decode(token);
  if (!decodedToken || !decodedToken.exp) {
    return null;
  }
  const expirationDate = decodedToken.exp;
  return expirationDate;
};

module.exports = {
  generateJWTToken,
  getTokenExpirationDate
}