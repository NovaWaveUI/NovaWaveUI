#!/usr/bin/env node

/**
 * CLI entry point for dtcg2css
 * Converts DTCG (Design Tokens Community Group) files to CSS variables
 */

import { Command } from "commander";

const program = new Command();

function main() {
  console.log("DTCG to CSS Converter CLI");

  program
    .version("1.0.0")
    .description("Convert DTCG files to CSS variables")
    .option("-i, --input <file>", "Input DTCG file")
    .option("-o, --output <file>", "Output CSS file");
}

main();
