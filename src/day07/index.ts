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
const directoySizes: number[] = [];

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

const handleCd = (command: string) => {
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

const handleLs = (outputLine: string) => {
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

const calculateDirectoriesTotalSize = (directory: Directory): number => {
  const children = Object.values(directory.children);
  const childrenTotalSize = children.reduce((totalSize, child) => {
    if (child.type === "file") {
      return totalSize + child.size;
    } else {
      return totalSize + calculateDirectoriesTotalSize(child);
    }
  }, 0);
  directory.size = childrenTotalSize;
  directoySizes.push(childrenTotalSize);
  return childrenTotalSize;
};

const part1 = (rawInput: string) => {
  const input: ParsedCommand[] = parseInput(rawInput);

  input.forEach((parsedCommand) => {
    if (parsedCommand.command.startsWith("cd")) {
      handleCd(parsedCommand.command);
    } else if (parsedCommand.command.startsWith("ls")) {
      parsedCommand.output.forEach(handleLs);
    }
  });

  calculateDirectoriesTotalSize(root);

  return directoySizes.reduce(
    (total, size) => total + (size <= 100000 ? size : 0),
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
        `,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `
      // $ cd /
      // $ ls
      // dir a
      // 14848514 b.txt
      // 8504156 c.dat
      // dir d
      // $ cd a
      // $ ls
      // dir e
      // 29116 f
      // 2557 g
      // 62596 h.lst
      // $ cd e
      // $ ls
      // 584 i
      // $ cd ..
      // $ cd ..
      // $ cd d
      // $ ls
      // 4060174 j
      // 8033020 d.log
      // 5626152 d.ext
      // 7214296 k
      //         `,
      //         expected: 0,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
