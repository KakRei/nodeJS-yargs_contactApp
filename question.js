import fs from "node:fs";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline";
import validator from "validator";

const rl = readline.createInterface({ input, output });

const dataFolder = "./data";
const dataFile = "./data/data.json";

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]", "utf-8");
}

const writeQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (result) => {
      resolve(result);
    });
  });
};

const loadData = () => {
  const raw = fs.readFileSync(dataFile);
  const data = JSON.parse(raw);
  return data;
};

const saveData = (nama, email, nohp) => {
  const data = loadData();

  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      rl.close();
      return false;
    }
  }

  if (!validator.isMobilePhone(nohp, "id-ID")) {
    console.log("Phone number is not valid");
    rl.close();
    return false;
  }

  data.push({ nama, email, nohp });

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  console.log("data saved successfully");
  rl.close();
};

const listContacts = () => {
  const data = loadData();
  console.log("List of users:");
  data.forEach((argv, i) => {
    i = i + 1;
    console.log(`${i++}. ${argv.nama}`);
  });
  rl.close();
};

const infoContact = (nama) => {
  const data = loadData();
  const contact = data.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(`Contact with name ${nama} not found`);
    rl.close();
  } else {
    console.log(
      `Name: ${contact.nama} \nEmail: ${contact.email || "-"} \nPhone: ${
        contact.nohp
      }`
    );
    rl.close();
  }
};

const removeContact = (nama) => {
  const data = loadData();
  const newData = data.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (data.length === newData.length) {
    console.log(`Contact with name ${nama} not found`);
    rl.close();
  } else {
    fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
    console.log(`Contact with name ${nama} has been removed`);
    rl.close();
  }
};

export { infoContact, listContacts, removeContact, saveData, writeQuestion };
