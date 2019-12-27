const LoopsSrc = artifacts.require("Loops");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

function iterateOnLigo(fun, counter) {
  return exec.execSync(`ligo run-function $PWD/contracts/Loops.ligo ${fun} ' ( ${counter}n ) '  `, {encoding: "utf8"});
}

contract("Loops", async accounts => {
    let ethLoops;
    let tezLoops;
    before(async () => {
        ethLoops = await LoopsSrc.deployed();
      });
      
    it("should count iterations", async () => {
      let counter = 10;
      let result = await ethLoops.iterate.call(counter);
      tezLoops = iterateOnLigo("iterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

      counter = 100;
      result = await ethLoops.iterate.call(counter);
      tezLoops = iterateOnLigo("iterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

      counter = 10000;
      result = await ethLoops.iterate.call(counter);
      tezLoops = iterateOnLigo("iterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

    });

    it("should count iterations in nested loop", async () => {
      let counter = 10;
      let result = await ethLoops.doubleIterate.call(counter);
      tezLoops = iterateOnLigo("doubleIterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

      counter = 50;
      result = await ethLoops.doubleIterate.call(counter);
      tezLoops = iterateOnLigo("doubleIterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

      counter = 34;
      result = await ethLoops.doubleIterate.call(counter);
      tezLoops = iterateOnLigo("doubleIterate", counter);
      assert.equal(result.valueOf(), parseInt(tezLoops));   

    });
  });