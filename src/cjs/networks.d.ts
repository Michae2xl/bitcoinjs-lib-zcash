/**
 * This module defines the network configurations for Bitcoin and its variants, including message prefixes,
 * Bech32 address format, BIP32 key derivation prefixes, and other address-related configurations.
 * It supports Bitcoin, Zcash testnet, and Bitcoin regtest networks.
 *
 * Additional information on address prefixes can be found here:
 * - https://en.zcash.wiki/wiki/List_of_address_prefixes
 *
 * @packageDocumentation
 */
export interface Network {
    messagePrefix: string;
    bech32: string;
    bip32: Bip32;
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
}
interface Bip32 {
    public: number;
    private: number;
}
/**
 * Represents the Zcash network configuration.
 */
export declare const bitcoin: Network;
/**
 * Represents the regtest network configuration.
 */
export declare const regtest: Network;
/**
 * Represents the testnet network configuration.
 */
export declare const testnet: Network;
export {};
