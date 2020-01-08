const DefaultValues = artifacts.require("DefaultValues");

module.exports = function(deployer) {
  deployer.deploy(DefaultValues);
};
