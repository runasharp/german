import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {[
            { path: "/", label: "Склонения" },
            { path: "/carousel", label: "Объяснения" },
            { path: "/quiz", label: "Квиз: правильно написать предложение" },
            { path: "/adjective-declension-quiz", label: "Квиз: таблица" },
            { path: "/medical-text-quiz", label: "Квиз: правильное окончание" },
            { path: "/typing-quiz", label: "Печать письма" },
          ].map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
