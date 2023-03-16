var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var root = {
  accounts: async () => {
    let accounts = await AccountModel.getAccounts();
    return accounts[0].username;
  },
  account: async ({ username }) => {

    return await Account.getAccount(username);
  },
    login: async ({ username, password }) => {
        return await Account.login(username, password);
    }
};

module.exports = root;