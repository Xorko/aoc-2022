import run from "aocrunner";

type ParsedCommand = {
  command: string;
  output: string[];
};

const parseInput = (rawInput: string) => {
  return rawInput
    .split(/^(.*?)\$/gm)
    .filter(Boolean)
    .map((command) => command.trim().split(/\r?\n/))
    .map((commandWithOutput) => ({
      command: commandWithOutput[0],
      output: commandWithOutput.slice(1),
    }));
};

let currentDirectory: string = "/";
const directories = new Map<string, number>();

const handleCd = (command: string) => {
  const directory = command.split(" ")[1];

  switch (directory) {
    case "/":
      currentDirectory = "/";
      break;
    case "..":
      currentDirectory =
        currentDirectory.split("/").slice(0, -2).join("/") || "/";
      break;
    default:
      currentDirectory = `${currentDirectory}${directory}/`;
      break;
  }
};

const addDirectorySizeToParents = (directory: string) => {
  const _parentDirectory = directory.split("/").slice(0, -2).join("/") || "/";
  const parentDirectory =
    _parentDirectory !== "/" ? `${_parentDirectory}/` : _parentDirectory;

  if (parentDirectory !== "/") {
    directories.set(
      parentDirectory,
      directories.get(parentDirectory)! + directories.get(directory)!,
    );
    addDirectorySizeToParents(parentDirectory);
  }
};

const addRootDirsSizeToRoot = () => {
  const rootDirs = Array.from(directories.keys()).filter((dir) =>
    dir.match(/^\/\w+\/$/gm),
  );

  rootDirs.forEach((rootDir) =>
    directories.set("/", directories.get("/")! + directories.get(rootDir)!),
  );
};

const part1 = (rawInput: string) => {
  const input: ParsedCommand[] = parseInput(rawInput);

  input.forEach((parsedCommand) => {
    if (parsedCommand.command.startsWith("cd")) {
      handleCd(parsedCommand.command);
    } else if (parsedCommand.command.startsWith("ls")) {
      let directorySize = 0;
      parsedCommand.output.forEach((outputLine) => {
        const words = outputLine.split(" ");
        if (words[0] === "dir") {
          const directoryName = `${currentDirectory}${words[1]}/`;
          if (!directories.has(directoryName)) {
            directories.set(directoryName, 0);
          }
        } else {
          directorySize += parseInt(words[0], 10);
        }
      });

      directories.set(currentDirectory, directorySize);
    }
  });

  directories.forEach((_, directory) => {
    addDirectorySizeToParents(directory);
  });

  addRootDirsSizeToRoot();

  return Array.from(directories.values())
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size, 0);
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
