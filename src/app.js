/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  let cardsArray = [];

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

  // Función para dibujar cartas aleatorias
  function drawRandomCards(amount) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    const cardsArray = [];
    for (let i = 0; i < amount; i++) {
      const card = getRandomCard();
      cardsArray.push(card);
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.style.color = card.color;
      cardDiv.textContent = card.value + card.suit;
      cardContainer.appendChild(cardDiv);
    }
    return cardsArray;
  }

  // Función para ordenar cartas utilizando Bubble Sort
  async function bubbleSort(cardsArray) {
    const n = cardsArray.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (compareCards(cardsArray[j], cardsArray[j + 1]) > 0) {
          const temp = cardsArray[j];
          cardsArray[j] = cardsArray[j + 1];
          cardsArray[j + 1] = temp;
          await sleep(1000);
          updateSortedCardContainer(cardsArray);
        }
      }
    }
  }

  // Función para comparar las cartas en función de sus valores numéricos
  function compareCards(card1, card2) {
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
    const valueIndex1 = values.indexOf(card1.value);
    const valueIndex2 = values.indexOf(card2.value);

    if (valueIndex1 < valueIndex2) {
      return -1;
    } else if (valueIndex1 > valueIndex2) {
      return 1;
    } else {
      return 0;
    }
  }

  // Función para dormir durante un tiempo dado
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Función para actualizar el contenido del contenedor de cartas ordenadas en el DOM
  function updateSortedCardContainer(cardsArray) {
    const sortedCardContainer = document.getElementById("sortedCards");
    sortedCardContainer.innerHTML = "";

    for (const card of cardsArray) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.style.color = card.color;
      cardDiv.textContent = card.value + card.suit;
      sortedCardContainer.appendChild(cardDiv);
    }
  }

  // Event listener para el botón "Dibujar"
  document.getElementById("draw").addEventListener("click", () => {
    const amountOfCards = parseInt(
      document.getElementById("amountOfCards").value
    );
    if (isNaN(amountOfCards) || amountOfCards < 0 || amountOfCards > 10) {
      alert("Ingrese un número válido entre 0 y 10");
      return;
    }

    // Actualizar cardsArray con las cartas dibujadas
    cardsArray = drawRandomCards(amountOfCards);
  });

  // Event listener para el botón "Ordenar"
  document.getElementById("sort").addEventListener("click", () => {
    bubbleSort(cardsArray);
  });
};
