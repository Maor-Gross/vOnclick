// src/components/FavCards.tsx
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import { useUser } from "../context/UserContext";
import { errorMessage } from "../services/feedbackService";
import Ad from "./Ad";

interface FavCardsProps {
  searchTerm: string;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ searchTerm }) => {
  const { user } = useUser();
  const [favCards, setFavCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateCards = useCallback(() => {
    if (user && user._id) {
      const userId = user._id;

      getAllCards()
        .then((res) => {
          const likedCards = res.data.filter(
            (card: Card) => card.likes && card.likes.includes(userId)
          );
          setFavCards(likedCards);
          setIsLoading(false);
        })
        .catch((err) => {
          errorMessage(err.response?.data || "Something went wrong");
          setIsLoading(false);
        });
    } else {
      setFavCards([]);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    updateCards();
  }, [updateCards]);

  const filteredFavCards = favCards.filter(
    (card) =>
      card.title && card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <center className="spinner">
          <div className="spinner-border text-primary" role="status"></div>
          <h2>טוען...</h2>
        </center>
      </div>
    );
  }

  return (
    <div className="row justify-content-center gap-4 mb-5 py-3 container-cards text-center">
      {filteredFavCards.length > 0 ? (
        <>
          <h1 className="display-1">מודעות שאהבתי</h1>
          {filteredFavCards.map((card: Card) => (
            <Ad key={String(card._id)} card={card} updateCards={updateCards} />
          ))}
        </>
      ) : (
        <h1 className="display-1 mb-4">
          סמנו ב-💙 מודעות שאהבתם והם יופיעו ממש כאן
        </h1>
      )}
    </div>
  );
};

export default FavCards;
