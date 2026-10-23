import { readFile } from 'node:fs/promises';
import { validateManifest } from '@usemcpkit/core';
import type { Program } from 'yargs-extended';
import { EXIT_FAILURE, EXIT_SUCCESS } from '../const';
import { printError } from '../output/print-error';
import { printLine } from '../output/print-line';
import { toAction } from '../to-action';
import type { ValidateOptions } from '../types/validate-options';

export const validateCommand = async ({ file }: ValidateOptions) => {
  const data: unknown = JSON.parse(await readFile(file, 'utf8'));
  const errors = validateManifest(data);
  if (errors.length > 0) {
    for (const error of errors) {
      printError(`${file}: ${error}`);
    }
    return EXIT_FAILURE;
  }
  printLine(`${file}: valid`);
  return EXIT_SUCCESS;
};

export const registerValidateCommand = (program: Program) => {
  program
    .command('validate', 'Validate a manifest file')
    .positional('<file: path>', { description: 'Manifest JSON file' })
    .action(toAction(validateCommand));
};
