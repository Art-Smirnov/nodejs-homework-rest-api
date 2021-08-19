const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, "./model-contacts.json"), "utf-8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();
  const result = data.find(({ id }) => id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await readData(contactId);
  const index = data.findIndex(({ id }) => id === contactId);
  if (index !== -1) {
    const newData = data.splice(index, 1);
    await fs.writeFile(path.join(__dirname, "./model-contacts.json"), JSON.stringify(data, null, " "));
    return newData;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body,
    ...(body.blocked ? {} : { blocked: false }),
  };
  const data = await readData();
  data.push(record);
  await fs.writeFile(path.join(__dirname, "./model-contacts.json"), JSON.stringify(data, null, " "));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await readData();
  const [result] = data.filter(({ id }) => id === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(path.join(__dirname, "./model-contacts.json"), JSON.stringify(data, null, " "));
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
