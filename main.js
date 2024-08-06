
// Game Constants
const ROW = 20; // number of rows
const COL = 10; // number of columns
const minirow = 4; // number of rows for miniTetris
const minicol = 4; // number of columns for miniTetris
const SQ = 45; // square size
const VACANT = '#11315F'; // color of an empty square


// Initialize Konva stage and layers
var stage = new Konva.Stage({
  container: 'game-board',
  width: COL * SQ,
  height: ROW * SQ,
});
// then create layer
var layer = new Konva.Layer();
stage.add(layer);

// // Create the main Tetris grid graphics
// const gridLines = new Konva.Line({
//   points: [],
//   stroke: 'white',
//   strokeWidth: 1,
// });

// for (let row = 0; row < ROW; row++) {
//   for (let col = 0; col < COL; col++) {
//       gridLines.points([...gridLines.points(), col * SQ, row * SQ]);
//   }
// }
// layer.add(gridLines);
// layer.draw();
const gridLines = new Konva.Group();
for (let i = 0; i <= COL; i++) {
  const line = new Konva.Line({
    points: [i * SQ, 0, i * SQ, ROW * SQ],
    stroke: 'white',
    strokeWidth: 1,
  });
  gridLines.add(line);
}

for (let i = 0; i <= ROW; i++) {
  const line = new Konva.Line({
    points: [0, i * SQ, COL * SQ, i * SQ],
    stroke: 'white',
    strokeWidth: 1,
  });
  gridLines.add(line);
}
layer.add(gridLines);
layer.draw();

const textures = {
  red: 'assets/images/Z.png',
  green: 'assets/images/S.png',
  yellow: 'assets/images/T.png',
  blue: 'assets/images/O.png',
  purple: 'assets/images/L.png',
  cyan: 'assets/images/I.png',
  orange: 'assets/images/J.png'
};

const loadedTextures = {};

Promise.all(
  Object.keys(textures).map(color => 
      loadImage(textures[color]).then(img => {
          loadedTextures[color] = img;
      })
  )
).then(() => {
  // All textures loaded, start the 
  // startGame();
  // startButton.show();
  // renderBoard();
  renderPreviewBoard();
});
function loadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
  });
}
// Function to draw a square
// Function to draw a square with texture
function drawSquare(x, y, color, opacity = 1,strokeWidth = 0.8) {
  if (loadedTextures[color]) {
      const image = new Konva.Image({
          x: x * SQ,
          y: y * SQ,
          width: SQ,
          height: SQ,
          image: loadedTextures[color],
          stroke: 'white', // default stroke color
          strokeWidth: strokeWidth,
          opacity: opacity,
      });
      layer.add(image);
  } else {
      const square = new Konva.Rect({
          x: x * SQ,
          y: y * SQ,
          width: SQ,
          height: SQ,
          fill: color,
          stroke: 'black',
          strokeWidth: 1,
          opacity: opacity,
      });
      layer.add(square);
  }
}

// Create the board
let board = Array.from({ length: ROW }, () => Array(COL).fill(VACANT));


// Render the main Tetris board 
function renderBoard() {
  layer.removeChildren();
  layer.add(gridLines);
  for (let r = 0; r < ROW; r++) {
      for (let c = 0; c < COL; c++) {
          const color = board[r][c];
          drawSquare(c, r, color);
      }
  }
  layer.draw();
}
renderBoard();


// Initialize Konva for the mini preview board
var miniStage = new Konva.Stage({
  container: 'preview-board',
  width: minicol * SQ,
  height: minirow * SQ,
});


var miniLayer = new Konva.Layer();
miniStage.add(miniLayer);

// Mini Tetris grid graphics
const miniGridLines = new Konva.Line({
  points: [],
  stroke: 'white',
  strokeWidth: 1,
});

for (let row = 0; row < minirow; row++) {
  for (let col = 0; col < minicol; col++) {
      miniGridLines.points([...miniGridLines.points(), col * SQ, row * SQ]);
  }
}

miniLayer.add(miniGridLines);
miniLayer.draw();

// Function to draw a mini square with texture
function drawSquareMini(x, y, color) {
  if (loadedTextures[color]) {
      const image = new Konva.Image({
          x: x * SQ,
          y: y * SQ,
          width: SQ,
          height: SQ,
          image: loadedTextures[color],
      });
      miniLayer.add(image);
  } else {
      const square = new Konva.Rect({
          x: x * SQ,
          y: y * SQ,
          width: SQ,
          height: SQ,
          fill: color,
          stroke: 'black',
          strokeWidth: 1,
      });
      miniLayer.add(square);
  }
}
// Create the mini board
let miniBoard = Array.from({ length: minirow }, () => Array(minicol).fill(VACANT));


// Render the mini Tetris board
function renderPreviewBoard() {
  miniLayer.removeChildren();
  miniLayer.add(miniGridLines);
  for (let r = 0; r < minirow; r++) {
      for (let c = 0; c < minicol; c++) {
          const color = miniBoard[r][c];
          drawSquareMini(c, r, color);
      }
  }
  miniLayer.draw();
}
renderPreviewBoard()


// Initialize Konva for score display
var scoreStage = new Konva.Stage({
  container: 'score-display',
  width: 400,
  height: 75,
});

var scoreLayer = new Konva.Layer();
scoreStage.add(scoreLayer);

// Create the score text
let score = 0;
const scoreText = new Konva.Text({
    text: `Score: ${score}`,
    fontSize: 40,
    fill: 'white',
    fontStyle: 'bold',
    fontFamily: 'Silkscreen, sans-serif, CustomFont',
    x: 10,
    y: 10,
});
scoreLayer.add(scoreText);
scoreLayer.draw();

// Initialize Konva for level display
var levelStage = new Konva.Stage({
  container: 'level-display',
  width: 275,
  height: 75,
});

var levelLayer = new Konva.Layer();
levelStage.add(levelLayer);

// Create the level text
let level = 1;
const levelText = new Konva.Text({
    text: `Level: ${level}`,
    fontSize: 35,
    fill: 'white',
    fontStyle: 'bold',
    fontFamily: 'Silkscreen, sans-serif, CustomFont',
    x: 10,
    y: 10,
});
levelLayer.add(levelText);
levelLayer.draw();
// Function to update the score
// Correct method to update text in Konva
function updateScore(points) {
  score += points;
  scoreText.text(`Score: ${score}`); // Use the 'text' method to set text
  scoreLayer.draw(); // Redraw the layer to reflect changes

  if (score >= level * 20) {
      level++;

      levelText.text(`Level: ${level}`); 
      // stopSound(clearSound)
      playSound(levelSound)// Use the 'text' method to set text
      levelLayer.draw(); // Redraw the layer to reflect changes
      downspeed = Math.max(100, downspeed - 20); // Decrease downspeed but ensure it doesn't go below a certain threshold
  }
}



function updateLevel(level) {
  return level;
}



// Initialize Konva for pause display
var pauseStage = new Konva.Stage({
  container: 'pause-display',
  width: 300,
  height: 100,
});

var pauseLayer = new Konva.Layer();
pauseStage.add(pauseLayer);

// Create the pause text
const pauseText = new Konva.Text({
  text: 'PAUSED',
  fontSize: 45,
  fontFamily: 'Helvetica',
  fill: 'white',
  fontStyle: 'bold',
  fontFamily: 'Silkscreen, sans-serif, CustomFont',
  x: 10,
  y: 10,
});
pauseText.hide(); // Initially hide the pause text
pauseLayer.add(pauseText);
pauseLayer.draw();

// Pause state
let isPaused = false;
let gameStarted = false; // Track whether the game has started
function togglePause() {
   if (!gameStarted) return; // Do nothing if the game hasn't started
  if (isPaused) {
    // Unpause the game
    pauseText.hide();
    dropStart = Date.now(); // Reset the drop timer
    dropAnimation = requestAnimationFrame(drop); 
    isPaused = false;
  } else {
    // Pause the game
    pauseText.show();
    cancelAnimationFrame(dropAnimation); // Stop the game loop
    isPaused = true;
  }
  pauseLayer.draw();
}

// Initialize Konva for game over display
var gameOverStage = new Konva.Stage({
  container: 'game-over-display',
  width: 400,
  height: 100,
});

var gameOverLayer = new Konva.Layer();
gameOverStage.add(gameOverLayer);

// Create the game over text
const gameOverText = new Konva.Text({
  text: 'GAME OVER',
  fontSize: 45,
  fontstyle: 'italic',
  fontFamily: 'Helvetica',
  fill: 'red',
  fontStyle: 'bold',
  fontFamily: 'Silkscreen, sans-serif, CustomFont',
  x: 10,
  y: 10,
});
gameOverText.hide(); // Initially hide the game over text
gameOverLayer.add(gameOverText);
gameOverLayer.draw();


// Initialize Konva for play again button display
var playAgainStage = new Konva.Stage({
  container: 'play-again-display',
  width: stage.width(),
  height: stage.height(),
});

var playAgainLayer = new Konva.Layer();
playAgainStage.add(playAgainLayer);

// Create the play again button
const playAgainButton = new Konva.Rect({
  x: (playAgainStage.width() - 255) / 2, // Center button horizontally
  y: (playAgainStage.height() - 70) / 2 + 80, // Position below the center
  width:350,
  height: 70,
  fill: '#00848F',
  
  cornerRadius: 10, 
});
playAgainButton.hide(); // Initially hide the button
playAgainLayer.add(playAgainButton);

// Text label for the button
const playAgainButtonText = new Konva.Text({
  x: playAgainButton.x() + playAgainButton.width() / 2,
  y: playAgainButton.y() + playAgainButton.height() / 2,
  text: 'Play Again',
  fontSize: 35,
  fontFamily: 'Helvetica',
  fill: 'white',
  fontStyle: 'bold',
  fontFamily: 'Silkscreen, sans-serif, CustomFont',
});
playAgainButtonText.offsetX(playAgainButtonText.width() / 2); // Center text horizontally
playAgainButtonText.offsetY(playAgainButtonText.height() / 2); // Center text vertically
playAgainButtonText.hide(); // Initially hide the text
playAgainLayer.add(playAgainButtonText);

// Event listener for the play again button
playAgainButton.on('click', () => {
  restartGame();
  playSound(selectSound) // Call a function to restart the game
});

playAgainButton.on('mouseover', () => {
  playAgainButton.fill('#933017'); // Change color on hover
  playAgainLayer.draw();
});

playAgainButton.on('mouseout', () => {
  playAgainButton.fill('#00848F'); // Revert color when not hovered
  playAgainLayer.draw();
});

function restartGame() {
  // Reset game state variables
  board = Array.from({ length: ROW }, () => Array(COL).fill(VACANT));
  score = 0;
  level = 1;
  let downspeed = 500;// Reset downspeed
  gameStarted = true; // Ensure gameStarted is true
  isPaused = false;

  // Hide game over elements and play again button
  gameOverText.hide();
  playAgainButton.hide();
  playAgainButtonText.hide();
  
  // Reset score display
  scoreText.text(`Score: ${score}`);
  levelText.text(`Level: ${level}`);
  scoreLayer.draw();
  levelLayer.draw();

  // Restart the game
  p = randomPiece();
  p.drawMini();
  nextPiece = randomPiece();
  nextPiece.updatePreviewBoard();
  renderBoard();
  renderPreviewBoard();
  
  // Start the game loop again
  dropStart = Date.now();
  dropAnimation = requestAnimationFrame(drop);
}
function showGameOver() {
  gameOverText.show();

  gameOverLayer.draw();
  playAgainButton.show();
  playAgainButtonText.show();
  playAgainLayer.draw();
  cancelAnimationFrame(dropAnimation);
  playSound(gameOverSound);  // Stop the game loop
  stopSound(moveSound); // Stop the game loop
  stopSound(hardDropSound);
 
}

const startButton = new Konva.Rect({
  x: (stage.width() - 350) / 2, // Use stage.width() instead of stageWidth
  y: (stage.height() - 70) / 2, // Use stage.height() instead of stageHeight
  width: 350,
  height: 70,
  fill: '#00848F',
  cornerRadius: 10, // optional: to make the button corners rounded
});
layer.add(startButton);

// Text label for the button
const buttonText = new Konva.Text({
  x: startButton.x() + startButton.width() / 2,
  y: startButton.y() + startButton.height() / 2,
  text: 'Start Game',
  fontSize: 35,
  fontFamily: 'Helvetica',
  fill: 'white',
  fontStyle: 'bold',
  fontFamily: 'Silkscreen, sans-serif, CustomFont',
});
buttonText.offsetX(buttonText.width() / 2); // Center text horizontally
buttonText.offsetY(buttonText.height() / 2); // Center text vertically
layer.add(buttonText);

startButton.on('mouseover', () => {
  startButton.fill('#933017'); // Change color on hover
  layer.draw();
});

startButton.on('mouseout', () => {
  startButton.fill('#00848F'); // Revert color when not hovered
  layer.draw();
});
// var particleLayer = new Konva.Layer();
// stage.add(particleLayer);
// function createParticleEffect(x, y, width) {
//   for (let i = 0; i < 100; i++) {
//     const radius = Math.random() * 2 + 1; // Random radius between 1 and 3
//     const color = getRandomColor(); // Random color
//     const angle = Math.random() * Math.PI * 2; // Random angle
//     const initialVelocity = Math.random() * 5 + 5; // Random initial velocity between 5 and 10
//     const acceleration = -Math.random() * 0.02 - 0.01; // Negative acceleration to slow down over time

//     const particle = new Konva.Circle({
//       x: x + width / 2,
//       y: y,
//       radius: radius,
//       fill: color,
//       opacity: 1,
//     });
//     particleLayer.add(particle);

//     const anim = new Konva.Animation((frame) => {
//       const progress = frame.timeDiff * 0.02;
//       const velocity = initialVelocity + acceleration * frame.time; // Adjust velocity with acceleration
//       particle.x(x + width / 2 + Math.cos(angle) * velocity * progress);
//       particle.y(y + Math.sin(angle) * velocity * progress);
//       particle.opacity(Math.max(0, 1 - progress * 2)); // Faster fade-out

//       // Stop animation if the particle is too slow
//       if (velocity <= 0) {
//         anim.stop();
//       }
//     }, particleLayer);

//     anim.start();
//   }
//   particleLayer.batchDraw();
// }


// function getRandomColor() {
//   const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
//   return colors[Math.floor(Math.random() * colors.length)];
// }


// Tetromino definitions
const I = [
	[
		[0, 0, 0, 0],  // 1st rotation
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],// 2nd rotation
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],// 3rd rotation
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0], // 4th rotation
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],// 1st rotation
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],// 2nd rotation
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1], // 3rd rotation
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0], //4th rotation
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],  // 1st rotation
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0], //2nd rotation
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1], // 3rd rotation
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0], // 4th rotation
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0], // 1st rotation
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],// 1st rotation
		[1, 1, 0],
        [0, 0, 0]
		 
	],
	[
		[0, 1, 0], // 2nd rotation
		[0, 1, 1], 
		[0, 0, 1]
	],
	[
		[0, 0, 0], // 3rd rotation
		[0, 1, 1], 
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],// 4th rotation
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0], 
		[1, 1, 1],// 1st rotation
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],// 2nd rotation
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],// 3rd rotation
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],// 4th rotation
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],// 1st rotation
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1], // 2nd rotation
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0], // 3rd rotation
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0], // 4th rotation
		[1, 0, 0]
	]
];




const PIECES = [
  [Z, 'red'],    // Red
  [S, 'green'],  // Green
  [T, 'yellow'], // Yellow
  [O, 'blue'],   // Blue
  [L, 'purple'], // Purple
  [I, 'cyan'],   // Cyan
  [J, 'orange']  // Orange
];





class Piece {
  constructor(tetromino, color) {
      this.tetromino = tetromino;
      this.color = color;
      this.tetrominoN = 0; // starts from the first rotation
      this.activeTetromino = this.tetromino[this.tetrominoN]; // current tetromino
      this.x = 3;
      this.y = -2;
      this.previewBoard = Array.from({ length: minirow }, () => Array(minicol).fill(VACANT));
  }

  updatePreviewBoard() {
    // Clear the mini board first
    for (let r = 0; r < minirow; r++) {
      for (let c = 0; c < minicol; c++) {
        miniBoard[r][c] = VACANT;
      }
    }
    // Update the mini board based on the active tetromino
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
        if (this.activeTetromino[r][c]) {
          miniBoard[r][c] = this.color;
        }
      }
    }
    renderPreviewBoard(); // Render the updated preview board
  }



fill(color) {
  for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
          if (this.activeTetromino[r][c]) {
              drawSquare(this.x + c, this.y + r, color);
          }
      }
  }
}


fillMini(color) {
  for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
          if (this.activeTetromino[r][c]) {
              drawSquareMini(c, r, color);
          }
      }
  }
}
calculateShadow() {
  let shadowY = this.y;
  while (!this.collision(0, shadowY - this.y, this.activeTetromino) && shadowY < ROW) {
    shadowY++;
  }
  return shadowY - 1;
}

  // Draw the shadow
  drawShadow() {
    let shadowY = this.calculateShadow();
    this.fillShadow('rgba(0, 0, 0, 0.5)', shadowY);

  }
  fillShadow(color, shadowY) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino[r].length; c++) {
        if (this.activeTetromino[r][c]) {
          drawSquare(this.x + c, shadowY + r, 'white', 0.3,0.3); // 2px white border
          drawSquare(this.x + c, shadowY + r, color,0.3);
        }
      }
    }
  }
    // Clear the previous shadow
    unDrawShadow() {
      let shadowY = this.calculateShadow();
      this.fillShadow(VACANT, shadowY);
    }
  
    draw() {
      this.drawShadow(); // Draw the shadow first
      
      this.fill(this.color);
    }
    unDraw() {
      this.unDrawShadow(); // Draw the shadow first
      this.fill(VACANT);
    }
    drawMini() {
      this.fillMini(this.color);
    }
    unDrawMini() {
      this.fillMini(VACANT);
    }
    hardDrop() {
      if (isPaused) return;
      // renderBoard();
      // renderPreviewBoard();
      while (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        renderBoard();
        this.y++;
    this.draw();
  }
  this.lock();
  playSound(hardDropSound)
  stopSound(moveSound);
}
moveDown() {
  if (isPaused) return;
  if (!this.collision(0, 1, this.activeTetromino)) {
      this.unDraw();
      renderBoard();
      this.y++;
      // this.deltaY = 0;
      this.draw();
      
      // playSound(moveSound);
  } else {
      this.lock();
      p = randomPiece();
  }
  playSound(moveSound);
}
moveRight() {
  if (isPaused) return;
if (!this.collision(1, 0, this.activeTetromino)) {
  this.unDraw();
  renderBoard();
  this.x++;
  this.draw();
}
playSound(moveSound);
}
moveLeft() {
  if (isPaused) return;
if (!this.collision(-1, 0, this.activeTetromino)) {
  this.unDraw();
  renderBoard();
  this.x--;
  this.draw();
}
playSound(moveSound);
}
rotate() {
  if (isPaused) return;
let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
let kick = 0;
if (this.collision(0, 0, nextPattern)) {
  if (this.x > COL / 2) {
      kick = -1; //  move the piece to the left
  } else {
      kick = 1; // move the piece to the right
  }
}
if (!this.collision(kick, 0, nextPattern)) {
  this.unDraw();
  renderBoard();
  this.x += kick;
  this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
  this.activeTetromino = nextPattern;
  this.draw();
}
playSound(rotateSound);
stopSound(moveSound)
}
lock() {
  for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
          if (!this.activeTetromino[r][c]) {
              continue;
          }
          if (this.y + r < 0) {
            
            showGameOver();
              return;
          }
          // board[Math.floor(this.y) + Math.floor(r)][Math.floor(this.x) + Math.floor(c)] = this.color;
          board[this.y +r][this.x + c] = this.color;
        }

  }

  // Clear full rows
  for (let r = 0; r < ROW; r++) {
      let isRowFull = true;
      for (let c = 0; c < COL; c++) {
          isRowFull = isRowFull && (board[r][c] != VACANT);
      }

      if (isRowFull) {


          for (let y = r; y > 1; y--) {
              for (let c = 0; c < COL; c++) {
                  board[y][c] = board[y - 1][c];
              }
          }
          for (let c = 0; c < COL; c++) {
              board[0][c] = VACANT;
          }
          playSound(clearSound)
        // //           // Find the x coordinate of the top-left corner of the cleared row
        // let x = 0;
        // for (; x < COL; x++) {
        //   if (board[r][x] == VACANT) {
        //     break;
        //   }
        // }
        // createParticleEffect(0, r * SQ, COL * SQ);
          updateScore(10);
      }
  }
  renderBoard();
  p = nextPiece;
  nextPiece = randomPiece();
  p.updatePreviewBoard();
  nextPiece.updatePreviewBoard();
}

collision(x, y, piece) {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece.length; c++) {
        if (!piece[r][c]) {
            continue;
        }
        let newX = this.x + c + x;
        let newY = this.y + r + y;
  
        if (newX < 0 || newX >= COL || newY >= ROW) {
            return true;
        }
        if (newY < 0) {
            continue;
        }
        if (board[newY][newX] != VACANT){
          // if (board[Math.floor(newY)][Math.floor(newX)] != VACANT) {
            return true;
        }
    }
  }
  return false;
  }
  }


  // The Sound Effects
const moveSound = new Audio('assets/audios/fallingdown.mp3');

const rotateSound = new Audio('assets/audios/fallingdown.mp3');
// const rotateSound = new Audio('assets/audios/rotate.wav');
const clearSound = new Audio('assets/audios/linecleard.mp3');
const gameOverSound = new Audio('assets/audios/game-over.mp3');
const startSound = new Audio('assets/audios/play.mp3');
const levelSound = new Audio('assets/audios/next-level.mp3');
// const hardDropSound = new Audio('assets/audios/block-fall.flac');
const hardDropSound = new Audio('assets/audios/drop.wav');
const selectSound = new Audio('assets/audios/select.wav');


playSound(hardDropSound)
// Play Sound Effect
function playSound(sound) {
  
  startSound.play(sound);
  if (gameStarted && !isPaused){
    sound.currentTime = 0;
    sound.play();
  }
}


function stopSound(sound) {
  sound.stop();
}
// Keyboard event listeners



window.addEventListener('keydown', (event) => {
  if (!gameStarted) return; // Ignore input if the game is not started or paused

  if (event.key === 'ArrowLeft') {
      p.moveLeft();
      // dropStart = Date.now(); // reset drop timer
  } else if (event.key === 'ArrowRight') {
      p.moveRight();
      // dropStart = Date.now(); // reset drop timer
  } else if (event.key === 'ArrowUp') {
      p.rotate();
      // dropStart = Date.now(); // reset drop timer
  } else if (event.key === 'ArrowDown') {
      p.moveDown();
        //  dropStart = Date.now();
  }
    else if (event.key === 'p') {
    togglePause(); // Toggle pause on 'p' key press
}
else if (event.key === ' ') {
  p.hardDrop();
}

}
);


  

  function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
  }
  
// Function to start the game
function startGame() {
  // Hide the start button and its text
  startButton.hide();
  buttonText.hide();
  // playSound(startSound)
  layer.draw(); // Redraw the layer to reflect the changes
  gameStarted = true; // Set gameStarted to true
  p.drawMini(); // Draw the initial preview piece
  nextPiece.updatePreviewBoard();
  dropStart = Date.now(); // Initialize the drop timer
  dropAnimation = requestAnimationFrame(drop); // Start the game loop
}

// Start button event listener
startButton.on('click', () => {
  // playSound(selectSound)
  startGame(); // Start the game when the start button is clicked
});

// Drop function
function drop() {
  if (!isPaused){
  p.updatePreviewBoard();
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > downspeed) {
    // if (!p.collision(0, 1, p.activeTetromino)) {
    // smooth();
    // console.log("Dropping");
    p.moveDown();
    
    dropStart = Date.now();
  // }
}
// else {
//   p.lock();
//   p = randomPiece();
// }

  dropAnimation = requestAnimationFrame(drop); // Continue the game loop
}
}
function smooth (){
  for (let i = 0; i < 60; i++) {
                          p.unDraw();
                          renderBoard();
                          p.y += speed * timeStep;
                          if (checkLandedCollisions(p)) {
                              // If a collision is detected, stop the smooth animation
                              break;
                            }
                          p.draw();
                          p.updatePreviewBoard();
                          
              }
          }
          function checkLandedCollisions(piece) {
              // Iterate through all landed tetrominos on the board
              for (let r = 0; r < ROW; r++) {
                for (let c = 0; c < COL; c++) {
                  if (board[r][c] !== VACANT) {
                    // Check if the piece collides with the landed tetromino
                    if (piece.collision(0, 0, board[r][c])) {
                      return true;
                    }
                  }
                }
              }
              return false;
            }

// Initialize game variables
let p = randomPiece();
p.drawMini(); // Drawing the random piece on the mini board
let nextPiece = randomPiece();
nextPiece.updatePreviewBoard();
let dropStart = Date.now();
let dropAnimation;
let downspeed = 500;
let speed = 0.5;
let timeStep=1/60;
  

  

  
  
  