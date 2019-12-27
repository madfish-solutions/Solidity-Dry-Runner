const GlobalsSrc = artifacts.require("Globals");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

contract("Globals", async accounts => {
    let ethGlobals;
    let tezGlobals;
    before(async () => {
        ethGlobals = await GlobalsSrc.deployed();
      });
      
    it("should get", async () => {
      let counter = 10;
      let result = await ethGlobals.getBalance.call();
      assert.equal(result.valueOf(), result.valueOf());
      // tezGlobals = iterateOnLigo("iterate", counter);
      // assert.equal(result.valueOf(), parseInt(tezGlobals)); 
    });
  });