const MappingsSrc = artifacts.require("Mappings");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));
// NOTE: 
// 1. Ligo does not allow bool as key but Solidity does

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



function modifySimpleMappingValueOnLigo(key, value, storage) {
  return exec.execSync(`ligo run-function $PWD/contracts/Mappings.ligo modifySimpleMappingValue ' ( ${key}, ${(value)? "True" : "False"}, ${storage}) '  `, {encoding: "utf8"});
}

function modifyNestedMappingValueOnLigo(key, value, owner, storage) {
  return exec.execSync(`ligo run-function $PWD/contracts/Mappings.ligo modifyNestedMappingValue ' ( ${key}, ${value}n, ("${owner}": address), ${storage}) '  `, {encoding: "utf8"});
}

function mapGetAllowedIntegersOnLigo(key, storage) {
  return exec.execSync(`ligo run-function $PWD/contracts/Mappings.ligo mapGetAllowedIntegers ' ( ${key}, ${storage}) '  `, {encoding: "utf8"});
}

function mapGetAaddressesOnLigo(key, value, storage) {
  return exec.execSync(`ligo run-function $PWD/contracts/Mappings.ligo mapGetAaddresses ' ( ${key}, ${value}n, ${storage}) '  `, {encoding: "utf8"});
}
contract("Mappings", async accounts => {
    let ethMappings;
    let tezMappings;
    before(async () => {
        ethMappings = await MappingsSrc.deployed();
      });
    
    it("should add element to simple mapping", async () => {
      let key = -1;
      let value = true;
      let storage = "record allowedIntegers =(map end: map(int, bool)); addresses=(map end : map(int, map(nat, address))); end";
      await ethMappings.modifySimpleMappingValue(key, value);
      let result = await ethMappings.allowedIntegers.call(key);
      tezMappings = modifySimpleMappingValueOnLigo(key, value, storage);
      storage = `record allowedIntegers = map ${key} -> True; end; addresses=(map end : map(int, map(nat, address))); end`;
      let tezResult = mapGetAllowedIntegersOnLigo(key, storage);
      assert.equal(tezResult.trim(), String(result.valueOf()));
    });

    it("should add element to netsted mapping", async () => {
      let key = -1;
      let value = 5;
      let storage = "record allowedIntegers =(map end: map(int, bool)); addresses=(map end :map(int, map(nat, address))); end";
      await ethMappings.modifyNestedMappingValue(key, value, accounts[0]);
      let result = await ethMappings.addresses.call(key, value);
      tezMappings = modifyNestedMappingValueOnLigo(key, value, tezAccounts[0], storage);
      storage = `record allowedIntegers =(map end: map(int, bool)); addresses= map ${key} -> map ${value}n -> ("${tezAccounts[0]}": address);  end ; end; end`;
      let tezResult = mapGetAaddressesOnLigo(key, value, storage).trim();
      assert.equal(result.valueOf(), accounts[0]);
      assert.equal(tezResult.substring(2, tezResult.length - 1), tezAccounts[0]);
    });
  });