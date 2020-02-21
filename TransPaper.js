
let gX, gY, gL, gD, gW, gC, gBG, bigR, rMode, rStart, animLength

function preload() {
  
}

function setup(){
  gX = document.documentElement.clientWidth
  gY = document.documentElement.clientHeight
  createCanvas(gX, gY)
  gL = 110   // length of spires
  gD = 400  // diameter of main circle
  gW = 5   // width of lines
  gC = color(200, 200, 200) // color of Symbol
  gBG = color(0, 60, 60) // background fill color
  bigR = 0  // Rotate Symbol with this
  animLength = 600 // Length of timely animation in frames, do not set <60
}


function draw() {
  background(gBG)
  if( minute() % 1 == 0 && !rMode && second() == 0 ){
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
  fill(gC)
  noStroke()
  circle(gX/2, gY/2, gD)
  fill(gBG)
  circle(gX/2, gY/2, gD-(gW*2))
  color(gC)
  stroke(gC)
  // bigR = map(mouseX, 0, gX, 0, PI*2)  // React Symbol to mouse
  var fPos = bigR
  f(fPos, gL, gW, gX/2 + cos(fPos)*(gD/2), gY/2+ sin(fPos)*(gD/2))
  var mPos = fPos + PI / 1.5
  m(mPos, gL, gW, gX/2 + cos(mPos)*(gD/2), gY/2+ sin(mPos)*(gD/2))
  var bPos = fPos + PI * 4/3
  b(bPos, gL, gW, gX/2 + cos(bPos)*(gD/2), gY/2+ sin(bPos)*(gD/2))
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
  f(orient, l, w, x, y, .3)
}