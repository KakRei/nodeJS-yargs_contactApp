import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  infoContact,
  listContacts,
  removeContact,
  saveData,
} from "./question.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add a new user",
    builder: {
      nama: {
        demandOption: true,
        describe: "add user's name",
        type: "string",
      },
      email: {
        demandOption: false,
        describe: "add user's email",
        type: "string",
      },
      nohp: {
        demandOption: true,
        describe: "add user's phone number",
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        nohp: argv.nohp,
      };
      saveData(contact.nama, contact.email, contact.nohp);
    },
  })
  .command({
    command: "list",
    describe: "List all users",
    handler(argv) {
      listContacts(argv);
      console.log('Hint: "info" for more user details');
    },
  })
  .command({
    command: "info",
    describe: "Information about user's contact",
    builder: {
      nama: {
        demandOption: true,
        describe: "user's name",
        type: "string",
      },
    },
    handler(argv) {
      infoContact(argv.nama);
    },
  })
  .command({
    command: "rm",
    describe: "Remove user's contact",
    builder: {
      nama: {
        demandOption: true,
        describe: "user's name",
        type: "string",
      },
    },
    handler(argv) {
      removeContact(argv.nama);
    },
  })
  .demandCommand(
    1,
    chalk.bgRed("you missing a command, Here are list of command")
  )
  .parse();
