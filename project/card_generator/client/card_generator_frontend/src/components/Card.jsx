import React from 'react'
import { Button } from 'react-bootstrap';
import api from '../api/axiosConfig';
import { useState } from 'react';

const Card = ({ card, isVcard }) => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
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
    return (
        isVcard == true ? (
            <div>
                <p><strong>Name: </strong>{card.name}</p>
                <p><strong>Card Number: </strong>{card.cardNumber}</p>
                <p><strong>Expiery Date: </strong>{card.expiryDate}</p>
                <p><strong>CVV: </strong>{card.cvv}</p>
                <Button variant='danger' onClick={() => deleteCard(card.id)}>Delete</Button>
            </div>
        ) : (
            <div>
                <p><strong>Name: </strong>{card.name}</p>
                <p><strong>Card Number: </strong>{card.cardNumber}</p>
                <p><strong>Expiery Date: </strong>{card.expiryDate}</p>
                <p><strong>CVV: </strong>{card.cvv}</p>
                <Button variant='warning'>Edit</Button><Button variant='danger' onClick={() => deleteCard(card.id)}>Delete</Button>
            </div>
        )
    )
}

export default Card