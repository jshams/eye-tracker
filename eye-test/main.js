// const xpos = document.getElementById("xpos");
// const ypos =document.getElementById("ypos");


// let x = 0;
// let y = 0;
// let horSlope = 18;
// let verSlope = 36;
//
//
// function mmove() {
//   setInterval(function(){
//     x += horSlope;
//     y += verSlope;
//     bOne.style.left = x + 'px';
//     bOne.style.top = y + 'px';
//     xpos.innerHTML = "Position x: " + x;
//     ypos.innerHTML = "Position y: " +y;
//     if (y >= 720 || y == 0) {
//       verSlope = -verSlope;
//     };
//     if (x >= 1080 || x == 0) {
//       horSlope = -horSlope;
//     }
//   }, 3000);
// }
//
// mmove();




// class Ball {
//   constructor(xPos, yPos, slope, speed){
//     this.xPos = xPos;
//     this.yPos = yPos;
//     this.slope = slope;
//     this.speed = speed;
//     this.xDisplacement = 1;
//     this.yDisplacement = 0;
//     this.style.width = '60px';
//     this.style.height = '60px';
//     this.style.borderRadius = '50px';
//     this.style.backgroundColor = "black";
//     this.style.position = "relative";
//     this.style.left = '0';
//     this.style.top = '0';
//   }

var bOne = document.getElementById("bOne");
bOne.xPos = 360;
bOne.yPos = 320;
bOne.slope = 0;
// bOne.speed = speed;
bOne.xDisplacement = 1;
bOne.yDisplacement = 0;
bOne.style.width = '60px';
bOne.style.height = '60px';
bOne.style.borderRadius = '50px';
bOne.style.backgroundColor = "black";
// bOne.style.position = "relative";
bOne.style.left = '360px';
bOne.style.top = '360px';

var bTwo = document.getElementById("bTwo");
bTwo.xPos = 720;
bTwo.yPos = 360;
bTwo.slope = 180;
// bTwo.speed = speed;
bTwo.xDisplacement = -1;
bTwo.yDisplacement = 0;
bTwo.style.width = '60px';
bTwo.style.height = '60px';
bTwo.style.borderRadius = '50px';
bTwo.style.backgroundColor = "black";
// bTwo.style.position = "relative";
bTwo.style.left = '720px';
bTwo.style.top = '360px';


function updateDisplacement(self) {
  // Takes slope from degrees and sets an x and y displacement
  while (self.slope >= 360) {
    self.slope -= 360;
  }
  while (self.slope < 0) {
    self.slope += 360;
  }
  if (self.slope == 0) {
    self.xDisplacement = 1;
    self.yDisplacement = 0;
  }
  else if (self.slope == 90) {
    self.xDisplacement = 0;
    self.yDisplacement = 1;
  }
  else if (self.slope == 180) {
    self.xDisplacement = -1;
    self.yDisplacement = 0;
  }
  else if (self.slope == 270) {
    self.xDisplacement = 0;
    self.yDisplacement = -1;
  }
  else if (self.slope < 90){
    self.xDisplacement = 1;
    self.yDisplacement = Math.tan(self.slope * Math.PI/180);
    console.log("moving right");
    // self.yDisplacement = Math.floor(self.yDisplacement * 100) / 100
  }
  else if (self.slope < 180) {
    console.log("moving left");
    self.xDisplacement = -1;
    self.yDisplacement = Math.tan(self.slope * Math.PI/180);
    // self.yDisplacement = Math.floor(self.yDisplacement * 100) / 100
  }
  else if (self.slope < 270) {
    console.log("moving left");
    self.xDisplacement = -1;
    self.yDisplacement = -Math.tan(self.slope * Math.PI/180);
    // self.yDisplacement = Math.floor(self.yDisplacement * 100) / 100
  }
  else {
    console.log("moving right");
    self.xDisplacement = 1;
    self.yDisplacement = -Math.tan(self.slope * Math.PI/180);
    // self.yDisplacement = Math.floor(self.yDisplacement * 100) / 100
  }
}

function move(self) {
    self.xPos += self.xDisplacement;
    self.yPos += self.yDisplacement;
    self.style.left = self.xPos + 'px';
    self.style.top = self.yPos + 'px';
    if (self.yPos >= 720 || self.yPos <= 0) {
      self.yDisplacement = -self.yDisplacement;
    };
    if (self.xPos >= 1080 || self.xPos <= 0) {
      self.xDisplacement = -self.xDisplacement;
      if (self.xPos >= 1080) {
        self.xPos = 1080;
      }
      else {
        self.xPos = 0;
      }
    }
}

function moveTwo(self) {
    self.xPos += self.xDisplacement;
    self.yPos += self.yDisplacement;
    self.style.left = self.xPos-60 + 'px';
    self.style.top = self.yPos + 'px';
    if (self.yPos >= 720 || self.yPos <= 0) {
      self.yDisplacement = -self.yDisplacement;
    };
    if (self.xPos >= 1080 || self.xPos <= 0) {
      self.xDisplacement = -self.xDisplacement;
      if (self.xPos >= 1080) {
        self.xPos = 1080;
      }
      else {
        self.xPos = 0;
      }
    }
}


function interraction(self, otherBall) {
  // checks if another ball is in contact with itself
  if (Math.sqrt(Math.pow(self.xPos - otherBall.xPos, 2)+Math.pow(self.yPos - otherBall.yPos, 2)) <= 60) {
    //We take the x difference and y difference to check contact point
    const xDif = self.xPos - otherBall.xPos;
    const yDif = self.yPos - otherBall.yPos;
    var contactPoint = 0;
    if (xDif < 0) {
      // will hit the right side of ball
      contactPoint = Math.atan(yDif/xDif) * 180/Math.PI;
      // contactPoint = Math.floor(contactPoint * 100) / 100
      if (contactPoint < 0) {
        contactPoint += 360;
      }
    }
    else if (xDif > 0) {
      // will hit the left side of the ball
      contactPoint = Math.atan(yDif/xDif) * 180/Math.PI + 180;
      // contactPoint = Math.floor(contactPoint * 100) / 100
    }
    else {
      // balls have the same x displacement
      if (yDif < 0) {
        contactPoint = 90;
      }
      else {
        contactPoint = 270;
      }
    }
    console.log("contact point: " + contactPoint)
    console.log("slope before: " + self.slope)

    if (self.slope > contactPoint) {
      self.slope = self.slope + 180 - 2 * Math.abs(self.slope - contactPoint);
      // self.slope = Math.floor(self.slope)
    }
    else if (self.slope < contactPoint) {
      self.slope = self.slope - 180 - 2 * Math.abs(self.slope - contactPoint);
      // self.slope = Math.floor(self.slope)
    }
    else {
      //if slope is equal to contact point
      self.slope = self.slope + 180;
    }
    console.log("slope after: " + self.slope);
    updateDisplacement(self);
    console.log("interraction");
    return true;
  }
}



updateDisplacement(bOne);
updateDisplacement(bTwo);

var x = 0;

var stop = setInterval(function() {
  move(bOne)
  moveTwo(bTwo)
  if (interraction(bOne, bTwo)) {
    interraction(bTwo, bOne);
  }
  x += 1;
  if (x == 30000) {
    clearInterval(stop);
  }
}, 1);
