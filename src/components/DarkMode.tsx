import { FunctionComponent, useEffect, useState } from "react";
import backgroundLight from "../../images/background/background.gif";
import backgroundDark from "../../images/background/background-dark.gif";

const DarkMode: FunctionComponent<object> = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode === "true";
  });

  useEffect(() => {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    const header = document.querySelector("header") as HTMLElement;
    const h1 = document.querySelector("#connect") as HTMLElement;
    const toggler = document.querySelector(".navbar-toggler") as HTMLElement;
    const navbar = document.querySelector(".navbar") as HTMLElement;

    if (body) {
      body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    }
    if (footer) {
      footer.style.backgroundColor = darkMode ? "black" : "white";
    }

    if (navbar) {
      navbar.style.backgroundColor = darkMode ? "black" : "#037b95";
    }
    if (toggler) {
      toggler.style.backgroundColor = darkMode ? "black" : "white";
    }
    if (header) {
      header.style.backgroundImage = darkMode
        ? `url(${backgroundDark})`
        : `url(${backgroundLight})`;
    }
    if (h1) {
      h1.style.color = darkMode ? "white" : "#037b95";
    }

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  return darkMode ? (
    <i
      className="bi bi-sun-fill text-warning light-mode"
      style={{ cursor: "pointer" }}
      onClick={changeMode}></i>
  ) : (
    <i
      className="bi bi-moon-fill text-light dark-mode"
      style={{ cursor: "pointer" }}
      onClick={changeMode}></i>
  );
};

export default DarkMode;
