
pragma solidity >=0.4.21 <0.6.0;

contract Globals {
    address public sender;
    uint public value;
    uint public time;

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getBlockHash() public view returns (bytes32) {
        return blockhash(block.number - 1);
    }

    function setMessageInfo() public payable{
        sender = msg.sender;
        value = msg.value;
        time = now;
    }
}
