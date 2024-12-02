import React from 'react';
import './card.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import api from '../api/axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ card, isVcard }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    let navigate = useNavigate();
    const deleteCard = async (id) => {
        if (isVcard) {
            const { data } = await api.delete(`/virtual/card/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(data);
        } else {
            const { data } = await api.delete(`/my/card/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(data);
        }
        window.location.reload();
    }

    const editCard = (id) => {
        navigate(`/myCards/edit/${id}`);
    }
    return (
        isVcard == true ? (
            <div className='cont-border'>
                <p><strong>Name: </strong>{card.name}</p>
                <p><strong>Card Number: </strong>{card.cardNumber}</p>
                <p><strong>Expiery Date: </strong>{card.expiryDate}</p>
                <p><strong>CVV: </strong>{card.cvv}</p>
                <Button variant='danger' onClick={() => deleteCard(card.id)}>Delete</Button>
            </div>
        ) : (
            <div className='cont-border'>
                <p><strong>Name: </strong>{card.name}</p>
                <p><strong>Card Number: </strong>{card.cardNumber}</p>
                <p><strong>Expiery Date: </strong>{card.expiryDate}</p>
                <p><strong>CVV: </strong>{card.cvv}</p>
                <Button variant='warning' onClick={() => editCard(card.id)}>Edit</Button><Button variant='danger' onClick={() => deleteCard(card.id)}>Delete</Button>
            </div>
        )
    )
}

export default Card