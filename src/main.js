import App from "./App";

class Game {
  constructor() {
    this.data = {
      gameId: 333100126,
      isPlayer1: true,
      temporaryBoats: [],
      placingBoat: null,
    };
  }

  intialize() {
    this.getGameStatus();

    document.addEventListener("click", (event) => {
      const cell = event.target;
      this._placeBoat(cell);
    });

    document.addEventListener("click", async (event) => {
      if (event.target.id !== "placing-finished") return;
      await fetch("https://navalbattle.www.areya.fr/api/game/set-boats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.data.gameId,
          isPlayer1: this.data.isPlayer1,
          boats: this.data.temporaryBoats.map((b) => ({
            StartX: b.x1,
            StartY: b.y1,
            EndX: b.x2,
            EndY: b.y2,
            BoatType: "",
          })),
        }),
      });

      this.getGameStatus();
    });
  }

  async getGameStatus() {
    await fetch("https://navalbattle.www.areya.fr/api/game/" + this.data.gameId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.data.gameStatus = data;
        this.render();
      });
  }

  _highlightPlacingBoat(cell) {
    const posX = Number(cell.dataset.x);
    const posY = Number(cell.dataset.y);
    const tempBoat = {
      type: "placing",
      x: posX,
      y: posY,
    };
    return tempBoat;
    // this.data.temporaryBoat.push(tempBoat);
    // this.render();
  }

  _placeBoat(cell) {
    if (!cell.classList.contains("cell")) return;

    const tempBoat = this._highlightPlacingBoat(cell);

    if (!this.data.placingBoat) {
      // Première case à highlighter puis mettre en mode 2e case

      this.data.placingBoat = {
        x: tempBoat.x,
        y: tempBoat.y,
        type: tempBoat.type,
      };
      this.render();
    } else {
      // Demander un 2e click et highlighter la 2e
      // Highlighter sur le chemin
      this.data.temporaryBoats.push({
        x1: this.data.placingBoat.x,
        y1: this.data.placingBoat.y,
        x2: tempBoat.x,
        y2: tempBoat.y,
      });

      this.data.placingBoat = null;
    }
    this.render();
  }

  async render() {
    console.log(this.data);
    if (document.getElementById("app").firstChild) {
      document
        .getElementById("app")
        .removeChild(document.getElementById("app").firstChild);
    }

    var template = App(this.data);
    console.log(template);
    document.getElementById("app").appendChild(template);
  }
}

const game = new Game();
game.intialize();
