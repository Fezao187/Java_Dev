import React, { useEffect } from 'react'
import api from '../../api/axiosConfig';
import { useState } from 'react';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';

const MyCards = ({ isAuth }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [cardList, setCardList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    }
  });
  useEffect(() => {
    const getMyCards = async () => {
      const { data } = await api.get("/my/card/all", {
        headers: {
          'authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      )
      console.log(data);
      setCardList(data);
    }
    getMyCards();
  }, []);
  const addCard = () => {
    navigate("/my/Cards/create");
  }
  return (
    <div>
      <Button variant='success' onClick={addCard}>Add Card</Button>
      <Row>
        {cardList?.map((card) => {
          return (
            <Card card={card} isVcard={false} />
          )
        })}
      </Row>
    </div>
  )
}

export default MyCards;