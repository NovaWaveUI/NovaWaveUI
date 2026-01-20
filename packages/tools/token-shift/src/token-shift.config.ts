/**
 * Test configuration file for token-shift
 */
import type { TokenShiftConfig } from './config/types';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const realTokensDir = join(__dirname, '../__tests__/fixtures/realtime-testing');

const config: TokenShiftConfig = {
  input: [
    join(realTokensDir, 'tokens1.json'),
    join(realTokensDir, 'tokens2.tokens.json'),
  ],
  output: {
    outputPath: join(realTokensDir, 'output/tokens-output.json'),
  },
};

export default config;
