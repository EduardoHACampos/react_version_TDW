/**
 * Maps standard characters to a scrambled Latin alphabet.
 * This ensures Inspect Element shows meaningless letters, forcing manual deciphering.
 * ---
 * Mapeia caracteres padrão para um alfabeto embaralhado.
 * Isso garante que o Inspect Element mostre letras sem sentido, forçando a decifração manual.
 */
const occultMap: Record<string, string> = {
  'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F',
  'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L',
  'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R',
  'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
  'Y': 'Y', 'Z': 'Z', ' ': '\u00A0' 
};

/**
 * Encodes text using the scrambled map.
 * Codifica o texto usando o mapeamento embaralhado.
 */
export const encodeOccultText = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => occultMap[char] || char)
    .join('');
};