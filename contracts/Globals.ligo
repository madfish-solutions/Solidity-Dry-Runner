type storage is record
  sender : address;
  value : tez;
  time : timestamp;
end;

function getBalance (const i : unit) : tez is
  block { skip } with balance

function setMessageInfo (const s : storage) : storage is
  block { 
    s.sender := sender;
    s.value := amount;
    s.time := now;
   } with s

function main (const p : nat ; const s : storage) : (list(operation) * storage) is
block {skip} with ( (nil:list(operation)), s)
