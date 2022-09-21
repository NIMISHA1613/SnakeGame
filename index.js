var s;
var scl = 20;
var food;
var bigFood;
var score = 0;

function setup() {
  createCanvas(
    windowWidth - (windowWidth % scl),
    windowHeight - (windowHeight % scl)
  );
  s = new Snake();
  frameRate(15);
  food = pickLocation();
  bigFood = pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl) - 1;
  var rows = floor(height / scl) - 1;
  let foodNew = createVector(floor(random(cols)) + 1, floor(random(rows)) + 1);
  foodNew.mult(scl);
  return foodNew;
}

function draw() {
  background(0);
  if (s.die()) {
    var message = document.getElementById("message");
    score = document.getElementById("score").innerHTML = score;
    message.style.display = "block";
    frameRate(5);
    setTimeout(() => {
      message.style.display = "none";
      document.getElementById("defaultCanvas0").style.filter = "none";
      location.reload();
    }, 2000);
  }
  s.update();
  s.show();

  if (s.eat(food)) {
    score = document.getElementById("score").innerHTML = score + 5;
    food = pickLocation();
  }

  if (s.eat(bigFood)) {
    score = document.getElementById("score").innerHTML = score + 10;
    bigFood = pickLocation();
  }

  fill(0, 255, 255);
  ellipse(food.x, food.y, scl, scl);
  fill(255, 192, 203);
  ellipse(bigFood.x, bigFood.y, 1.5 * scl, 1.5 * scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode == RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode == LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function windowResized() {
  resizeCanvas(
    windowWidth - (windowWidth % scl),
    windowHeight - (windowHeight % scl)
  );
  food = pickLocation();
  bigFood = pickLocation();
}
