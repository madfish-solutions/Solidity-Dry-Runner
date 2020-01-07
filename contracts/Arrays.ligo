type storage is record
  sender : address;
end;

function getDynamicArrayElement (const array : map(nat, bytes); const index : nat) : bytes is
  block { 
    skip
   } with get_force(index, array)

function getStaticArrayElement (const array : map(nat, address); const index : nat) : address is
  block { 
    skip
   } with get_force(index, array)

function getDynamicArrayLength (const array : map(nat, bool)) : nat is
  block { 
    skip
   } with size(array)

function getStaticArrayLength (const array : map(nat, int)) : nat is
  block { 
    skip
   } with size(array)

function deleteElement (var array : map(nat, bytes); const index : nat) : map(nat, bytes) is
  block { 
    array[index] := ("0000" : bytes);
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