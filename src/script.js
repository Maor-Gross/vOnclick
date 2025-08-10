// גלילה חלקה לאמצע העמוד בלחיצה על קישור

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("href"); // קבלת מזהה האלמנט מהקישור

        const targetElement = document.getElementById(targetId.slice(1)); // הסרת # מהמזהה

        if (targetElement) {
            const scrollTop =
                targetElement.offsetTop -
                (window.innerHeight - targetElement.offsetHeight) / 6;

            window.scrollTo({
                top: scrollTop,

                behavior: "smooth",
            });
        }
    });
});

const containerBig = document.querySelector(".container-big");

let category;

let hotelsFull = [];

counter = 0;

favourites = [];

let fonud = false;

let like = false;

let likeList = [];

let city = document.getElementById("city");

let minPrice = document.getElementById("minPrice");

let maxPrice = document.getElementById("maxPrice");

let peoples = document.getElementById("peoples");

let hotelsJSON;

let haveLocal = false;

let pageTitle = document.title;

//טעינת בתי אירוח שסומנו בלייק

likeList = localStorage.getItem("hotels");

likeList = JSON.parse(likeList) || [];

let checkLocal = [];

let counterAddHotel = 0;

onload = function createAllHotels() {
    likeList.length > 0 ? (checkLocal = likeList) : (checkLocal = hotels);

    for (let i = 0; i < hotels.length; i++) {
        if (hotels[i].showItem === true) {
            if (checkLocal[i].favourite === true) {
                like = true;

                addHotel(i, like);

                counterAddHotel++;

                addHotel(i, like);
            } else if (checkLocal[i].favourite === false) {
                like = false;

                addHotel(i, like);
            }
        }
    }
};

function checkCategory(i) {
    if (counterAddHotel === 0) {
        if (fonud === true) {
            category = document.querySelector(".search-list");
        } else if (hotels[i].category === "וילה") {
            category = document.querySelector(".vila");
        } else if (hotels[i].category === "צימר") {
            category = document.querySelector(".zimmer");
        } else if (hotels[i].category === "סוויטה") {
            category = document.querySelector(".suite");
        } else if (hotels[i].category === "לופט") {
            category = document.querySelector(".loft");
        } else if (hotels[i].category === "חדרים לפי שעה") {
            category = document.querySelector(".hour");
        }
    } else if (counterAddHotel === 1) {
        category = document.querySelector(".favourites");

        counterAddHotel = 0;
    }
}

function addHotel(number, like) {
    checkCategory(number);

    const div = category.appendChild(document.createElement("div"));

    const item = div.classList.add("gallery-item");

    const cover = div.appendChild(document.createElement("img"));

    cover.setAttribute("src", hotels[number].pic);

    cover.setAttribute("alt", hotels[number].name);

    const info = div.appendChild(document.createElement("div"));

    info.classList.add("info");

    title = info.appendChild(document.createElement("div"));

    title.classList.add("title");

    const heart = title.appendChild(document.createElement("img"));

    heart.classList.add("icon");

    heart.classList.add("love");

    heart.setAttribute("src", hotels[number].heart);

    heart.setAttribute(
        "alt",
        "לחצ.י לסימון 'אהבתי' את מלון " + hotels[number].name
    );

    heart.dataset.heart = hotels[number].id;

    if (like === true) {
        heart.setAttribute("src", hotels[number].like);
    }

    const name = title.appendChild(document.createElement("h3"));

    name.innerText = hotels[number].name;

    const p1 = info.appendChild(document.createElement("p"));

    p1.innerText =
        hotels[number].city +
        " • " +
        hotels[number].category +
        " • " +
        hotels[number].amount +
        " יחידות " +
        " • " +
        hotels[number].rooms +
        " חדרים ";

    const p2 = info.appendChild(document.createElement("p"));

    p2.innerText = hotels[number].description;

    const moreInfo = info.appendChild(document.createElement("div"));

    moreInfo.classList.add("moreInfo");

    const infoItem1 = moreInfo.appendChild(document.createElement("div"));

    infoItem1.classList.add("info-item");

    const pro1 = infoItem1.appendChild(document.createElement("p"));

    pro1IMG = pro1.appendChild(document.createElement("img"));

    pro1IMG.classList.add("icon");

    pro1IMG.setAttribute("src", "./images/icons/checked.png");

    pro1IMG.setAttribute("alt", "");

    pro1IMG.setAttribute("aria-hidden", "true");

    pro1.innerHTML += hotels[number].properties1;

    const pro2 = infoItem1.appendChild(document.createElement("p"));

    pro2IMG = pro2.appendChild(document.createElement("img"));

    pro2IMG.classList.add("icon");

    pro2IMG.setAttribute("alt", "");

    pro2IMG.setAttribute("src", "./images/icons/checked.png");

    pro2IMG.setAttribute("aria-hidden", "true");

    pro2.innerHTML += hotels[number].properties2;

    const infoItem2 = moreInfo.appendChild(document.createElement("div"));

    infoItem2.classList.add("info-item");

    h1 = infoItem2.appendChild(document.createElement("strong"));

    h1.classList.add("price");
    if (hotels[number].price > 0) {
        h1.innerText = "החל מ-" + hotels[number].price + " ₪ ";
    } else {
        h1.innerText = "לא פורסם מחיר";
    }

    const a1 = infoItem2.appendChild(document.createElement("a"));

    a1.classList.add("click-more-info");

    a1.setAttribute("href", hotels[number].srcPage);

    a1.setAttribute("aria-label", "מידע נוסף אודות " + hotels[number].name);

    const button1 = a1.appendChild(document.createElement("span"));

    button1.classList.add("item-button");

    button1.classList.add("bt-more-info");

    //button1.setAttribute("role", "button");

    button1.setAttribute("tabindex", "0");

    const imgPhone1 = button1.appendChild(document.createElement("img"));

    imgPhone1.classList.add("icon");

    imgPhone1.setAttribute("src", "./images/icons/about-us.png");

    imgPhone1.setAttribute("alt", "");

    imgPhone1.setAttribute("aria-hidden", "true");

    button1.innerHTML += "מידע נוסף";

    const a = infoItem2.appendChild(document.createElement("a"));

    a.classList.add("phone-number");

    a.setAttribute("href", "tel:" + hotels[number].tel);

    a.setAttribute("aria-label", "התקשר.י למספר " + hotels[number].tel);

    const button = a.appendChild(document.createElement("span"));

    button.classList.add("item-button");

    //button.setAttribute("role", "button");

    button.setAttribute("tabindex", "0");

    const imgPhone = button.appendChild(document.createElement("img"));

    imgPhone.classList.add("icon");

    imgPhone.setAttribute("src", "./images/logo/social_media/clear/call.png");

    imgPhone.setAttribute("alt", "");

    imgPhone.setAttribute("aria-hidden", "true");

    button.innerHTML += hotels[number].tel;

    counter++;
}

containerBig.addEventListener("click", function (e) {
    let love = e.target.classList.contains("love");

    let heartId = Number(e.target.getAttribute("data-heart"));

    let allElements = document.querySelectorAll(`[data-heart="${heartId}"]`);

    if (checkLocal[heartId].favourite === false && love) {
        allElements.forEach((element) => {
            element.setAttribute("src", hotels[heartId].like);
        });

        checkLocal[heartId].favourite = true;

        like = true;

        console.log(checkLocal[heartId].favourite);

        hotelsJSON = JSON.stringify(checkLocal);

        localStorage.setItem("hotels", hotelsJSON);

        counterAddHotel = 1;

        addHotel(heartId, like);
    } else if (checkLocal[heartId].favourite === true && love) {
        checkLocal[heartId].favourite = false;

        like = false;

        console.log(checkLocal[heartId].favourite);

        hotelsJSON = JSON.stringify(checkLocal);

        localStorage.setItem("hotels", hotelsJSON);

        allElements.forEach((element) => {
            element.setAttribute("src", hotels[heartId].heart);

            found = element.closest(".gallery-item");

            sureFound = found.closest(".favourites");

            if (sureFound) {
                sureFound.removeChild(found);
            }
        });
    }
});

function searchHotels() {
    fonud = true;

    const c = city.value;

    const min = Number(minPrice.value);

    const max = Number(maxPrice.value);

    const p = Number(rooms.value);

    console.log(c, min, max);

    const container = document.querySelector(".container-search-big");

    const child = document.querySelector(".search-list");

    container.removeChild(child);

    container

        .appendChild(document.createElement("div"))

        .classList.add("search-list");

    let hotelsResult = [];

    for (let i = 0; i < hotels.length; i++) {
        if (hotels[i].showItem === true) {
            if (
                (hotels[i].city === c || c === "כל האזורים") &&
                hotels[i].price >= min &&
                (hotels[i].price <= max || max === 0)
            ) {
                hotelsResult.push(hotels[i]);

                addHotel(i, hotels[i].favourite);
            }
        }
    }

    console.log(hotelsResult);

    return hotelsResult;
}
