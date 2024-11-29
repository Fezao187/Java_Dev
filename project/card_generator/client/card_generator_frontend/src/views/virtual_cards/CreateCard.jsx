import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateCard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await api.get("/virtual/card/create",
            {
                name: name
            },
            {
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        );
        navigate("/virtual/cards");
    }
    return (
        <div>
            <Form>
                <h1>Add card name</h1>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                    <Form.Control type="name" placeholder="Enter card name" value={name} onChange={(e) => setName(e.target.value)} required />
                </FloatingLabel>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateCard;