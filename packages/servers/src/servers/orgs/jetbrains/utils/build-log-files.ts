/** Where an IDE writes idea.log on macOS, Linux and Windows, below the user's home. */
export const buildLogFiles = (logFolder: string) => [
  `~/Library/Logs/JetBrains/${logFolder}*/idea*.log`,
  `~/.cache/JetBrains/${logFolder}*/log/idea*.log`,
  `~/AppData/Local/JetBrains/${logFolder}*/log/idea*.log`,
];
