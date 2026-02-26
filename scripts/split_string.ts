import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secret key must match fontProtector.ts
// A chave secreta deve coincidir com o fontProtector.ts
const SECRET_KEY = "HUNT_THE_WEST_2026"; 

// Paths for input and output
// Caminhos para entrada e saída
const PROJECT_ROOT = path.join(__dirname, '..');
const INPUT_FILE_PATH = path.join(PROJECT_ROOT, 'font_string.txt');
const OUTPUT_FILE_PATH = path.join(PROJECT_ROOT, 'src/constants/fontChunks/index.ts');

/**
 * Splits the encrypted font string into manageable chunks.
 * ---
 * Divide a string da fonte criptografada em pedaços gerenciáveis.
 */
function splitStringFromFile() {
    try {
        console.log("Reading input file... / Lendo arquivo de entrada...");

        if (!fs.existsSync(INPUT_FILE_PATH)) {
            throw new Error(`File not found at: ${INPUT_FILE_PATH}`);
        }
        
        const giganticString = fs.readFileSync(INPUT_FILE_PATH, 'utf-8').trim();
        
        if (!giganticString) {
            throw new Error("Input file is empty!");
        }

        const chunkSize = 100;
        const chunks: string[] = [];

        for (let i = 0; i < giganticString.length; i += chunkSize) {
            chunks.push(giganticString.slice(i, i + chunkSize));
        }

        const formattedArray = "/**\n * Auto-generated font chunks to prevent compiler memory issues.\n" + 
                               " * Pedaços de fonte gerados automaticamente para evitar erros de memória.\n */\n" +
                               "export const PROTECTED_FONT_CHUNKS: string[] = [\n  \"" + 
                               chunks.join("\",\n  \"") + 
                               "\"\n];";

        fs.writeFileSync(OUTPUT_FILE_PATH, formattedArray);

        console.log("=========================================");
        console.log("SUCCESS: Font chunks generated!");
        console.log("SUCESSO: Pedaços de fonte gerados!");
        console.log(`Total chunks: ${chunks.length}`);
        console.log(`Saved to: ${OUTPUT_FILE_PATH}`);
        console.log("=========================================");
        
    } catch (err: any) {
        console.error("FAILURE / FALHA:", err.message);
    }
}

splitStringFromFile();