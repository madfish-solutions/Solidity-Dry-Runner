const SimpleCoin = artifacts.require("SimpleCoin");
const fs = require("fs");
const exec = require('child_process');
const tezAccounts = JSON.parse(fs.readFileSync("./test/accounts.json"));

function contractOut2Json(output) {
  output = output.replace(/@/g, '')
  output = output.replace(/\+/g, '')
  output = output.replace(/->/g, ':')
  output = output.replace(/\[/g, '{')
  output = output.replace(/\(/g, '[')
  output = output.replace(/\]/g, '}')
  output = output.replace(/\)/g, ']')
  output = output.replace(/=/g, ':')
  output = output.replace(/;/g, ',')
  output = output.replace(/balances/g, '"balances"')
  output = output.replace(/initialized/g, '"initialized"')
  return JSON.parse(output); 
}

function parseTezBalances(output, address) {
  return output["balances"][address]; 
}


contract("SimpleCoin", async accounts => {
    let ethSimpleCoin;
    let tezSimpleCoin;
    before(async () => {
        ethSimpleCoin = await SimpleCoin.deployed();
        let tezSimpleCoinOut =  exec.execSync(`ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender \"${tezAccounts[0]}\" --syntax pascaligo main \" Default( False )\"  \"record balances = ((map end) : map(address, nat)); initialized = (False: bool); end\"`, {encoding: "utf8"});
        tezSimpleCoin = contractOut2Json(tezSimpleCoinOut);
      });
  
    it("should put 1000000 SimpleCoin in the first account", async () => {
      let ethBalance = await ethSimpleCoin.balances.call(accounts[0]);
      let tezBalance =  parseTezBalances(tezSimpleCoin[1], tezAccounts[0]);
      assert.equal(ethBalance.valueOf(), tezBalance.valueOf());
    });
      
    it("should transfer 1000 SimpleCoin to the second account", async () => {
      ethSimpleCoin.transfer(accounts[1], 1000);
      let tezSimpleCoinOut =  exec.execSync(`ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender \"${tezAccounts[0]}\" --syntax pascaligo main \"Transfer(record receiver = (\\"${tezAccounts[1]}\\": address ); sent_amount = 1000n; end)\" \"record balances = map (\\"${tezAccounts[0]}\\" : address ) -> 1000000n ; end; initialized = (True: bool); end\"`, {encoding: "utf8"});
      tezSimpleCoin = contractOut2Json(tezSimpleCoinOut);

      let ethBalance0 = await ethSimpleCoin.balances.call(accounts[0]);
      let ethBalance1 = await ethSimpleCoin.balances.call(accounts[1]);
      let tezBalance0 =  parseTezBalances(tezSimpleCoin[1], tezAccounts[0]);
      let tezBalance1 =  parseTezBalances(tezSimpleCoin[1], tezAccounts[1]);
      assert.equal(ethBalance0.valueOf(), tezBalance0.valueOf());
      assert.equal(ethBalance1.valueOf(), tezBalance1.valueOf());
    });
});