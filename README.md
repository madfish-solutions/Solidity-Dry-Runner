# Prerequirements
- Docker
- Truffle
- Ligo
- Ganache
- Tezos light CLient

## Docker
```
Go to https://docs.docker.com/docker-for-mac/install/ and follow instructions.
```

## Truffle
```
npm install -g truffle
```

## Ligo
```
curl https://gitlab.com/ligolang/ligo/raw/dev/scripts/installer.sh | bash -s "next"
```

## Ganache
Go to https://www.trufflesuite.com/ganache and follow instructions.
Note: local node should be run before testing. 


## Tezos light CLient
```
wget -O babylonnet.sh https://gitlab.com/tezos/tezos/raw/babylonnet/scripts/alphanet.sh
chmod +x babylonnet.sh
```
Run client:
```
./babylonnet.sh start
```
More info:
```
https://tezos.gitlab.io/introduction/howtouse.html
```
# Instalation
```
npm i
```
# Tests
```
truffle test
```