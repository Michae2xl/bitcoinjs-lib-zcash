import { RegtestUtils } from 'regtest-client';

const APIPASS = process.env.APIPASS || 'zatoshi';
const APIURL = process.env.APIURL || 'https://regtest.bitbank.cc/1';

export const regtestUtils = new RegtestUtils({ APIPASS, APIURL });
