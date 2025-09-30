document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.querySelector(".grid");
  const movesDisplay = document.querySelector(".moves");
  const restartButton = document.querySelector("#restart");

  let cards = [];
  let flippedCards = [];
  let moves = 0;
  let matchedPairs = 0;
  let lockBoard = false;

  const symbols = ["🐶", "🐱", "🐭", "🐯", "🐸", "🐘", "🐳", "🐎"];

  function initGame() {
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    movesDisplay.textContent = `${moves} jogadas`;

    cards = [...symbols, ...symbols];
    cards.sort(() => Math.random() - 0.5);

    gridContainer.innerHTML = "";
    cards.forEach((symbol, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.index = index;
      card.dataset.symbol = symbol;

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");
      cardFront.textContent = symbol;

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");

      card.appendChild(cardFront);
      card.appendChild(cardBack);

      card.addEventListener("click", flipCard);
      gridContainer.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    if (this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      lockBoard = true;
      moves++;
      movesDisplay.textContent = `${moves} jogadas`;

      checkForMatch();
    }
  }

  function checkForMatch() {
    const isMatch =
      flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    flippedCards.forEach((card) => {
      card.classList.add("matched");
      card.removeEventListener("click", flipCard);
    });

    matchedPairs++;
    resetBoard();

    if (matchedPairs === symbols.length) {
      setTimeout(() => {
        alert(`Parabéns! Você completou o jogo em ${moves} jogadas!`);
      }, 500);
    }
  }

  function unflipCards() {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [lockBoard, flippedCards] = [false, []];
  }

  restartButton.addEventListener("click", initGame);

  initGame();
});
