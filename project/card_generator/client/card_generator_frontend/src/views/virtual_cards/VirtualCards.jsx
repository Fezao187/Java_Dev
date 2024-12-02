import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import Card from '../../components/Card';
import { Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VirtualCards = ({ isAuth }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [cardList, setCardList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    }
  });
  useEffect(() => {
    const getVirtualCards = async () => {
      const { data } = await api.get("/virtual/card/all", {
        headers: {
          'authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      );
      console.log(data)
      setCardList(data);
    };
    getVirtualCards();
  }, []);
  const createCard = async () => {
    navigate("/virtual/cards/create");
  }
  return (
    <div>
      <Button variant='success' onClick={createCard}>Create Card</Button>
      <Row>
        {cardList?.map((card) => {
          return (
            <Card card={card} isVcard={true} />
          )
        })
        }
        </Row>
    </div>
  )
}

export default VirtualCards;