import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';

const PersonList = () => {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = () => {
        axios.get('/api/persons')
            .then(response => setPersons(response.data))
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axios.delete(`/api/persons/${id}`)
            .then(response => fetchPersons())
            .catch(error => console.error(error));
    };

    const handleEdit = (person) => {
        setSelectedPerson(person);
    };

    return (
/*         <div>
            <h1>Person List</h1>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>{person.name} - {person.email}</li>
                ))}
            </ul>
        </div> */

        <div>
        <PersonForm selectedPerson={selectedPerson} fetchPersons={fetchPersons} setSelectedPerson={setSelectedPerson} />
        <ul>
        <h1>Person List</h1>
            {persons.map(person => (
                <li key={person.id}>
                    {person.name} - {person.email}
                    <button onClick={() => handleEdit(person)}>Edit</button>
                    <button onClick={() => handleDelete(person.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  
        );
};

export default PersonList;
