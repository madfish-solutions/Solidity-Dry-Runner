type op_type is record
  a: int;
  b: int;
end;


type action is
| Add of op_type
| Sub of op_type
| Mul of op_type
| Div of op_type

function add (const a : int; const b : int) : int is
  block {
    const x : int = a + b
  } with x

function sub (const a : int; const b : int) : int is
  block {
    const x : int = a - b
  } with x

function div (const a : int; const b : int) : int is
  block {
    const x : int = a / b
  } with x

function mul (const a : int; const b : int) : int is
  block {
    const x : int = a * b
  } with x


function main (const p : action ; const s : int) : (list(operation) * int) is
  block {skip} with ( (nil:list(operation)),
    case p of
    | Add (p) -> add(p.a, p.b)
    | Sub (p) -> sub(p.a, p.b)
    | Mul (p) -> mul(p.a, p.b)
    | Div (p) -> div(p.a, p.b)
    end)
