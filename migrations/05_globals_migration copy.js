const Globals = artifacts.require("Globals");

module.exports = function(deployer) {
  deployer.deploy(Globals);
};
