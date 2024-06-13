import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonForm = ({ selectedPerson, fetchPersons, setSelectedPerson }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedPerson) {
            setName(selectedPerson.name);
            setEmail(selectedPerson.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [selectedPerson]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const person = { name, email };

        try {
            if (selectedPerson) {
                await axios.put(`/api/persons/${selectedPerson.id}`, person);
            } else {
                await axios.post('/api/persons', person);
            }
            fetchPersons();
            setSelectedPerson(null);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error saving person:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">{selectedPerson ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default PersonForm;
