/* const d = [
  [
    {
      type: "boat" | "shot" | "boatshot",
      x: 0,
      y: 0,
    },
  ],
];
 */
const Grid = (width, data) => {
  let gridHtml = "";

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      const cell = data.find((d) => d.x === i && d.y === j);
      let color = "gray";

      if (cell && cell.type === "boat") {
        color = "blue";
      } else if (cell && cell.type === "shot") {
        color = "pink";
      } else if (cell && cell.type === "boatshot") {
        color = "red";
      } else if (cell && cell.type === "placing") {
        color = "lightblue";
      }

      gridHtml += `<div class="cell" data-x="${i}" data-y="${j}" style="width:30px; background: ${color}; border:1px solid black; height: 30px;">`;

      gridHtml += "</div>";
    }
  }

  const template = `
    <header css="grid" style="display:grid; grid-template-columns: repeat(${width}, 1fr);">
      ${gridHtml}
    </header>
  `;

  return template;
};

export default Grid;
