// 플레이어 상태값
let playerState = "fall";

const dropdown = document.querySelector("#animations");
dropdown.addEventListener("change", e => {
  playerState = e.target.value;
});

/** @type { HTMLCanvasElement } */
const canvas = document.querySelector("#canvas1");

/** @type { CanvasRenderingContext2D } */
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";

// 원본 이미지 크기상의 1개 이미지 width
const spriteWidth = 575;
// 원본 이미지 크기상의 1개 이미지 height
const spriteHeight = 523;

// requestAnimationFrame() 호출마다 1씩 증가하는 값 (1초에 약 60 증가)
let gameFrame = 0;

// 다음 이미지로 바꿀 Frame 단위
const staggerFrames = 5;

// 애니메이션을 위한 분할된 이미지 정보 (draw() 에서 사용함)
const spriteAnimations = {};

// 애니메이션 종류(name) 에 대한 정보
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "gethit",
    frames: 4,
  },
];

// spriteAnimations 초기화
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;

    frames.loc.push({
      x: positionX,
      y: positionY,
    });
  }

  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // const position = Math.floor(gameFrame / staggerFrames) % 6;
  const position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;

  // frameX = spriteWidth * position;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  
  ctx.drawImage(
    playerImage, 
    frameX, frameY, 
    spriteWidth, spriteHeight,
    0, 0, 
    spriteWidth, spriteHeight
  );

  // if (gameFrame % staggerFrames === 0) {
  //   if (frameX < 6) frameX++;
  //   else frameX = 0;
  // }
  
  gameFrame++;
  window.requestAnimationFrame(animate);
}
animate();