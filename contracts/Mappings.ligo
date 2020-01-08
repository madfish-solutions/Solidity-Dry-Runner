type storage is record
  allowedIntegers : map(int,bool);
  addresses : map(int, map(nat, address));
end;

function modifySimpleMappingValue (const key : int; const value : bool ; const s : storage) : storage is
  block { 
    s.allowedIntegers[key] := value;
   } with s

function modifyNestedMappingValue (const key : int; const value : nat; const owner: address ; const s : storage) : storage is
  block { 
    const subMap: map(nat, address) = case s.addresses[key] of 
    | Some(m) -> m
    | None -> (map end : map(nat, address))
    end;
    subMap[value] := owner;
    s.addresses[key]:= subMap;

   } with s

function mapGetAaddresses (const key : int; const value : nat; const s : storage) : address is
  block { 
    const subMap: map(nat, address) = case s.addresses[key] of 
    | Some(m) -> m
    | None -> (map end : map(nat, address))
    end;
    const owner : address = case subMap[value] of 
    | Some(m) -> m
    | None -> ("tz1iTHHGZSFAEDmk4bt7EqgBjw5Hj7vQjL7b": address)
    end;
   } with owner

function mapGetAllowedIntegers (const key : int; const s : storage) : bool is
  block { 
    const value : bool = case s.allowedIntegers[key] of 
    | Some(m) -> m
    | None -> False
    end;
   } with value

function deleteElement (const key : int ; const s : storage) : storage is
  block { 
    remove key from map s.allowedIntegers
   } with s

function deleteNestedElement (const key : int; const value : nat ; const s : storage) : storage is
  block { 
    const subMap: map(nat, address) = case s.addresses[key] of 
    | Some(m) -> m
    | None -> (map end : map(nat, address))
    end;
    remove value from map subMap;
    s.addresses[key]:= subMap;
   } with s

function main (const p : nat ; const s : storage) : (list(operation) * storage) is
block {skip} with ( (nil:list(operation)), s)