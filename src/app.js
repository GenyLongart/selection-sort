/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  function getRandomCard() {
    const suits = ["♠", "♣", "♥", "♦"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A"
    ];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const isRed = randomSuit === "♥" || randomSuit === "♦";
    const cardColor = isRed ? "red" : "black";

    return { suit: randomSuit, value: randomValue, color: cardColor };
  }

  function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].cardKey.localeCompare(arr[j + 1].cardKey) > 0) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  function drawRandomCards() {
    const amountOfCards = parseInt(
      document.getElementById("amountOfCards").value
    );
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    if (isNaN(amountOfCards) || amountOfCards < 0 || amountOfCards > 10) {
      alert("Ingrese un número válido entre 0 y 10");
      return;
    }

    const drawnCards = new Set();

    while (drawnCards.size < amountOfCards) {
      const card = getRandomCard();
      const cardKey = card.value + card.suit;
      if (!drawnCards.has(cardKey)) {
        drawnCards.add(cardKey);
      }
    }

    const cardsArray = Array.from(drawnCards);
    const cardsToSort = cardsArray.map(cardKey => {
      const card = getRandomCard();
      card.cardKey = cardKey;
      return card;
    });

    bubbleSort(cardsToSort);

    for (const card of cardsToSort) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.style.color = card.color;
      cardDiv.textContent = card.value + card.suit;
      cardContainer.appendChild(cardDiv);
    }
  }

  document.getElementById("draw").addEventListener("click", drawRandomCards);
};
