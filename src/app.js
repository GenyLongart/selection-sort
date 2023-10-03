/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  function assignNumericValue(cardValue) {
    switch (cardValue) {
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "5":
        return 5;
      case "6":
        return 6;
      case "7":
        return 7;
      case "8":
        return 8;
      case "9":
        return 9;
      case "10":
        return 10;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;
      default:
        return 0; // Valor predeterminado en caso de error
    }
  }

  // Función para comparar las cartas en función de sus valores numéricos
  function compareCards(card1, card2) {
    const numericValue1 = assignNumericValue(card1.value);
    const numericValue2 = assignNumericValue(card2.value);

    if (numericValue1 < numericValue2) {
      return -1;
    } else if (numericValue1 > numericValue2) {
      return 1;
    } else {
      return 0;
    }
  }

  // Función para generar una carta aleatoria
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

  // Función para ordenar cartas utilizando Bubble Sort
  function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (compareCards(arr[j], arr[j + 1]) > 0) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  // Función para dibujar cartas aleatorias
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

    for (const cardKey of cardsArray) {
      const card = getRandomCard();
      card.cardKey = cardKey;
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.style.color = card.color;
      cardDiv.textContent = card.value + card.suit;
      cardContainer.appendChild(cardDiv);
    }
  }

  // Función para ordenar las cartas y mostrarlas
  function sortCards() {
    const cardContainer = document.getElementById("cardContainer");
    const cards = Array.from(cardContainer.querySelectorAll(".card"));
    const cardsToSort = cards.map(cardDiv => {
      const cardValue = cardDiv.textContent.slice(0, -1);
      const cardSuit = cardDiv.textContent.slice(-1);
      const cardColor = cardDiv.style.color;
      return { value: cardValue, suit: cardSuit, color: cardColor };
    });

    bubbleSort(cardsToSort);

    cardContainer.innerHTML = ""; // Limpia el contenedor antes de mostrar las cartas ordenadas

    for (const card of cardsToSort) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.style.color = card.color;
      cardDiv.textContent = card.value + card.suit;
      cardContainer.appendChild(cardDiv);
    }
  }

  // Agrega eventos a los botones "Dibujar" y "Ordenar"
  document.getElementById("draw").addEventListener("click", drawRandomCards);
  document.getElementById("sort").addEventListener("click", sortCards);
};
