export function parseSignature(signature: string) {
  let noHex = signature.substr(2);
  return {
    r: '0x' + noHex.slice(0, 64),
    s: '0x' + noHex.slice(64, 128),
    v: parseInt(noHex.slice(128, 130), 16)
  }
}
