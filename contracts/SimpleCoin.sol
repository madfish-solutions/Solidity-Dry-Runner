pragma solidity >=0.4.21 <0.6.0;

contract SimpleCoin {
    mapping(address => uint) public balances;

    constructor() public {
        balances[msg.sender] = 1000000;
    }

    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "Overdrawn balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}