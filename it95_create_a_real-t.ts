interface Command {
  name: string;
  description: string;
  execute: () => void;
}

class Controller {
  private commands: Command[] = [];

  addCommand(command: Command) {
    this.commands.push(command);
  }

  run() {
    console.log("Welcome to the Real-Time CLI Tool Controller!");
    console.log("Available commands:");
    this.commands.forEach((command, index) => {
      console.log(`  ${index + 1}. ${command.name} - ${command.description}`);
    });

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.setPrompt('Enter a command (or "quit" to exit): ');
    rl.prompt();

    rl.on('line', (line) => {
      const commandIndex = parseInt(line.trim()) - 1;
      if (commandIndex >= 0 && commandIndex < this.commands.length) {
        this.commands[commandIndex].execute();
      } else {
        console.log("Invalid command. Try again!");
      }
      rl.prompt();
    }).on('close', () => {
      process.exit(0);
    });
  }
}

const controller = new Controller();

controller.addCommand({
  name: "hello",
  description: "Prints a hello message",
  execute: () => {
    console.log("Hello, World!");
  }
});

controller.addCommand({
  name: "add",
  description: "Adds two numbers",
  execute: () => {
    console.log("Enter two numbers:");
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Number 1: ', (num1) => {
      rl.question('Number 2: ', (num2) => {
        const result = parseInt(num1) + parseInt(num2);
        console.log(`Result: ${result}`);
        rl.close();
      });
    });
  }
});

controller.run();