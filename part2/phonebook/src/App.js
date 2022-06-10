import { useEffect, useState } from "react";

import personService from "./services/persons";

const Filter = ({ setFilter }) => (
  <div>
    filter shown with <input onChange={(e) => setFilter(e.target.value)} />
  </div>
);

const PersonForm = ({
  handleSubmit,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:{" "}
      <input onChange={(e) => setNewName(e.target.value)} value={newName} />
    </div>
    <div>
      number:{" "}
      <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.includes(filter)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
