const DefaultValuesSrc = artifacts.require("DefaultValues");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

function functionOnLigo(fun) {
  return exec.execSync(`ligo run-function $PWD/contracts/DefaultValues.ligo ${fun} ' ( Unit ) '  `, {encoding: "utf8"}).trim();
}
contract("DefaultValues", async accounts => {
    let ethDefaultValues;
    let tezDefaultValues;
    before(async () => {
        ethDefaultValues = await DefaultValuesSrc.deployed();
      });
    
    it("should return default boolean", async () => {
      let result = await ethDefaultValues.getBoolean.call();
      assert.equal(false, result.valueOf());
      tezDefaultValues = functionOnLigo("getBoolean");
      assert.equal("false", tezDefaultValues);
    });

    it("should return default string", async () => {
      let result = await ethDefaultValues.getString.call();
      tezDefaultValues = functionOnLigo("getString");
      assert.equal(result.valueOf(), JSON.parse(tezDefaultValues));
    });

    it("should return default int", async () => {
      let result = await ethDefaultValues.getInt.call();
      tezDefaultValues = functionOnLigo("getInt");
      assert.equal(result.valueOf(), parseInt(tezDefaultValues));
    });

    it("should return default uint", async () => {
      let result = await ethDefaultValues.getUint.call();
      tezDefaultValues = functionOnLigo("getUint");
      assert.equal(result.valueOf(), parseInt(tezDefaultValues));
    });

    it("should return default array", async () => {
      let result = await ethDefaultValues.getArray.call();
      tezDefaultValues = functionOnLigo("getArray");
      assert.equal(tezDefaultValues, JSON.stringify(result.valueOf()));
    });
  });