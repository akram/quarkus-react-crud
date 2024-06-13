import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PersonList = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios.get('/api/persons')
            .then(response => setPersons(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Person List</h1>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>{person.name} - {person.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default PersonList;
