/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  let cardsArray = [];
  let sortedSets = []; // Arreglo para almacenar los sets de cartas ordenadas

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
      "A",
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

  // Función para ordenar cartas utilizando Selection Sort
  async function selectionSort(cardsArray) {
    const n = cardsArray.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (compareCards(cardsArray[j], cardsArray[minIndex]) < 0) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = cardsArray[i];
        cardsArray[i] = cardsArray[minIndex];
        cardsArray[minIndex] = temp;
        await sleep(1000);
        // Clonar cardsArray y agregarlo al arreglo sortedSets
        sortedSets.push([...cardsArray]);
        updateBottomDiv(sortedSets);
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
      "A",
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Función para actualizar el contenido del "bottomDiv"
  function updateBottomDiv(sortedSets) {
    const bottomDiv = document.getElementById("bottomDiv");
    bottomDiv.innerHTML = "";

    // Mostrar cada set de cartas ordenadas en el "bottomDiv"
    sortedSets.forEach((set, index) => {
      const setDiv = document.createElement("div");
      setDiv.className = "sorted-set";
      setDiv.textContent = `Set ${index + 1}:`;

      set.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style.color = card.color;
        cardDiv.textContent = card.value + card.suit;
        setDiv.appendChild(cardDiv);
      });

      bottomDiv.appendChild(setDiv);
    });
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

    // Actualiza cardsArray con las cartas dibujadas
    cardsArray = drawRandomCards(amountOfCards);
  });

  // Event listener para el botón "Ordenar"
  document.getElementById("sort").addEventListener("click", () => {
    selectionSort([...cardsArray]); // Clonar cardsArray para evitar modificar el original
  });
};
