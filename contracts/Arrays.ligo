type storage is record
  sender : address;
end;

function getDynamicArrayElement (const array : map(nat, bytes); const index : nat) : bytes is
  block { 
    skip
   } with case array[index] of | None -> ("00": bytes)  | Some(x) -> x end

function getStaticArrayElement (const array : map(nat, address); const index : nat) : address is
  block { 
    skip
   } with case array[index] of | None -> ("0x0" : address) | Some(x) -> x end

function getDynamicArrayLength (const array : map(nat, bool); const index : nat) : nat is
  block { 
    skip
   } with size(array)

function getStaticArrayLength (const array : map(nat, int); const index : nat) : nat is
  block { 
    skip
   } with size(array)

function deleteElement (var array : map(nat, bytes); const index : nat) : map(nat, bytes) is
  block { 
    remove index from map array
   } with array

function pushElements (const counter : int) : map(nat, int) is
  block { 
    const array: map(nat, int) = map end;
    for i := 0 to (counter - 1)
    begin
      array[abs(i)] := i;
    end
   } with array

function main (const p : nat ; const s : storage) : (list(operation) * storage) is
block {skip} with ( (nil:list(operation)), s)