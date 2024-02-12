const UserAccount = require('../schema/userSchema');

const createUser = async (userData) => {
  const createdUser = await UserAccount.create(userData);
  return createdUser;
};
const getUserInfoByEmail = async (email) => {
  const user = await UserAccount.findOne({email});
  return user;
};

module.exports = {
  createUser,
  getUserInfoByEmail,
}