const GlobalsSrc = artifacts.require("Globals");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

function getBalanceOnLigo() {
  return exec.execSync(`ligo run-function $PWD/contracts/Globals.ligo getBalance ' ( Unit ) '  `, {encoding: "utf8"});
}

contract("Globals", async accounts => {
    let ethGlobals;
    let tezGlobals;
    before(async () => {
        ethGlobals = await GlobalsSrc.deployed();
      });
      
    it("should get balance", async () => {
      let result = await ethGlobals.getBalance.call();
      assert.equal(0, result.valueOf());

      tezGlobals = getBalanceOnLigo();
      assert.equal(4000000000000, parseInt(tezGlobals)); 
    });
  });