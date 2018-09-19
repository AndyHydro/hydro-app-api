const Web3 = require('web3')

export function parseSignature(provider: string, signature: string) {
  const web3 = new Web3(provider)

  let noHex = signature.substr(2);
  return {
    r: '0x' + noHex.slice(0, 64),
    s: '0x' + noHex.slice(64, 128),
    v: web3.utils.hexToNumber(noHex.slice(128, 130))
  }
}
