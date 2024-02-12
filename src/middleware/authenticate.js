const jsonwebtoken = require("jsonwebtoken");
const { jwtSecret } = require("../config/variables.js");
const { statusCodes } = require("../helper/statusCodes.js");
const { errorResponseHandler } = require("./../helper/errorResponseHandler.js");
const isTokenExpired = (expirationTime) =>
  expirationTime <= Math.floor(Date.now() / 1000);

const createAuthenticationMiddleware = () => (req, res, next) => {
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

    try {
      const decoded = jsonwebtoken.verify(token, jwtSecret);

      if (isTokenExpired(decoded.exp)) {
        throw Object.assign(new Error(), {
          status: statusCodes.UNAUTHORIZED,
          error: {
            code: 40110,
          },
        });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw Object.assign(new Error(), {
          status: statusCodes.UNAUTHORIZED,
          error: {
            code: 40110,
          },
        });
      } else {
        throw Object.assign(new Error(), {
          status: statusCodes.INTERNAL_SERVER_ERROR,
          error: {
            code: 50001,
          },
        });
      }
    }
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const authenticate = createAuthenticationMiddleware();
module.exports = {
  authenticate,
};
