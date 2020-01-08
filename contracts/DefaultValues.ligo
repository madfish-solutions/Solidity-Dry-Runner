type st is record 
  a: int;
  b: bytes;
end;

type storage is record
  mapa: map(int, int);
end;

function getBoolean (const u : unit) : bool is
  block {skip} with False

function getString (const u : unit) : string is
  block {skip} with ""

function getInt (const u : unit) : int is
  block {skip} with 0

function getUint (const u : unit) : nat is
  block {skip} with 0n

function getAddress (const u : unit) : address is
  block {skip} with ("0": address) // does not work

function getArray (const u : unit) : map(nat, int) is
  block {skip} with (map end: map(nat, int))

function getEnum (const u : unit) : nat is
  block {skip} with 0n

function getMappingElement (const u : unit ; const s : storage) : int is
  block { 
    const value : int = case s.mapa[0] of 
    | Some(m) -> m
    | None -> 0
    end;
   } with value

function getStructElement (const u : unit) : int is
  block { 
    skip
   } with 0

function main (const p : nat ; const s : storage) : (list(operation) * storage) is
block {skip} with ( (nil:list(operation)), s)