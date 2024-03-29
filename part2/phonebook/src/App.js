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

const Persons = ({ persons, setNotification, setPersons, setType }) => {
  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((value) => value.id !== person.id));

          setType("success");
          setNotification(`Removed ${person.name}`);

          setTimeout(() => {
            setType(null);
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setType("error");
          setNotification(
            `${person.name} has already been removed from the server`
          );

          setTimeout(() => {
            setType(null);
            setNotification(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

const Notification = ({ message, type }) => {
  return message === null ? null : <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.includes(filter)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        const personId = persons.filter((person) => person.name === newName)[0]
          .id;

        const updatedPerson = { ...newPerson, id: personId };
        personService
          .update(updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");

            setType("success");
            setNotification(`Updated ${updatedPerson.name}`);

            setTimeout(() => {
              setType(null);
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setType("error");
            setNotification(error.response.data.error);

            setTimeout(() => {
              setType(null);
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");

          setType("success");
          setNotification(`Added ${newPerson.name}`);

          setTimeout(() => {
            setType(null);
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setType("error");
          setNotification(error.response.data.error);

          setTimeout(() => {
            setType(null);
            setNotification(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={type} />
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
      <Persons
        persons={filteredPersons}
        setNotification={setNotification}
        setPersons={setPersons}
        setType={setType}
      />
    </div>
  );
};

export default App;
