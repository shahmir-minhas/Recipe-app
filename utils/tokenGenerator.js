const TokenGenerator = require("uuid-token-generator");

const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58

const getToken = () => {
  return tokgen.generate();
};

module.exports = {getToken};
// tokgen.generate();
// -> '4QhmRwHwwrgFqXULXNtx4d'

// const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);
// tokgen2.generate();
