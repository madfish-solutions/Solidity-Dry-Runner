const SimpleCoin = artifacts.require("SimpleCoin");

contract("SimpleCoin", async accounts => {
    let instance;
    before(async () => {
        simpleCoin = await SimpleCoin.deployed();
      });
    
    it("should put 1000000 SimpleCoin in the first account", async () => {
        let balance = await simpleCoin.balances.call(accounts[0]);
        assert.equal(balance.valueOf(), 1000000);
    });
    
    it("should transfer 1000 SimpleCoin to the second account", async () => {
        simpleCoin.transfer(accounts[1], 1000);
        let balance0 = await simpleCoin.balances.call(accounts[0]);
        let balance1 = await simpleCoin.balances.call(accounts[1]);
        assert.equal(balance0.valueOf(), 999000);
        assert.equal(balance1.valueOf(), 1000);
      });
});