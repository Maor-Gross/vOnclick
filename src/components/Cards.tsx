import { FunctionComponent, useEffect, useState, useCallback } from "react";
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import { useCards } from "../context/CardsContext";
import vOnclickLogo from "../../images/vOnclick-logo.png";
import mail from "../../images/pictures/mail.png";
import facebookIcon from "../../images/logo/social_media/clear/facebook.png";
import instagramIcon from "../../images/logo/social_media/clear/instagram.png";
import whatsappIcon from "../../images/logo/social_media/clear/whats-app.png";
import callIcon from "../../images/logo/social_media/clear/call.png";
import zimmer from "../../images/location/icons/zimmer.png";
import villa from "../../images/location/icons/vila.png";
import suite from "../../images/location/joy/cover.jpeg";
import loft from "../../images/location/icons/loft.png";
import hour from "../../images/location/icons/spa.png";

import Ad from "./Ad";

interface CardsProps {
  filteredCards: Card[];
  searchTerm: string;
}

type CategoryKey = "hour" | "loft" | "suite" | "zimmer" | "villa";

const categoryNames: Record<CategoryKey, string> = {
  hour: "חדרים לפי שעה",
  loft: "לופטים",
  suite: "סוויטות",
  zimmer: "צימרים",
  villa: "וילות נופש",
};

const categories: CategoryKey[] = ["villa", "zimmer", "suite", "loft", "hour"];

const Cards: FunctionComponent<CardsProps> = ({
  filteredCards,
  searchTerm,
}) => {
  const { cards, setCards } = useCards();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCity, setSelectedCity] = useState("כל האזורים");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState("");

  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const updateCards = useCallback(() => {
    getAllCards()
      .then((res) => {
        if (res && res.data) {
          setCards(res.data);
        } else {
          setError("Failed to load cards. Please try again.");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cards:", err);
        setError("Failed to load cards. Please try again.");
        setIsLoading(false);
      });
  }, [setCards]);

  useEffect(() => {
    updateCards();
  }, [updateCards]);

  const handleSearch = () => {
    setSearchInitiated(true);
    const filteredResults = cards.filter((card) => {
      const cityMatch =
        selectedCity === "כל האזורים" || card.address.city === selectedCity;

      const minPriceNum = Number(minPrice);
      const maxPriceNum = Number(maxPrice);
      const roomsNum = Number(rooms);

      const minPriceMatch = minPrice === "" || card.price >= minPriceNum;
      const maxPriceMatch = maxPrice === "" || card.price <= maxPriceNum;
      const roomsMatch = rooms === "" || card.rooms == roomsNum;

      return cityMatch && minPriceMatch && maxPriceMatch && roomsMatch;
    });

    setSearchResults(filteredResults);
  };

  const cardsToDisplay = searchTerm
    ? filteredCards
    : searchInitiated
    ? searchResults
    : cards;

  if (isLoading) {
    return (
      <div>
        <center className="spinner">
          <div className="spinner-border text-primary" role="status"></div>
          <h2>Loading...</h2>
        </center>
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  } else {
    const uniqueCities =
      cards.length > 0
        ? Array.from(new Set(cards.map((card) => card.address.city)))
        : [];

    return (
      <div className="container-big">
        <header className="header">
          <img src={vOnclickLogo} alt="logo" />
          <h1 id="connect">
            מגוון בתי אירוח וחופשות מומלצות בכל הארץ, בהתאמה אישית! <br />
            נשמח לייעץ ולבנות את החופשה המושלמת עבורכם, בהתאם לרצונות שלכם!{" "}
            <br />
            ניתן לפנות אלינו בכל עת! <br />
          </h1>

          <div className="div" id="contact-info">
            <div className="contant-info">
              <a href="https://www.facebook.com/maor.gross.marketing">
                <div>
                  <div>
                    <img src={facebookIcon} alt="facebook-icon" />
                  </div>
                </div>
              </a>
              <a href="https://www.instagram.com/maor_gross/">
                <div>
                  <div>
                    <img src={instagramIcon} alt="instagram-icon" />
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/972527736627"
                aria-label="שלח הודעת וואטסאפ למספר 052-7736627">
                <div>
                  <div>
                    <img
                      src={whatsappIcon}
                      alt="whatsapp-icon"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>

              <a href="tel:052-7736627" aria-label="התקשר.י למספר 052-7736627">
                <div>
                  <div>
                    <img src={callIcon} alt="call-icon" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </header>

        <div className="container-search-big">
          <h2 id="title-container-search">היכן תרצו לנפוש?</h2>
          <div className="container-search">
            <div className="input-group mb-3">
              <select
                className="form-select "
                aria-label="Default select example"
                style={{ fontSize: "1.5rem" }}
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="כל האזורים">כל האזורים</option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder="החל ממחיר"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder="עד מחיר"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder="מס' חדרים"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-outline-success"
            type="submit"
            style={{ fontFamily: "unset" }}
            id="submit-search"
            onClick={handleSearch}>
            מצא חופשה בקליק
          </button>
          <div className="search-list">
            {searchInitiated && searchResults.length > 0 ? (
              searchResults.map((card, index) => (
                <div key={card._id || index}>
                  <Ad card={card} updateCards={updateCards} />
                </div>
              ))
            ) : searchInitiated && searchResults.length === 0 ? (
              <h1 className="text-center display-1">לא נמצאו תוצאות</h1>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
          <div className="category" id="vacation">
            <h2 id="title-category">חופשות לפי קטגוריה</h2>
            <div className="servis">
              <a href="#zimmer">
                <img src={zimmer} alt="צימרים" />
                <h3>צימרים</h3>
              </a>
              <a href="#villa">
                <img src={villa} alt="וילות" />
                <h3>וילות</h3>
              </a>
              <a href="#suite">
                <img src={suite} alt="סוויטות" />
                <h3>סוויטות</h3>
              </a>
              <a href="#loft">
                <img src={loft} alt="לופטים" />
                <h3>לופטים</h3>
              </a>
              <a href="#hour">
                <img src={hour} alt="חדרים לפי שעה" />
                <h3>חדרים לפי שעה</h3>
              </a>
            </div>
          </div>

          <div className="gallery-background" id="projects">
            <div className="gallery-box">
              <div className="gallery-container">
                {cardsToDisplay.length === 0 ? (
                  <div className="text-center">
                    <h1 className="text-center display-1">לא נמצאו תוצאות</h1>
                  </div>
                ) : (
                  categories.map((category) => {
                    const categoryCards = cardsToDisplay.filter(
                      (card) => card.category === category
                    );

                    return (
                      categoryCards.length > 0 && (
                        <div className={category} id={category} key={category}>
                          <h2 id="contacts-site">{categoryNames[category]}</h2>
                          <div className="row justify-content-center gap-4 mb-5 py-3 container-cards">
                            {categoryCards.map((card, index) => (
                              <div key={card._id || index}>
                                <Ad card={card} updateCards={updateCards} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="container-form-contact-us">
            <img src={mail} alt="mail" id="form" />
            <div className="formbox">
              <iframe
                src="https://app.icount.co.il/api/api_web2lead.php?token=66863e268419c"
                width="100%"
                height="100%"
                title="טופס יצירת קשר"
              />
            </div>
          </div>

          <div className="container-answer" id="answers">
            <h2>שאלות נפוצות</h2>
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample">
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne">
                    האם יש בחופשה בקליק צימרים יוקרתיים בכל הארץ?
                  </button>
                </h3>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    כמובן! בחופשה בקליק תוכלו לבחור מתוך מבחר צימרים ברחבי הארץ
                    אבל בעיקר צימרים בצפון.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo">
                    האם בחופשה בקליק יש צימרים המקבלים חיות מחמד?
                  </button>
                </h3>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    כמובן! בחופשה בקליק תוכלו למצוא שלל צימרים שמקבלים אורחים
                    לנופש קסום יחד עם חיית המחמד שלכם.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree">
                    האם יש עמוד המרכז את כל הצימרים המומלצים?
                  </button>
                </h3>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    ודאי, תוכלו להתעדכן במגוון צימרים מומלצים בעמוד הבית.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour">
                    היכן ניתן לראות את כל המבצעים שאתר חופשה בקליק מציע?
                  </button>
                </h3>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    תוכלו להתעדכן בכל המבצעים בעמוד מבצעים חמים בחופשה בקליק
                    לחופשה חלומית במחיר המשתלם ביותר.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive">
                    האם קיימים בתי אירוח עם אפשרות ביטול ללא עלות?
                  </button>
                </h3>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    כן, בחלק מבתי האירוח בחופשה בקליק קיימת אפשרות ביטול ללא
                    עלות רצוי לוודא איתנו לפני ביצוע ההזמנה.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSix"
                    aria-expanded="false"
                    aria-controls="flush-collapseSix">
                    האם אתר חופשה בקליק מתחייב למחיר הטוב ביותר?
                  </button>
                </h3>
                <div
                  id="flush-collapseSix"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    כמובן! אתר חופשה בקליק מתחייב למחיר הטוב ביותר עבורכם ובמידה
                    ומצאתם מחיר זול יותר (באותם התנאים) אנו נשווה את המחיר.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cards;
