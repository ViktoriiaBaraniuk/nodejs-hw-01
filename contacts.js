const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')

const contactsPath = path.join(__dirname, '/db/contacts.json')


async function listContacts() {
    try{
        const contactList = await fs.readFile(contactsPath, "utf8")
        const listContacts =JSON.parse(contactList)
        console.log('Список контактов')
        console.table(listContacts)
        return listContacts
        
    }
    catch (error) {
        console.log('Error:', error.message)
        
    }
  }

  
async function getContactById(contactId) {
    try{
        /* const contactList = await listContacts() */
        const contactList = await fs.readFile(contactsPath, "utf8")
        const listContacts =JSON.parse(contactList)
        const findContactById = listContacts.find(({id}) => id === contactId)
       console.log('Получение контакта по номеру-id: ', findContactById)
    }
    catch (error) {
        console.log('Error:', error.message)
      
    }
  }
  

async function removeContact(contactId) {
    try{
        const contactList = await fs.readFile(contactsPath, "utf8")
        const listContacts =JSON.parse(contactList)
        const updatedContactList = listContacts.filter(({id}) => id !== contactId)

        await fs.writeFile(contactsPath, JSON.stringify(updatedContactList, null, 2), "utf8")
        console.log('Обновленный список контактов:')
        console.table(updatedContactList)
    }
    catch (error) {
        console.log('Error:', error.message)
      
    }
  }
  
 async function addContact(name, email, phone) {
    try{
        const contactList = await fs.readFile(contactsPath, "utf8")
        const listContacts =JSON.parse(contactList)
        const id = Number(shortid.generate())
        const newContact = {
            id,
            name,
            email,
            phone
          } 
        const newAddedContactList = [...listContacts, newContact]
        await fs.writeFile(contactsPath, JSON.stringify(newAddedContactList, null, 2), "utf8")
        console.log('Обновленный список контактов:')
       console.table(newAddedContactList)
       
    }
    catch (error) {
        console.log('Error:', error.message)
      
    }
  }

  module.exports = {listContacts, getContactById, removeContact, addContact}