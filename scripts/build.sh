#!/bin/sh
mkdir -p build/
ligo compile-contract ./contracts/SimpleCoin.ligo main > ./build/SimpleCoin_tmp.tz 
tr -d '\r' < ./build/SimpleCoin_tmp.tz > ./build/SimpleCoin.tz
rm ./build/*_tmp.tz *.pp.ligo
