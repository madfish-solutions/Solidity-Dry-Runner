
pragma solidity >=0.4.21 <0.6.0;

contract Mappings {
    mapping(int => bool) public allowedIntegers;
    mapping(int => mapping(uint => address)) public addresses;


    function modifySimpleMappingValue(int key, bool value) public {
        allowedIntegers[key] = value;
    }

    function modifyNestedMappingValue(int key, uint value, address owner) public {
        addresses[key][value] = owner;
    }

    function deleteElement(int key) public {
        delete allowedIntegers[key];
    }

    function deleteNestedElement(int key, uint value) public {
        delete addresses[key][value];
    }
}
