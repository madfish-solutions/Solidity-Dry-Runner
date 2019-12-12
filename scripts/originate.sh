#!/bin/sh
ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender "tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL" --syntax pascaligo main " Default( False )"  "record balances = ((map end) : map(address, nat)); end"
ligo dry-run $PWD/contracts/SimpleCoin.ligo --sender "tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL" --syntax pascaligo main "Transfer(record receiver = (\"tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN\": address ); sent_amount = 1000n; end)" "record balances = map (\"tz1NxxKP97Sv6rURCqyZN8TvfLsDaJJ1gRZL\" : address ) -> 1000000n ; end; end"
