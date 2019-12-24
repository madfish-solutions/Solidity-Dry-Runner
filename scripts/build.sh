#!/bin/sh
truffle compile
mkdir -p build/
ligo compile-contract ./contracts/SimpleCoin.ligo main > ./build/SimpleCoin_tmp.tz 
tr -d '\r' < ./build/SimpleCoin_tmp.tz > ./build/SimpleCoin.tz
rm ./build/*_tmp.tz *.pp.ligo

ligo compile-contract ./contracts/Math.ligo main > ./build/Math_tmp.tz 
tr -d '\r' < ./build/Math_tmp.tz > ./build/Math.tz
rm ./build/*_tmp.tz *.pp.ligo

ligo compile-contract ./contracts/Loops.ligo main > ./build/Loops_tmp.tz 
tr -d '\r' < ./build/Loops_tmp.tz > ./build/Loops.tz
rm ./build/*_tmp.tz *.pp.ligo

