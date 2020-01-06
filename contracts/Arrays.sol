
pragma solidity >=0.4.21 <0.6.0;

contract Arrays {
    int[] public storageArray;

    function modifyDynamicArray(bytes memory array) public pure returns (bytes memory) {
        bytes memory newArray = new bytes(array.length);
        for (uint i = 0; i < array.length; i++) {
            newArray[i] = array[array.length - i - 1];
        }
        return newArray;
    }

    function modifyStaticArray(uint[10] memory array) public pure returns (uint[10] memory) {
        uint[10] memory newArray;
        for (uint i = 0; i < 10; i++) {
            newArray[i] = array[9 - i];
        }
        return newArray;
    }

    function getDynamicArrayElement(bytes memory array, uint index) public pure returns (bytes1) {
        return array[index];
    }

    function getStaticArrayElement(address[4] memory array, uint index) public pure returns (address) {
        return array[index];
    }

    function getDynamicArrayLength(bool[] memory array) public pure returns (uint) {
        return array.length;
    }

    function getStaticArrayLength(int[5] memory array) public pure returns (uint) {
        return array.length;
    }

    function deleteElement(bytes2[] memory array, uint index) public pure returns (bytes2[] memory) {
        delete array[index];
        return array;
    }

    function pushElements(int counter) public returns (int[] memory) {
        for (int i = 0; i < counter; i++) {
            storageArray.push(i);
        }
        return storageArray;
    }
}
