
pragma solidity >=0.4.21 <0.6.0;

contract DefaultValues {
    mapping(int => int) public mapa;
    enum en {
        DAY,
        MONTH,
        YEAR
    }
    struct st {
        int a;
        bytes b;
    }

    function getBoolean() public pure returns (bool b) {}

    function getString() public pure returns (string memory s) {}

    function getInt() public pure returns (int i) {}

    function getUint() public pure returns (uint u) {}

    function getEnum() public pure returns (en e) {}

    function getAddress() public pure returns (address a) {}

    function getArray() public pure returns (int[] memory a) {}

    function getMappingElement() public view returns (int) {
        return mapa[0];
    }

    function getStructElement() public pure returns (bytes memory) {
        st memory s;
        return s.b;
    }

}
