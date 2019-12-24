type action is
| Iterate of nat
| DoubleIterate of nat

function iterate (const iterCounter : nat) : nat is
  block {
    const x : nat = 0n;
    for i := 1 to int(iterCounter)
    begin
      x := x + 1n;
    end
  } with x

function doubleIterate (const iterCounter : nat) : nat is
  block {
    const x : nat = 0n;
    for i := 1 to int(iterCounter)
    begin
      for j := 1 to int(iterCounter)
      begin
        x := x + 1n;
      end
    end
  } with x


function main (const p : action ; const s : nat) : (list(operation) * nat) is
  block {skip} with ( (nil:list(operation)),
    case p of
    | Iterate (p) -> iterate(p)
    | DoubleIterate (p) -> doubleIterate(p)
    end)
