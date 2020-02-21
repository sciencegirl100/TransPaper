
let gX, gY, gL, gD, gW, gC, gBG, bigR, rMode, rStart, animLength, moduloMinute, drawGBSym, startShift, shiftTime, shiftStart, shiftEnd

function preload() {
  
}

function setup(){
  gX = document.documentElement.clientWidth
  gY = document.documentElement.clientHeight
  startShift = true
  createCanvas(gX, gY)
  gL = 100   // length of spires
  gD = 250  // diameter of main circle
  gW = 16   // width of lines
  gC = color(0, 0, 0) // color of Symbol
  gBG = color(0, 60, 60) // background fill color
  bigR = 0  // Rotate Symbol with this
  animLength = 600 // Length of timely animation in frames, do not set <60
  moduloMinute = 15 // Minutes to rotate at (15: every quarter-hour, 5: every 5 mins, 2: even number minutes, 1: every minute)
  drawGBSym = false  // Draw Background symbol?
  shiftTime = 5000 // Hue shift time in milliseconds
}

function draw() {
  wallpaper()
  symbol()
}

function m(orient, l, w, x, y){
  // >
  let hookLen = l * .4
  strokeWeight(w)
  let endPoint = [x+ (cos(orient) * l), y+ (sin(orient)*l)]
  line(x,y, endPoint[0], endPoint[1])

  line(endPoint[0], endPoint[1], endPoint[0] - (cos(orient+PI/4)*hookLen), endPoint[1] - (sin(orient+PI/4)*hookLen))
  line(endPoint[0], endPoint[1], endPoint[0] - (cos(orient-PI/4)*hookLen), endPoint[1] - (sin(orient-PI/4)*hookLen))
}

function f(orient, l, w, x, y, crossPoint = .75){
  // +
  crossPoint = crossPoint * l
  let crossLen = l*.25
  strokeWeight(w)
  line(x,y, x+ (cos(orient) * l), y+ (sin(orient)*l))
  let cenPoint = [x+(cos(orient) * crossPoint), y+(sin(orient)*crossPoint)]
  line(cenPoint[0], cenPoint[1], cenPoint[0] + (cos(orient + (PI/2))*crossLen), cenPoint[1] + (sin(orient+(PI/2))*crossLen))
  line(cenPoint[0], cenPoint[1], cenPoint[0] - (cos(orient + (PI/2))*crossLen), cenPoint[1] - (sin(orient+(PI/2))*crossLen))
  //line(x+(cos(orient)*(w/2)), y+(sin(orient)*(w/2)), x-(cos(orient)*(w/2)), y-(sin(orient)*(w/2)))
}

function b(orient, l, w, x, y){
  // +>
  m(orient, l, w, x, y)
  f(orient, l, w, x, y, .35)
}

function wallpaper(){
  background(gBG)
  noStroke()
  fill(85, 205, 252)
  rect(0, 0, gX/3, gY)
  
  fill(255, 255, 255)
  rect(gX/3, 0, 2*(gX/3), gY)
  
  fill(247, 168, 184)
  rect(2*(gX/3), 0, gX, gY)
  
}

function symbol(){
  if( minute() % moduloMinute == 0 && !rMode && second() == 0 ){
    rMode = true
    rStart = frameCount
    console.log("GoGo Gadget SPINNY")
  }
  if(rMode){
    bigR = map(frameCount, rStart, rStart + animLength, 0, PI)
    bigR = (cos(bigR) + 1) * PI
    if (frameCount >= rStart + animLength){
      rMode = false
      bigR = 0
    }
  }
  if (drawGBSym){
    noFill()
    stroke(0)
    strokeWeight(gW+8)
    circle(gX/2, gY/2, gD)
    var fPos = bigR + radians(-30)
    m(fPos, gL, gW, gX/2 + cos(fPos)*(gD/2), gY/2+ sin(fPos)*(gD/2))
    var mPos = fPos + PI / 1.5
    f(mPos, gL, gW, gX/2 + cos(mPos)*(gD/2), gY/2+ sin(mPos)*(gD/2))
    var bPos = fPos + PI * 4/3
    b(bPos, gL, gW, gX/2 + cos(bPos)*(gD/2), gY/2+ sin(bPos)*(gD/2))
  }
  colorMode(HSB, 255, 255, 255)
  noFill()
  if(startShift){
    shiftStart = millis()
    shiftEnd = shiftStart + shiftTime
    startShift = false
  }
  if(millis() >= shiftEnd){
    startShift = true
  }
  stroke(map(millis(), shiftStart, shiftEnd, 0, 255), 230, 255/2)
  strokeWeight(gW)
  circle(gX/2, gY/2, gD)
  var fPos = bigR + radians(-30)
  m(fPos, gL, gW, gX/2 + cos(fPos)*(gD/2), gY/2+ sin(fPos)*(gD/2))
  var mPos = fPos + PI / 1.5
  f(mPos, gL, gW, gX/2 + cos(mPos)*(gD/2), gY/2+ sin(mPos)*(gD/2))
  var bPos = fPos + PI * 4/3
  b(bPos, gL, gW, gX/2 + cos(bPos)*(gD/2), gY/2+ sin(bPos)*(gD/2))
  colorMode(RGB, 255, 255, 255)
}