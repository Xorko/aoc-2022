import run from "aocrunner";

interface ParsedCommand {
  command: string;
  output: string[];
}

interface Children {
  [name: string]: File | Directory;
}

interface BaseFile {
  type: "file" | "directory";
  name: string;
  size: number;
}

interface File extends BaseFile {
  type: "file";
}

interface Directory extends BaseFile {
  type: "directory";
  children: Children;
  parent: Directory | null;
}

const root: Directory = {
  type: "directory",
  name: "/",
  children: {},
  parent: null,
  size: 0,
};

let currentDirectory: Directory = root;
const directorySizes: number[] = [];

const parseInput = (rawInput: string) => {
  return rawInput
    .split(/^(.*?)\$/m)
    .filter(Boolean)
    .map((command) => command.trim().split(/\r?\n/))
    .map((commandWithOutput) => ({
      command: commandWithOutput[0],
      output: commandWithOutput.slice(1),
    }));
};

const processCd = (command: string) => {
  const path = command.split(" ")[1];
  if (path === "/") {
    currentDirectory = root;
  } else if (path === "..") {
    if (currentDirectory.parent) {
      currentDirectory = currentDirectory.parent;
    }
  } else {
    currentDirectory = currentDirectory.children[path] as Directory;
  }
};

const processLs = (outputLine: string) => {
  const [size, name] = outputLine.split(" ");
  if (size === "dir") {
    const directory: Directory = {
      type: "directory",
      name,
      children: {},
      parent: currentDirectory,
      size: 0,
    };
    currentDirectory.children[name] = directory;
  } else {
    const file: File = {
      type: "file",
      name,
      size: parseInt(size),
    };
    currentDirectory.children[name] = file;
  }
};

const calculateDirectoryTotalSize = (directory: Directory): number => {
  const children = Object.values(directory.children);
  const childrenTotalSize = children.reduce((totalSize, child) => {
    if (child.type === "file") {
      return totalSize + child.size;
    } else {
      return totalSize + calculateDirectoryTotalSize(child);
    }
  }, 0);
  directory.size = childrenTotalSize;
  directorySizes.push(childrenTotalSize);
  return childrenTotalSize;
};

const process = (input: ParsedCommand[]) => {
  input.forEach((parsedCommand) => {
    if (parsedCommand.command.startsWith("cd")) {
      processCd(parsedCommand.command);
    } else if (parsedCommand.command.startsWith("ls")) {
      parsedCommand.output.forEach(processLs);
    }
  });

  calculateDirectoryTotalSize(root);
};

const part1 = (rawInput: string) => {
  const input: ParsedCommand[] = parseInput(rawInput);

  process(input);

  return directorySizes.reduce(
    (total, size) => total + (size <= 100000 ? size : 0),
    0,
  );
};

const part2 = (rawInput: string) => {
  const input: ParsedCommand[] = parseInput(rawInput);

  process(input);

  const TOTAL_DISK_SPACE = 70000000;
  const UPDATE_SIZE = 30000000;
  const spaceAvailable = TOTAL_DISK_SPACE - root.size;
  const requiredSpace = UPDATE_SIZE - spaceAvailable;

  return Math.min(...directorySizes.filter((size) => size >= requiredSpace));
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
