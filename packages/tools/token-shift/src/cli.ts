#!/usr/bin/env node

/**
 * CLI entry point for token-shift
 * Converts DTCG (Design Tokens Community Group) files to various style formats.
 *
 * Currently supports:
 * - CSS Variables
 */

import { Command } from "commander";
import { tokenShift } from "./lib";

const program = new Command();

function main() {
  console.log("Token Shift - DTCG To Styles");

  program
    .version("1.0.0")
    .description("Convert DTCG files to various style formats");

  program.parse(process.argv);

  const options = program.opts();
  console.log("Options:", options);

  tokenShift();
}

main();
