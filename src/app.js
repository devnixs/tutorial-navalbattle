import Grid from "./components/Grid";

function App(data) {
  const div = document.createElement("div");

  const highlighedCells = [];

  if (data.gameStatus.phase === 0) {
    for (const boat of data.temporaryBoats) {
      for (let x = Math.min(boat.x1, boat.x2); x <= Math.max(boat.x1, boat.x2); x++) {
        for (let y = Math.min(boat.y1, boat.y2); y <= Math.max(boat.y1, boat.y2); y++) {
          highlighedCells.push({ type: "placing", x: x, y: y });
        }
      }
    }
    if (data.placingBoat) {
      highlighedCells.push({
        type: "placing",
        x: data.placingBoat.x,
        y: data.placingBoat.y,
      });
    }
  } else if (data.gameStatus.phase === 1) {
  }

  div.innerHTML = `
    <div class="container">
      ${Grid(10, highlighedCells)}
     ${data.gameStatus.phase === 0 ? `<button id="placing-finished">J'ai fini</button>` : ''}

      ${(() => {
        if (data.gameStatus.phase === 0) {
          return `<div>Positionnez vos bateaux</div>`;
        }
      })()}

      ${data.isPlayer1 ? "Vous êtes le joueur 1" : "Vous êtes le joueur 2"}
    </div>

  `;

  return div;
}

export default App;

/*

document.addEventListener('click', function(event){
console.log(event);
})

*/
