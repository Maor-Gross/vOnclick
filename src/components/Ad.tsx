import { FunctionComponent, useState, useEffect } from "react";
import { Card } from "../interfaces/cards/Cards";
import { useUser } from "../context/UserContext";
import { updateCardDeleted, updateCardLikes } from "../services/cardsService";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import logo from "../../images/vOnclick-icon.png";
import checked from "../../images/icons/checked.png";
import info from "../../images/icons/about-us.png";
import call from "../../images/logo/social_media/clear/call.png";
import { isAxiosError } from "axios";

interface AdProps {
  card: Card;
  updateCards: () => void;
}

const Ad: FunctionComponent<AdProps> = ({ card, updateCards }) => {
  const { user } = useUser();
  const userLoggedIn = !!user;
  const isAdmin = user?.isAdmin;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(card.likes?.includes(user?._id || "") || false);
  }, [card.likes, user?._id]);

  const { token } = useToken();
  const cardCreator = user && user._id && card?.user_id === user._id;

  const navigate = useNavigate();

  const handleFavoriteClick = async () => {
    if (!user || !token || !card?._id) {
      console.error("Missing user, token, or card ID for like operation.");
      errorMessage("Must be logged in to like a card."); // הודעה למשתמש
      return;
    }

    try {
      await updateCardLikes(card._id, token);
      setLiked(!liked);
      updateCards();
    } catch (error) {
      if (isAxiosError(error)) {
        errorMessage(error.response?.data?.message || "שגיאה בעדכון לייק");
      } else {
        errorMessage("משהו השתבש בעדכון לייק");
      }
      console.error("Error updating likes:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את הכרטיס?")) {
      return;
    }

    if (!user || !token || !card?._id || !card?.bizNumber) {
      console.error(
        "Missing user, token, card ID, or bizNumber for delete operation."
      );
      errorMessage("שגיאה במחיקת הכרטיס: חסרים פרטים.");
      return;
    }

    try {
      await updateCardDeleted(card._id, card.bizNumber, token);
      sucessMassage(`הכרטיס שלך נמחק בהצלחה!`);
      updateCards();
    } catch (err) {
      if (isAxiosError(err)) {
        errorMessage(err.response?.data?.message || "שגיאה במחיקת הכרטיס.");
      } else {
        errorMessage("משהו השתבש במהלך מחיקת הכרטיס");
      }
      console.error("Error deleting card:", err);
    }
  };

  const handleEditClick = () => {
    navigate("/edit-card", { state: { card } });
  };

  return (
    <div className="gallery-item">
      <img
        src={card.image.url}
        alt={card.image.alt}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = logo;
        }}
      />
      <div className="info">
        <div className="title">
          <h3>{card.title}</h3>
          <div className="d-flex flex-row-reverse gap-3">
            {userLoggedIn &&
              (liked ? (
                <i
                  className="bi bi-heart-fill text-danger fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleFavoriteClick}></i>
              ) : (
                <i
                  className="bi bi-heart text-danger fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleFavoriteClick}></i>
              ))}
            {(isAdmin || cardCreator) && (
              <>
                <i
                  className="bi bi-pencil-square text-warning fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleEditClick}></i>
                <i
                  className="bi bi-trash3-fill text-primary fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleDeleteClick}></i>
              </>
            )}
          </div>
        </div>
        <p>{`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}</p>
        <p>{card.description}</p>
        <div className="moreInfo">
          <div className="info-item">
            <p>
              <img
                className="icon"
                alt="checked"
                src={checked}
                aria-hidden="true"
              />
              {card.rooms} חדרים
            </p>
          </div>
          <div className="info-item">
            {card.price > 0 ? (
              <strong className="price">{card.price} ₪</strong>
            ) : (
              <strong className="price">לא פורסם מחיר</strong>
            )}
            <a
              className="click-more-info"
              aria-label="מידע נוסף"
              onClick={() => navigate(`/card-info/${card._id}`)}>
              <span className="item-button bt-more-info">
                <img
                  className="icon"
                  src={info}
                  alt="מידע נוסף"
                  aria-hidden="true"
                />
                מידע נוסף
              </span>
            </a>
            <a
              className="phone-number"
              href={`tel:${card.phone}`}
              aria-label={`חייג אל: ${card.phone}`}>
              <span className="item-button">
                <img className="icon" src={call} alt="" aria-hidden="true" />
                {card.phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;
