const ArraysSrc = artifacts.require("Arrays");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

const PREFIX = "Returned error: VM Exception while processing transaction: ";

async function tryCatchAsync(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

function tryCatchSync(func, message) {
  try {
      func();
      throw null;
  }
  catch (error) {
      assert(error, "Expected an error but did not get one");
      assert(error.message.startsWith(message), "Expected an error starting with '" + message + "' but got '" + error.message + "' instead");
  }
};


function toLigoBytesArray(array) {
  let entry = "";
  array.forEach((val, i) => entry += ` ${i}n -> ("${val.substring(val.length - 2)}" : bytes) ;`)
  if (array.length > 0) {
    return `map ${entry} end`;
  }
  return "(map end: map(nat, bytes))"
}

function toLigoAddressArray(array) {
  let entry = "";
  array.forEach((val, i) => entry += ` ${i}n -> ("${val}" : address) ;`)
  if (array.length > 0) {
    return `map ${entry} end`;
  }
  return "(map end: map(nat, bytes))"
}

function getDynamicArrayElementOnLigo(array, index) {
  let ligoArray = toLigoBytesArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayElement ' ( ${ligoArray}, ${index}n ) '  `, {encoding: "utf8"});
}

function getStaticArrayElementOnLigo(array, index) {
  let ligoArray = toLigoAddressArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getStaticArrayElement ' ( ${ligoArray}, ${index}n ) '  `, {encoding: "utf8"});
}

contract("Arrays", async accounts => {
    let ethArrays;
    let tezArrays;
    before(async () => {
        ethArrays = await ArraysSrc.deployed();
      });
      
    it("should get element of dynamic array", async () => {
      let array =  ["0x00","0xaa", "0xff"];
      let index = 1;
      let result = await ethArrays.getDynamicArrayElement.call(array, index);
      tezArrays = getDynamicArrayElementOnLigo(array, index);
      assert.equal(tezArrays.trim(), result.valueOf());

      array =  ["0x00","0xaa", "0xff", "0xf5","0xad", "0x00", "0x4a"];
      index = 5;
      result = await ethArrays.getDynamicArrayElement.call(array, index);
      tezArrays = getDynamicArrayElementOnLigo(array, index);
      assert.equal(tezArrays.trim(), result.valueOf());

      array =  [];
      index = 5;
      
      result = await tryCatchAsync( ethArrays.getDynamicArrayElement.call(array, index), "invalid opcode");
      tezArrays = tryCatchSync(getDynamicArrayElementOnLigo.bind(null, array, index), "Command failed: ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayElement ' ( (map end: map(nat, bytes)), 5n ) '  \nligo: Execution terminated with failwith");
    });

    it("should get element of static array", async () => {
      let array =  [accounts[0], accounts[1], accounts[2], accounts[3]];
      let index = 1;
      let result = await ethArrays.getStaticArrayElement.call(array, index);
      assert.equal(array[index], result.valueOf());
      array =  [tezAccounts[0], tezAccounts[1], tezAccounts[2], tezAccounts[3]];
      tezArrays = getStaticArrayElementOnLigo(array, index);
      assert.equal(`@"${array[index]}"`, tezArrays.trim());

      // array =  ["0xf5","0xad", "0x00", "0x4a"];
      // index = 5;
      // result = await ethArrays.getStaticArrayElement.call(array, index);
      // tezArrays = getStaticArrayElementOnLigo(array, index);
      // assert.equal(tezArrays.trim(), result.valueOf());
// 
      // array =  [];
      // index = 5;
      // 
      // result = await tryCatchAsync( ethArrays.getStaticArrayElement.call(array, index), "invalid opcode");
      // tezArrays = tryCatchSync(getStaticArrayElementOnLigo.bind(null, array, index), "Command failed: ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayElement ' ( (map end: map(nat, bytes)), 5n ) '  \nligo: Execution terminated with failwith");
    });
  });