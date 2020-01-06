#!/bin/sh
# ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender "tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL" --syntax pascaligo main "Transfer(record receiver = (\"tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN\": address ); sent_amount = 1000n; end)" "record balances = map (\"tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL\" : address ) -> 1000000n ; end; end"
# ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender "tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL" --syntax pascaligo main " Default( False )"  "record balances = ((map end) : map(address, nat)); end"
ligo compile-storage ./contracts/SimpleCoin.ligo main "record balances = map (\"tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL\" : address ) -> 1000000n ; end; end"
granary client - originate contract coin for bootstrap1 transferring 0 from bootstrap1 running $PWD/build/SimpleCoin.tz --init '" {}"' --burn-cap 5
tezos-client -A rpcalpha.tzbeta.net -P 443 -S originate contract coin for alice transferring 0 from alice running $PWD/build/SimpleCoin.tz --init '" {}"' --burn-cap 5
tezos-client -A rpcalpha.tzbeta.net -P 443 -S  transfer 0.1 from alice to coin1 --arg '"(Left False)"' --burn-cap 0.5

ligo run-function $PWD/contracts/Math.ligo add 1 
ligo dry-run $PWD/contracts/Math.ligo --sender "tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL" --syntax pascaligo main " Add( record a = 1; b = 2; end )"  "0"
