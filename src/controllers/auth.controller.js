const { hash, compare } = require('bcrypt');
const { errorResponseHandler } = require('../helper/errorResponseHandler');
const { statusCodes } = require('../helper/statusCodes');
const userModel = require('../models/User');
const validate  = require('../validator/validate');
const { generateJWTToken, getTokenExpirationDate } = require('../helper/jwtToken');

const userRegistration = async (req, res) => {
  try {
    const {name, email, address, password} = req.body;
    validate(
      {name, email, address, password},
      {
        name: "required",
        email: "required",
        address: "required",
        password: "required",
      });
      const isEmailExist = await userModel.getUserInfoByEmail(email);
      if(isEmailExist){
        throw Object.assign(new Error(), {
          status: statusCodes.CONFLICT,
          error: {
            code: 40005
          }
        });
      }
      const hashPassword = await hash(password, 9);
      const newUser = await userModel.createUser({
        name,
        email,
        address,
        password: hashPassword,
      });
      res.created(newUser, "User Registration Successfull.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    validate({email, password},
      {
        email: "required",
        password: "required"
      });

      const user = await userModel.getUserInfoByEmail(email);
      if(!user){
        throw Object.assign(new Error(), {
          status: statusCodes.NOT_FOUND,
          error: {
            code: 40101,
          }
        });
      }
      const isValidPassword = await compare(password, user.password);
      if(!isValidPassword){
        throw Object.assign(new Error(), {
          status: statusCodes.UNAUTHORIZED,
          error: {
            code: 40102
          }
        });
      }
      const token = generateJWTToken(user);
      const tokenExpireTime = getTokenExpirationDate(token);
      const responseData = {
        token,
        name: user.name,
        email: user.email,
        address: user.address,
        tokenExpireTime
      }

      res.success(responseData, "You have successfully Logged In.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
    if (!token) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40113,
        },
      });
    }
    const decoded = jwt.verify(token, jwtSecret);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && currentTimestamp > decoded.exp) {
      res.unauthorized({ isValid: false }, "Your token has expired", err);
    }
    res.accepted({ isValid: true }, "Your token is valid");
  } catch (err) {
    res.unauthorized({ isValid: false }, "Your token has expired", err);
  }
};
module.exports = {
  userRegistration,
  verifyToken,
  userLogin
}