#!/bin/sh
docker system prune
rm -rf .granary

# start node
granary init
granary node start &
sleep 2

# Import the activator secret key
granary client - import secret key "activator" "unencrypted:edsk31vznjHSSpGExDMHYASz45VZqXN4DPxvsa4hAyY8dHM28cZzp6"

echo '{ 
    "bootstrap_accounts": [
        [ "edpkuBknW28nW72KG6RoHtYW7p12T6GKc7nAbwYX5m8Wd9sDVC9yav", "4000000000000" ]
    ],
    "time_between_blocks" : [ "1", "0" ],
    "blocks_per_roll_snapshot" : 4,
    "blocks_per_cycle" : 8,
    "preserved_cycles" : 2,
    "proof_of_work_threshold": "-1"
}' > "protocol_parameters.json"

# Activate the desired protocol using the activator key
# You can find additional available protocols in the list below
granary client - activate protocol Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd with fitness 1 and key activator and parameters $PWD/protocol_parameters.json --timestamp $(TZ='AAA+1' date +%FT%TZ)

# Import a secret key for the account 
# specified in protocol_parameters.json's bootstrap_accounts
granary client - import secret key "bootstrap1" "unencrypted:edsk3gUfUPyBSfrS9CCgmCiQsTCHGkviBDusMxDJstFtojtc1zcpsh"

# Our bootstrapped account also has baking rights right away,
# so we bake a new block with the protocol activation
granary client - bake for "bootstrap1"

# Confirm that we have a new block with the new protocol
granary client - rpc get "/chains/main/blocks/head"

# Import a new account called 'alice'
granary client - import secret key "alice" "unencrypted:edsk39qAm1fiMjgmPkw1EgQYkMzkJezLNewd7PLNHTkr6w9XA2zdfo"

# Client will wait for the operation to be included into the chain, so we start it in the background with '&'
granary client - transfer 1000 from bootstrap1 to alice --burn-cap 0.257 &

# Bake a new block to include the transfer operation from above
granary client - bake for bootstrap1

# Outputs 1000 XTZ
granary client - get balance for alice