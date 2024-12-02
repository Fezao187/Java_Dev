import React, { useState } from 'react'
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";

const CreateCard = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [name, setName] = useState();
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("my/card/create",
                {
                    name,
                    cardNumber,
                    expiryDate,
                    cvv
                },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const { message } = data;
            console.log(message);
            console.log(data);
            navigate("/my/cards");
        } catch (error) {
            setErrMsg(error.message);
        }
    }
    return (
        <div>
            <Form>
                <h1>Add Card</h1>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                    <Form.Control type="name" placeholder="Enter name on card" value={name} onChange={(e) => setName(e.target.value)} required />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Card Number">
                    <Form.Control type="text" placeholder="Enter card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Expiry Date(MM/YY)">
                    <Form.Control type="text" placeholder="Enter expirery date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="CVV">
                    <Form.Control type="text" placeholder="Enter cvv number" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </FloatingLabel>
                <br />
                {errMsg !== "" && <Alert variant="danger" dismissible>{errMsg}</Alert>}
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateCard;