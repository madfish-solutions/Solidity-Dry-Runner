const MathSrc = artifacts.require("Math");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

function calculateOnLigo(op, a, b) {
  return exec.execSync(`ligo run-function $PWD/contracts/Math.ligo ${op} ' record a = ${a}; b = ${b}; end '  `, {encoding: "utf8"});
}

contract("Math", async accounts => {
    let ethMath;
    let tezMath;
    before(async () => {
        ethMath = await MathSrc.deployed();
      });
      
    it("should add two numbers", async () => {
      let a = 32334, b = 3342;
      let result = await ethMath.add.call(a, b);
      tezMath = calculateOnLigo("add", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));
      
      a = 0, b = 0; 
      result = await ethMath.add.call(a, b);
      tezMath = calculateOnLigo("add", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 232323, b = 33333333321232;
      result = await ethMath.add.call(a, b);
      assert.equal(result, a + b);
      
      a = 4, b = 2;
      result = await ethMath.add.call(a, b);
      tezMath = calculateOnLigo("add", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));
    });
      
    it("should sub two numbers", async () => {
      let a = 32334, b = 3342;
      let result = await ethMath.sub.call(a, b);
      tezMath = calculateOnLigo("sub", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 0, b = 0; 
      result = await ethMath.sub.call(a, b);
      tezMath = calculateOnLigo("sub", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 232323, b = 33333333321232;
      result = await ethMath.sub.call(b, a);
      tezMath = calculateOnLigo("sub", b, a);
      assert.equal(result.valueOf(), parseInt(tezMath));
      
      a = 4, b = 2;
      result = await ethMath.sub.call(a, b);
      tezMath = calculateOnLigo("sub", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));
    });
      
    it("should div two numbers", async () => {
      let a = 32334, b = 3342;
      let result = await ethMath.div.call(a, b);
      tezMath = calculateOnLigo("div", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 0, b = 1; 
      result = await ethMath.div.call(a, b);
      tezMath = calculateOnLigo("div", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 232323, b = 33333333321232;
      result = await ethMath.div.call(b, a);
      tezMath = calculateOnLigo("div", b, a);
      assert.equal(result.valueOf(), parseInt(tezMath));
      
      a = 4, b = 2;
      result = await ethMath.div.call(a, b);
      tezMath = calculateOnLigo("div", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));
    });
      
    it("should mul two numbers", async () => {
      let a = 32334, b = 3342;
      let result = await ethMath.mul.call(a, b);
      tezMath = calculateOnLigo("mul", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 0, b = 1; 
      result = await ethMath.mul.call(a, b);
      tezMath = calculateOnLigo("mul", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 232323, b = 3333333321232;
      result = await ethMath.mul.call(b, a);
      tezMath = calculateOnLigo("mul", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));

      a = 4, b = 2;
      result = await ethMath.mul.call(a, b);
      tezMath = calculateOnLigo("mul", a, b);
      assert.equal(result.valueOf(), parseInt(tezMath));
    });

});