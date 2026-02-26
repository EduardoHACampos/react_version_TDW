/**
 * Secret key for XOR operation. 
 * Without it, the font data in the code is just noise.
 * ---
 * Chave secreta para a operação XOR. 
 * Sem ela, os dados da fonte no código são apenas ruído.
 */
const SECRET_KEY = "HUNT_THE_WEST_2026";

/**
 * Decrypts the "scrambled" Base64 string in real-time.
 * ---
 * Descriptografa a string Base64 em tempo real.
 */
export const decryptFontData = (encryptedB64: string): string => {
  const binaryString = atob(encryptedB64);
  const keyBytes = new TextEncoder().encode(SECRET_KEY);
  const result = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    result[i] = binaryString.charCodeAt(i) ^ keyBytes[i % keyBytes.length];
  }

  // Convert back to binary string for FontFace
  // Converte de volta para string binária para o FontFace
  let decoded = "";
  result.forEach((byte) => (decoded += String.fromCharCode(byte)));
  return btoa(decoded);
};