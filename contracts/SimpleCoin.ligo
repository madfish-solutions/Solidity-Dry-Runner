type state is record
  balances: map(address, nat);
  initialized: bool;
end;

type transfer_type is record
    receiver: address;
    sent_amount: nat;
end;

type balances_type is record
    owner: address;
end;

type action is
| Transfer of transfer_type
| Default of bool;

function constructor_f (const this : state) : (state) is
  block {
    if this.initialized then failwith("Is initialized") else this.initialized:= False;
    const tmp_0 : map(address, nat) = this.balances;
    tmp_0[sender]:= 1000000n;
    this.balances := tmp_0;
  } with (this);

function transfer_f (const a : transfer_type; const this : state) : (state) is
  block {
    if this.initialized then {skip} else failwith("Is not initialized");
    const receiver : address = a.receiver;
    const reserved__amount : nat = a.sent_amount;
    if ((case this.balances[sender] of | None -> 0n | Some(x) -> x end) >= reserved__amount) then block {
      const tmp_0 : map(address, nat) = this.balances;
      tmp_0[sender] := abs((case this.balances[sender] of | None -> 0n | Some(x) -> x end) - reserved__amount);
      this.balances := tmp_0;
      const tmp_1 : map(address, nat) = this.balances;
      tmp_1[receiver] := ((case this.balances[receiver] of | None -> 0n | Some(x) -> x end) + reserved__amount);
      this.balances := tmp_1;
    } else block {
      skip
    };
  } with (this);

function balanses_f (const addr : address; const this : state) : (nat) is
  block {
    skip
  } with (get_force(addr, this.balances));

function main (const param : action; const this : state) : (list(operation) * state) is 
 block {skip}  with
 case param of
 | Transfer (ac) -> ((nil:list(operation)), transfer_f (ac, this))
 | Default (ac) -> ((nil:list(operation)),  constructor_f (this))
end
