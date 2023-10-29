import React from "react";
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
  useGetContactQuery,
  useGetContactsQuery,
} from "./services/contacts";
import { faker } from "@faker-js/faker";

function App() {
  const { data, isLoading } = useGetContactsQuery();
  return (
    <div>
      {isLoading && <h1>Loading</h1>}
      {data?.map((d) => (
        <div key={d.number}>
          <h1>{d.name}</h1>
          <ContactDetail id={d.id} />
        </div>
      ))}
      <AddContact />
    </div>
  );
}

export default App;

const ContactDetail = ({ id }: { id: string }) => {
  const [editContact] = useEditContactMutation();
  const { data } = useGetContactQuery(id);
  const [deleteContact] = useDeleteContactMutation();
  const handleEdit = async () => {
    const contact = {
      id,
      name: faker.person.fullName(),
      number: faker.phone.number(),
    };
    await editContact(contact);
  };
  const handleDelete = async () => {
    await deleteContact(id);
  };
  return (
    <div>
      {JSON.stringify(data, undefined, 2)}
      <button onClick={handleEdit}>Edit Contact</button>
      <button onClick={handleDelete}>Dekete Contact</button>
    </div>
  );
};
const AddContact = () => {
  const [addContact, da] = useAddContactMutation();

  const handleAdd = async () => {
    console.log(da, "data");
    const contact = {
      id: faker.string.nanoid(),
      name: faker.person.fullName(),
      number: faker.phone.number(),
    };
    await addContact(contact);
  };
  return (
    <div>
      <button onClick={handleAdd}>Add contact</button>
    </div>
  );
};
