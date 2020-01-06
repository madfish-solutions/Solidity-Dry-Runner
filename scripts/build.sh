#!/bin/sh
truffle compile
mkdir -p build/
ligo compile-contract ./contracts/SimpleCoin.ligo main > ./build/SimpleCoin_tmp.tz 
tr -d '\r' < ./build/SimpleCoin_tmp.tz > ./build/SimpleCoin.tz

ligo compile-contract ./contracts/Math.ligo main > ./build/Math_tmp.tz 
tr -d '\r' < ./build/Math_tmp.tz > ./build/Math.tz

ligo compile-contract ./contracts/Loops.ligo main > ./build/Loops_tmp.tz 
tr -d '\r' < ./build/Loops_tmp.tz > ./build/Loops.tz

ligo compile-contract ./contracts/Globals.ligo main > ./build/Globals_tmp.tz 
tr -d '\r' < ./build/Globals_tmp.tz > ./build/Globals.tz

ligo compile-contract ./contracts/Arrays.ligo main > ./build/Arrays_tmp.tz 
tr -d '\r' < ./build/Arrays_tmp.tz > ./build/Arrays.tz

rm ./build/*_tmp.tz *.pp.ligo
