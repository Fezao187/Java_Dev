import React from 'react'
import { Button } from 'react-bootstrap';
const Card = ({ card }) => {
    return (
        <div>
            <p><strong>Name: </strong>{card.name}</p>
            <p><strong>Card Number: </strong>{card.cardNumber}</p>
            <p><strong>Expiery Date: </strong>{card.expiryDate}</p>
            <p><strong>CVV: </strong>{card.cvv}</p>
            <Button variant='warning'>Edit</Button><Button variant='danger'>Delete</Button>
        </div>
    )
}

export default Card