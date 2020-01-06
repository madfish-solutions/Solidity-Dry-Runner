type storage is record
  sender : address;
  value : tez;
  time : timestamp;
end;

function getDynamicArrayElement (const array : map(nat, bytes); const index : nat) : bytes is
  block { 
    skip
   } with case array[index] of | None -> ("00": bytes)  | Some(x) -> x end

function getStaticArrayElement (const array : map(nat, address); const index : nat) : address is
  block { 
    skip
   } with case array[index] of | None -> ("0x0" : address) | Some(x) -> x end

function main (const p : nat ; const s : storage) : (list(operation) * storage) is
block {skip} with ( (nil:list(operation)), s)


    // function getDynamicArrayLength(bool[] memory array) public pure returns (uint) {
        // return array.length;
    // }
// 
    // function getStaticArrayLength(int[5] memory array) public pure returns (uint) {
        // return array.length;
    // }
// 
    // function deleteElement(bytes2[] memory array, uint index) public pure returns (bytes2[] memory) {
        // delete array[index];
        // return array;
    // }
// 
    // function pushElements(int counter) public returns (int[] memory) {
        // for (int i = 0; i < counter; i++) {
            // storageArray.push(i);
        // }
        // return storageArray;
    // }
