
pragma solidity >=0.4.21 <0.6.0;

contract Loops {
    function iterate(int iterCounter) public pure returns (uint) {
        uint realNumber;
        for(int i = 0; i < iterCounter; i++) {
            realNumber++;
        }
        return realNumber;
    }

    function doubleIterate(int iterCounter) public pure returns (uint) {
        uint realNumber;
        for(int i = 0; i < iterCounter; i++) {
            for(int j = 0; j < iterCounter; j++) {
                realNumber++;
            }
        }
        return realNumber;
    }
}