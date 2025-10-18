// Importing dependencies
const BIP32 = require('bip32')
const BIP39 = require('bip39')
const BITCOIN = require('bitcoinjs-lib')

/**
 * Network Definition
 * bitcoin - mainnet
 * testnet - network for testing purposes
 */
const NETWORK = BITCOIN.networks.testnet

/**
 * Derivation path
 * /0 = testnet
 * /1 = mainnet
 */
const PATH = `m/49'/1'/0'/0`

// Creating seed mnemonic (words for password)
let mnemonic = BIP39.generateMnemonic()
const SEED = BIP39.mnemonicToSeedSync(mnemonic)

// Creating HD wallet root
let root = BIP32.fromSeed(SEED, NETWORK)

// Creating an account - pair pvt-pub keys
let account = root.derivePath(PATH)
let node = account.derive(0).derive(0)

let btcAddress = BITCOIN.payments.p2pkh({
    pubkey: node.publicKey,
    network: NETWORK,
}).address

console.log("Generated Wallet")
console.log("Address: ",btcAddress)
console.log("Pvt Key: ",node.toWIF())
console.log("Seed: ",mnemonic)
