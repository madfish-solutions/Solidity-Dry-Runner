const ArraysSrc = artifacts.require("Arrays");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));
// NOTE: 
// 1. Ligo does not fail when static array has wrong length
// 2. Delete makes hole in Ligo maps meanwhile in Solidity deleted value is set to 0.

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
  array.forEach((val, i) => entry += ` ${i}n -> ("${val.substring(2)}" : bytes) ;`)
  if (array.length > 0) {
    return `map ${entry} end`;
  }
  return "(map end: map(nat, bytes))"
}
function toLigoIntArray(array) {
  let entry = "";
  array.forEach((val, i) => entry += ` ${i}n -> ${val} ;`)
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
  return "(map end: map(nat, address))"
}

function toLigoBoolArray(array) {
  let entry = "";
  array.forEach((val, i) => entry += ` ${i}n -> ${(val)? "True" : "False"} ;`)
  if (array.length > 0) {
    return `map ${entry} end`;
  }
  return "(map end: map(nat, bool))"
}

function getDynamicArrayElementOnLigo(array, index) {
  let ligoArray = toLigoBytesArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayElement ' ( ${ligoArray}, ${index}n ) '  `, {encoding: "utf8"});
}

function deleteElementOnLigo(array, index) {
  let ligoArray = toLigoBytesArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo deleteElement ' ( ${ligoArray}, ${index}n ) '  `, {encoding: "utf8"});
}

function getDynamicArrayLengthOnLigo(array, index) {
  let ligoArray = toLigoBoolArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayLength ' ( ${ligoArray}) '  `, {encoding: "utf8"});
}


function getStaticArrayElementOnLigo(array, index) {
  let ligoArray = toLigoAddressArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getStaticArrayElement ' ( ${ligoArray}, ${index}n ) '  `, {encoding: "utf8"});
}

function getStaticArrayLengthOnLigo(array, index) {
  let ligoArray = toLigoIntArray(array);
  return exec.execSync(`ligo run-function $PWD/contracts/Arrays.ligo getStaticArrayLength ' ( ${ligoArray}) '  `, {encoding: "utf8"});
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

      array =  [accounts[4], accounts[5], accounts[6], accounts[7]];
      index = 3;
      result = await ethArrays.getStaticArrayElement.call(array, index);
      assert.equal(array[index], result.valueOf());
      array =  [tezAccounts[4], tezAccounts[5], tezAccounts[6], tezAccounts[7]];
      tezArrays = getStaticArrayElementOnLigo(array, index);
      assert.equal(`@"${array[index]}"`, tezArrays.trim());

      array =  [accounts[4], accounts[5], accounts[6], accounts[7]];
      index = 8;
      result = await tryCatchAsync(ethArrays.getStaticArrayElement.call(array, index), "invalid opcode");
      array =  [tezAccounts[4], tezAccounts[5], tezAccounts[6], tezAccounts[7]];
      tezArrays = tryCatchSync(getStaticArrayElementOnLigo.bind(null, array, index), "Command failed: ligo run-function $PWD/contracts/Arrays.ligo getStaticArrayElement ' ( map  0n -> (\"tz1RsTjrtczQqLWQi4uzEEedHDJViUHvpqhc\" : address) ; 1n -> (\"tz1dMJDP1bCqt1Z7sqUoW9wW2a9gLBi5bh5J\" : address) ; 2n -> (\"tz1KskznpNDgsrmhAqop8GfJtey3yqmJ9ixQ\" : address) ; 3n -> (\"tz1Yf4Li2uKd86sG9CR2oP5QsPy4F3XgcReD\" : address) ; end, 8n ) '  \nligo: Execution terminated with failwith");
    });

    it("should get length of dynamic array", async () => {
      let array =  [true,false, false];
      let result = await ethArrays.getDynamicArrayLength.call(array);
      tezArrays = getDynamicArrayLengthOnLigo(array);
      assert.equal(parseInt(tezArrays.trim()), parseInt(result.valueOf()));

      array =  [true,true,false, false, true,false, true];
      result = await ethArrays.getDynamicArrayLength.call(array);
      tezArrays = getDynamicArrayLengthOnLigo(array);
      assert.equal(parseInt(tezArrays.trim()), parseInt(result.valueOf()));

      array =  [];
      result = await ethArrays.getDynamicArrayLength.call(array);
      tezArrays = getDynamicArrayLengthOnLigo(array);
      assert.equal(parseInt(tezArrays.trim()), parseInt(result.valueOf()));
    });

    it("should get length of static array", async () => {
      let array =  [-9, 7, 8, 70, 55];
      let result = await ethArrays.getStaticArrayLength.call(array);
      tezArrays = getStaticArrayLengthOnLigo(array);
      assert.equal(parseInt(tezArrays.trim()), parseInt(result.valueOf()));

      array =  [6, 5, 0, 0, -33333];
      result = await ethArrays.getStaticArrayLength.call(array);
      tezArrays = getStaticArrayLengthOnLigo(array);
      assert.equal(parseInt(tezArrays.trim()), parseInt(result.valueOf()));
    });

    it("should delete element of dynamic array", async () => {
      let array =  ["0x0011","0xaa34", "0x11ff"];
      let index = 1;
      let result = await ethArrays.deleteElement.call(array, index);
      tezArrays = deleteElementOnLigo(array, index);
      let arrayRes = [...array];
      arrayRes[index] = "0x0000";
      assert.equal(JSON.stringify(arrayRes), JSON.stringify(result.valueOf()));

      // array =  ["0x00","0xaa", "0xff", "0xf5","0xad", "0x00", "0x4a"];
      // index = 5;
      // result = await ethArrays.getDynamicArrayElement.call(array, index);
      // tezArrays = deleteElementOnLigo(array, index);
      // assert.equal(tezArrays.trim(), result.valueOf());

      // array =  [];
      // index = 5;
      
      // result = await tryCatchAsync( ethArrays.getDynamicArrayElement.call(array, index), "invalid opcode");
      // tezArrays = tryCatchSync(getDynamicArrayElementOnLigo.bind(null, array, index), "Command failed: ligo run-function $PWD/contracts/Arrays.ligo getDynamicArrayElement ' ( (map end: map(nat, bytes)), 5n ) '  \nligo: Execution terminated with failwith");
    });

  });