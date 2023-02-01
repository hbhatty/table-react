import { useState, Fragment } from "react";
import "./App.css";
import data from "./data.json";
import { nanoid } from "nanoid";
import { ReadOnlyRow } from "./components/ReadOnlyRow";
import {EditableRow} from "./components/EditableRow"

function App() {
  //passing data from json file
  const [contacts, setContacts] = useState(data);
  const [addData, setAddData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  })

  const [editContact, setEditContact] = useState(null);
  //adds new value to table
  const formChange = (event) => {
    event.preventDefault();

    //gets name
    const fieldName = event.target.getAttribute("name");
    //gets value
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    //make whatever the fieldname is the value inside
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  };  

  const handleEditFormChange = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData2 = { ...editFormData };
    newFormData2[fieldName] = fieldValue;
    setEditFormData(newFormData2);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addData.fullName,
      address: addData.address,
      phoneNumber: addData.phoneNumber,
      email: addData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContact,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContact);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContact(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContact(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }

    setEditFormData(formValues);
  };
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            {/* top row */}
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContact === contact.id ? (
                  <EditableRow editFormData = {editFormData} handleEditFormChange = {handleEditFormChange}/>
                ) : (
                  <ReadOnlyRow
                  contact={contact}
                  handleEditClick={handleEditClick}/>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={formChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address"
          onChange={formChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number"
          onChange={formChange}
        />
        <input
          type="text"
          name="email"
          required="required"
          placeholder="Enter an email"
          onChange={formChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
