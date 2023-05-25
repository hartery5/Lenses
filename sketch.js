let L;
let O;
let I;
let mouseState;
let tex;

let focalSelect;
let typeSelect;
let virtualSelect;
let imageSelect;
let incidentSelect;
let outgoingSelect;
let gridSelect;
let principleSelect;
let allSelect;
let focusSelect;
let zoomSelect;
let triangle1Select;
let triangle2Select;
let button;


let showTriangle1;
let showTriangle2;
let showVirtual;
let showPrinciple;
let showAll;
let showFocus;
let showZoom;
let showImage;

let mouseCounter = 0;

function setup() {
  textFont("Courier New");
  textStyle(BOLD);
  textSize(18);
  createCanvas(windowWidth, 400);
  L = new lens(width/2, 60);
  O = new object(width/2-240, 120, 'O');
  s = L.x-O.x;
  sp = 1/(1/L.f-1/s);
  hp = -O.h*sp/s;
  I = new object(sp+width/2, hp, 'I');
  
  focalSelect = createSelect();
  focalSelect.option('Converging');
  focalSelect.option('Diverging');
  focalSelect.selected('Converging');
  focalSelect.style('font-family','monospace')
  focalSelect.style('font-weight','bold')
  
  typeSelect = createSelect();
  typeSelect.option('Lens');
  typeSelect.option('Mirror');
  typeSelect.style('font-family','monospace')
  typeSelect.style('font-weight','bold')
  
  allSelect = createCheckbox('Show All');
  allSelect.style('font-family', 'monospace');
  allSelect.style('font-weight', 'bold');
  
  focusSelect = createCheckbox('Show Focused');
  focusSelect.style('font-family', 'monospace');
  focusSelect.style('font-weight', 'bold');
  
  zoomSelect = createCheckbox('Show Zoomed');
  zoomSelect.style('font-family', 'monospace');
  zoomSelect.style('font-weight', 'bold');
  
  
  principleSelect = createCheckbox('Show Principal');
  principleSelect.style('font-family', 'monospace');
  principleSelect.style('font-weight', 'bold');
  
  virtualSelect = createCheckbox('Show Virtual');
  virtualSelect.style('font-family','monospace')
  virtualSelect.style('font-weight','bold')
  
  imageSelect = createCheckbox('Show Image');
  imageSelect.style('font-family','monospace')
  imageSelect.style('font-weight','bold')
  
  gridSelect = createCheckbox('Show Grid Lines');
  gridSelect.style('font-family','monospace')
  gridSelect.style('font-weight','bold')
  
  triangle1Select = createCheckbox('Show Triangle 1');
  triangle1Select.style('font-family','monospace');
  triangle1Select.style('font-weight','bold');
  
  triangle2Select = createCheckbox('Show Triangle 2');
  triangle2Select.style('font-family','monospace');
  triangle2Select.style('font-weight','bold');
  
}

function draw() {
  mouseState = false;
  showVirtual = virtualSelect.checked();
  showPrinciple = principleSelect.checked();
  showAll = allSelect.checked();
  showFocus = focusSelect.checked();
  showZoom = zoomSelect.checked();
  showImage = imageSelect.checked();
  showTriangle1 = triangle1Select.checked();
  showTriangle2 = triangle2Select.checked();
  
  if (focalSelect.selected() == 'Diverging') {
    L.f = -1.0*abs(L.f);
  } else {
    L.f = abs(L.f);
  }
  
  if (typeSelect.selected() == 'Mirror') {
    L.l = -1;
  } else {
    L.l = 1;
  }
  
  // Refresh Background
  background(220);
  if (!showZoom){
    //mouseCounter = 0;
    if (gridSelect.checked()){
      drawGridLines();
    }

    if (showAll){
      drawRays();
    }

    // "Thin Lens"
    updateImage();
    
    // Draw Lens, Object, Image. Only L and I modify mousestate.
    mouseState |= L.draw();
    
    if (showTriangle1){
      push();
      noStroke();
      fill(80,200,120);
      triangle(O.x,height/2,O.x,height/2-O.h,L.x,height/2);
      pop();
      
      push();
      noStroke();
      fill(120,160,120);
      triangle(I.x,height/2,I.x,height/2-I.h,L.x,height/2);
      pop();
      
      push();
      noFill();
      stroke(0);
      strokeWeight(2);
      let angle = atan2(O.h,L.x-O.x);
      arc(L.x,height/2,60,60,0,angle,OPEN);
      arc(L.x,height/2,60,60,PI,PI+angle,OPEN);
      line(O.x+20,height/2,O.x+20,height/2-15);
      line(O.x,height/2-15,O.x+20,height/2-15);
      line(I.x-20,height/2,I.x-20,height/2+15);
      line(I.x,height/2+15,I.x-20,height/2+15);
      angle = PI/2-angle;
      
      arc(O.x,height/2-O.h,60,60,PI/2-angle,PI/2,OPEN);
      arc(O.x,height/2-O.h,80,80,PI/2-angle,PI/2,OPEN);
      arc(I.x,height/2-I.h,60,60,3*PI/2-angle,3*PI/2,OPEN);
      arc(I.x,height/2-I.h,80,80,3*PI/2-angle,3*PI/2,OPEN);
      
      pop();
    }
    
    if (showTriangle2){
      push();
      noStroke();
      fill(80,200,120);
      triangle(O.x,height/2-O.h,L.x,height/2-O.h,L.x,height/2-I.h);
      fill(120,160,120);
      triangle(L.x-L.f,height/2,L.x,height/2,L.x,height/2-I.h);
      pop();
      
      let angle = abs(atan2(I.h,L.f));
      push();
      noFill();
      stroke(0);
      strokeWeight(2);
      arc(O.x,height/2-O.h,60,60,0,angle,OPEN);
      arc(L.x-L.f,height/2,60,60,0,angle,OPEN);
      
      angle = PI/2-angle;
      arc(L.x,height/2-I.h,60,60,3*PI/2-angle,3*PI/2,OPEN);
      arc(L.x,height/2-I.h,80,80,3*PI/2-angle,3*PI/2,OPEN);
      
      line(L.x-20,height/2-O.h,L.x-20,height/2-O.h+20);
      line(L.x-20,height/2-O.h+20,L.x,height/2-O.h+20);
      
      line(L.x-20,height/2,L.x-20,height/2+20);
      line(L.x-20,height/2+20,L.x,height/2+20);
      
      
      pop();
      
      
      
    }



      // Geometry
    if (!showAll){
      drawRays();
    }
    mouseState |= O.draw();



    if (imageSelect.checked()){
      I.draw();
    }
  } else {
    
    mouseState |= O.draw();
    
    push();
    fill(0,100,100);
    stroke(0, 100, 100);
    let dia = height;
    let rad = dia/2;
    let eps = 1.0;
    arc(L.x+rad*cos(eps),height/2,dia,dia,PI-eps,PI+eps,CHORD);
    
    arc(L.x-rad*cos(eps),height/2,dia,dia,-1*eps,eps,CHORD);
    pop();
    
    if (mouseCounter>3){
      push();
      noFill();
      stroke(0);
      circle(L.x-rad*cos(eps),height/2,dia);
      fill(0);
      circle(L.x-rad*cos(eps),height/2,5);
      pop()
    }
    
    
    if (mouseCounter>1){
      push();
      noFill();
      circle(L.x+rad*cos(eps),height/2,dia);
      fill(0)
      stroke(0);
      circle(L.x+rad*cos(eps),height/2,5);
      pop();
    }

    
    // circle intersection
    
    px1 = L.x+rad*cos(eps);
    py1 = height/2-O.h;
    px2 = O.x
    py2 = height/2-O.h;
    cx = L.x+rad*cos(eps);
    cy = height/2;
    //line(px1,py1,px2,py2)
    let p1 = createVector(px1,py1);
    let q1 = createVector(px2,py2);
    let c1 = createVector(cx,cy);
    let collision1 = findCircleLineIntersections(p1,q1,c1,rad,false);
    //print(intersections);
    px1 = O.x;
    px2 = collision1.x;
    // normal axis 1
    py1 = height/2-O.h;
    py2 = collision1.y;
    t = -200;
    
    if (mouseCounter>0){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      line(px1,py1,px2,py2);
      pop();
    }
    
    
    //line(cx,cy,px2,py2);
    t = 200;
    px3 = (1-t)*cx + t*px2;
    py3 = (1-t)*cy + t*py2;
    if (mouseCounter>1){
      push();
      strokeWeight(2);
      stroke(0)
      setLineDash([5, 5]);
      line(cx,cy,px3,py3);
      pop();
    }
    
    V = createVector(px3-cx,py3-cy);
    Q = createVector(px2-px1,py2-py1);
    theta_i = abs(p5.Vector.angleBetween(Q,V));
    theta_r = asin(sin(theta_i)/1.5);
    
    R = p5.Vector.rotate(V,-theta_r);
    px1 = collision1.x;
    py1 = collision1.y;
    px2 = px1 - R.x;
    py2 = py1 - R.y;
    //line(px1,py1,px2,py2);
    
    cx = L.x-rad*cos(eps);
    cy = height/2;
    p1 = createVector(px1,py1);
    q1 = createVector(px2,py2);
    c = createVector(cx,cy);
    let collision2 = findCircleLineIntersections(p1,q1,c,rad,false);
    px1 = collision1.x;
    px2 = collision2.x;
    // normal axis 1
    py1 = collision1.y;
    py2 = collision2.y;
    
    if (mouseCounter>2){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      line(px1,py1,px2,py2);
      pop();
    }
    
    t = 200;
    px3 = (1-t)*cx + t*px2;
    py3 = (1-t)*cy + t*py2;
    if (mouseCounter>3){
      push();
      strokeWeight(2);
      stroke(0)
      setLineDash([5, 5]);
      line(cx,cy,px3,py3);
      pop();
    }
    
    V = createVector(px3-cx,py3-cy);
    Q = createVector(px2-px1,py2-py1);
    theta_i = abs(p5.Vector.angleBetween(Q,V));
    theta_r = asin(1.5*sin(theta_i));
    
    R = p5.Vector.rotate(V,theta_r);
    px1 = collision2.x;
    py1 = collision2.y;
    px2 = px1 + R.x;
    py2 = py1 + R.y;
    
    if (mouseCounter>4){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      line(px1,py1,px2,py2);
      pop();
    }
    
    let n = 1.5
    let R1 = rad;
    let R2 = -1.0*rad;
    let d = 2*rad*cos(eps);
    
    
    let f = 1.0/((n-1)*(1/R1-1/R2+(n-1)*d/(n*R1*R2)));
    
    if (mouseCounter>5){
      push();
      fill(0);
      stroke(0);
      circle(L.x+f,height/2,5);
      noStroke();
      text('F',L.x+abs(f),height/2+20);
      pop();
    }
    
  }
  
  push();
  strokeWeight(2);
  setLineDash([5, 5]);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();
  

  textFont("Courier New");
  textStyle(BOLD);
  text('Optical Axis',width-135,height/2-10);
  //text(mouseCounter, width-90,height/2+30);
  
  

  if (showAll){
    push();
    fill(220);
    noStroke();
    rect(0, 3*height/4, 3*L.x/4, height/4);
    pop();
  
    push();
    textSize(14);
    fill(0);
    noStroke()
    text('Self-luminous, or "perfectly-lit",',10,3*height/4+15);
    text('objects emanate or relect light',10,3*height/4+30);
    text('rays in all directions.',10,3*height/4+45);
    text('A converging lens focusses rays', 10, 3*height/4+65);
    text('to a unique point, forming a real',10,3*height/4+80);
    text('image.',10,3*height/4+95);
    pop();
  }
  
  if (showFocus){
    push();
    fill(220);
    noStroke();
    rect(0, 3*height/4, 3*L.x/4, height/4);
    pop();
  
    
    push();
    textSize(14);
    fill(0);
    noStroke();
    text('A screen placed at the convergence', 10, 3*height/4+15);
    text('of the rays will display an image.', 10, 3*height/4+30);
    
    text('Since light travels in straight', 10,3*height/4+50);
    text('lines, only the rays which strike', 10,3*height/4+65);
    text('the lens will help form the image.',10,3*height/4+80);
    pop();
  }
  
  if (showZoom){
    if (mouseCounter<2){
      push();
      fill(220);
      noStroke();
      rect(0, 3*height/4, 3*L.x/4, height/4);
      pop();


      push();
      textSize(14);
      fill(0);
      noStroke();
      text("Our goal is to reduce the number", 10, 3*height/4+15);
      text('of rays we need to consider.', 10, 3*height/4+30);
      text("Let's first consider a ray parallel", 10, 3*height/4+50);
      text("to the optical axis.", 10, 3*height/4+65);
      pop();
    }
    if (mouseCounter==2){
      push();
      fill(220);
      noStroke();
      rect(0, 3*height/4, 3*L.x/4, height/4);
      pop();


      push();
      textSize(14);
      fill(0);
      noStroke();
      text("This ray is incident on a circular", 10, 3*height/4+10);
      text('surface.', 10, 3*height/4+25);
      text("The normal of the surface is simply", 10, 3*height/4+45);
      text("a radial line.", 10, 3*height/4+60);
      text("If the lens is made of glass (n = 1.5)", 10, 3*height/4+80);
      text("will it be refracted towards or away?", 10, 3*height/4+95);
      
      pop();
    }
    
    if (mouseCounter==3){
      push();
      fill(220);
      noStroke();
      rect(0, 3*height/4, 3*L.x/4, height/4);
      pop();
      
      push();
      textSize(14);
      fill(0);
      noStroke();
      text("Towards the normal!", 10, 3*height/4+10);
      text('Light is  moving slower within the', 10, 3*height/4+30);
      text("lens,  so it  covers more distance", 10, 3*height/4+45);
      text("in air,  where  it travels quickly,", 10, 3*height/4+60);
      text("in order to travel through the lens", 10, 3*height/4+75);
      text("in the least amount of time.", 10, 3*height/4+90);
      
      pop();
    }
    
    if (mouseCounter==4){
      push();
      fill(220);
      noStroke();
      rect(0, 3*height/4, 3*L.x/4, height/4);
      pop();
      
      push();
      textSize(14);
      fill(0);
      noStroke();
      text("Once again, light strikes a circular", 10, 3*height/4+10);
      text('boundary.', 10, 3*height/4+25);
      text("Will it be refracted towards or away", 10, 3*height/4+45);
      text("from the normal?", 10, 3*height/4+60);
      pop();
    }
    
    if (mouseCounter>4){
      push();
      fill(220);
      noStroke();
      rect(0, 3*height/4, 3*L.x/4, height/4);
      pop();
      
      push();
      textSize(14);
      fill(0);
      noStroke();
      text("Away!", 10, 3*height/4+10);
      text('Notice how the light intersects the', 10, 3*height/4+30);
      text("optical axis. If the parallel ray is", 10, 3*height/4+45);
      text("close to the axis, it always strikes", 10, 3*height/4+60);
      text("the axis at the same point.", 10, 3*height/4+75);

      text("This point is the focal point, F.", 10, 3*height/4+95);
      pop();
    }
  }
  
  if (showPrinciple){
    push();
    fill(220);
    noStroke();
    rect(0, 3*height/4, 3*L.x/4, height/4);
    pop();
    
    push();
    textSize(14);
    fill(0);
    noStroke();
    text("There are 3 Principal Rays:", 10, 3*height/4+10);
    text('1. A parallel rays become focused.', 10, 3*height/4+30);
    
    if (mouseCounter>0){
      text("2. A focused ray becomes parallel.",10,3*height/4+50);
    }
    if (mouseCounter>1){
      text("3. The undeflected ray.",10,3*height/4+70);
    }
    pop();
  }
  
  if (showImage){
    push();
    fill(220);
    noStroke();
    rect(0, 3*height/4, 3*L.x/4, height/4);
    pop();
    
    push();
    textSize(14);
    fill(0);
    noStroke();
    text("Let's define some geometry:",10,3*height/4+10);
    text("s : Object distance (m)",10,3*height/4+25);
    text("s': Image distance (m)",10,3*height/4+40);
    text("f : focal length (m)",10, 3*height/4+55);
    text("h : Object height (m)",10,3*height/4+70);
    text("h': Image height (m)",10, 3*height/4+85);
  }
  
  if (showTriangle1 && showPrinciple && showImage){
    push();
    fill(220);
    noStroke();
    rect(0, 3*height/4, 3*L.x/4, height/4);
    pop();
    
    push();
    textSize(14);
    fill(0);
    noStroke();
    text("There are many triangles in this",10,3*height/4+10);
    text("drawing. How can we exploit them?",10,3*height/4+25);
    text("Applying the 'X Rule', we can see", 10, 3*height/4+45);
    text("That the triangles are similar.",10,3*height/4+60);
    text("Therefore, M = h\'/h = s\'/s",10,3*height/4+80);
  }
  
  if (showTriangle2 && showPrinciple && showImage){
    push();
    fill(220);
    noStroke();
    rect(0, 2.5*height/4, 3*L.x/4, 1.5*height/4);
    pop();
    
    push();
    textSize(14);
    fill(0);
    noStroke();
    text("Another pair of triangles requires",10,2.5*height/4+10);
    text("a little imagination.",10,2.5*height/4+25);
    text("But, it's obvious that the internal", 10, 2.5*height/4+45);
    text("angles of the triangles \"correspond\".",10,2.5*height/4+60);
    text("Therefore: s/f = (h + h')/h'",10,2.5*height/4+80);
    text("With a bit of algebra, this yields", 10, 2.5*height/4+95);
    text("the thin lens equation:",10,2.5*height/4+110);
    text("1   1   1",10,2.5*height/4+125);
    text("  =   +  ",10,2.5*height/4+130);
    text("f   s   s'",10,2.5*height/4+140);

    stroke(0);
    strokeWeight(2);
    noFill();
    line(8,2.5*height/4+129,20,2.5*height/4+129);
    line(76,2.5*height/4+129,88,2.5*height/4+129);
    line(42,2.5*height/4+129,54,2.5*height/4+129);
    
    pop();
    
    //text("Therefore: s/f = (h + h')/h'",10,3*height/4+80);
  }
  
  // Interactivity
  if (mouseState){
    cursor('grab');
  } else {
    cursor(ARROW);
  }
}

function mouseClicked(){
  if (mouseY<400){
    if (showZoom || showPrinciple){
      mouseCounter += 1;
    } else {
      mouseCounter = 0;
    }
  }
}
  

function findCircleLineIntersections(p,q,c,r,f) {
    p = p5.Vector.sub(p,c);
    q = p5.Vector.sub(q,c);
    
    let d = p5.Vector.sub(q,p);
    let dr = p5.Vector.mag(d);
  
    let D = p.x*q.y - q.x*p.y;
  
    let sgn = 1;
    if (d.y<0){
      sgn = -1;
    }
  
    let disc = sqrt(pow(r,2)*pow(dr,2) - pow(D,2));
  
    let x,y;
    if (!f){
      x = (D*d.y + sgn*d.x*disc)/pow(dr,2);
      y = (-1*D*d.x + abs(d.y)*disc)/pow(dr,2);
    } else {
      x = (D*d.y - sgn*d.x*disc)/pow(dr,2);
      y = (-1*D*d.x - abs(d.y)*disc)/pow(dr,2);
    }
    let collision = createVector(x,y);
    collision = p5.Vector.add(collision, c);
    return collision;
}


function mouseDragged(){
  if (gridSelect.checked()){
    if (L.highlight){
      L.x = round(mouseX/20)*20;
    }
    if (O.highlight){
      O.x = round(mouseX/20)*20;
    }
    if (O.stretch){
      O.h = round(max([height/2-mouseY,20])/20)*20;
    }
    if (L.stretch){
      L.f = max([round(abs(L.x-mouseX)/20)*20,20]);
      if (L.type<0){
        L.f = -1.0*L.f;
      }
    }
  } else {
    if (L.highlight){
      L.x = mouseX;
    }
    if (O.highlight){
      O.x = mouseX;
    }
    if (O.stretch){
      O.h = height/2-mouseY;
    }
    if (L.stretch){
      L.f = abs(L.x-mouseX)
      if (L.type<0){
        L.f = -1.0*L.f;
      }
    }
  }
}


function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawGridLines(){
  push();
  strokeWeight(2);
  
  setLineDash([5, 5]); //create the dashed line pattern here
  stroke(200);
  for (let i=0; i<=width; i+=20){
    line(i,0,i,height);
  }
  
  for (let j=0; j<=height; j+=20){
    line(0,j,width,j);
  }
  stroke(0);
  line(0,height/2,width,height/2);
  
  pop();
}


function updateImage(){
  s = L.x-O.x;
  sp = 1/(1/L.f-1/s);
  hp = -O.h*sp/s;
  I.x = L.l*sp + L.x;
  I.h = hp;
}

function drawRays(){
  // Is there a better way... yes. 
  // Have I implemented it? No.
  let px1,px2,py1,py2,px3,py3,t1,t2,t;
  
  if (showAll){
    push();
    strokeWeight(2);
    stroke(200,50,50,80);
    fill(200,50,50);
    for (let i = 0; i<=L.x; i+=20){
      px1 = O.x;
      px2 = i;
      py1 = height/2 - O.h;
      py2 = 0;
      line(px1,py1,px2,py2);
    }
    
    for (let i = 0; i<=height; i+=20){
      px1 = O.x;
      px2 = L.x;
      py1 = height/2 - O.h;
      py2 = i;
      line(px1,py1,px2,py2);
      
      px1 = L.x;
      py1 = i;
      px2 = I.x;
      py2 = height/2-I.h;
      t = 200;
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
      line(px1,py1,px3,py3);
    }
    
    for (let i = 0; i<=L.x; i+=20){
      px1 = O.x;
      px2 = i;
      py1 = height/2 - O.h;
      py2 = height;
      line(px1,py1,px2,py2);
    }
    
    for (let i = 0; i<=height; i+=20){
      px1 = O.x;
      px2 = 0;
      py1 = height/2 - O.h;
      py2 = i;
      line(px1,py1,px2,py2);
    }
    
    pop();
  }
  
  if (showFocus){
    push();
    strokeWeight(2);
    stroke(200,50,50,120);
    fill(200,50,50);
    
    for (let i = 0; i<=height; i+=20){
      px1 = O.x;
      px2 = L.x;
      py1 = height/2 - O.h;
      py2 = i;
      line(px1,py1,px2,py2);
      
      px1 = L.x;
      py1 = i;
      px2 = I.x;
      py2 = height/2-I.h;
      t = 200;
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
      line(px1,py1,px3,py3);
    }
    
    pop();
  }
  
  // Principal Ray #1 (Incident; Real)
  if (showPrinciple){
    push();
    strokeWeight(2);
    stroke(200,50,50);
    fill(200,50,50);
    px1 = O.x;
    px2 = L.x;
    py1 = height/2-O.h;
    py2 = height/2-O.h;
    line(px1,py1,px2,py2);
    pop();
  }
  
  if (L.f>0){
    // Principal Ray #1 (Incident; Virtual; Converging)
    if (showVirtual){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      fill(200,50,50);
      px1 = L.x;
      px2 = L.x+abs(L.f);
      py1 = height/2-O.h;
      py2 = height/2;
      t1 = (0-px1)/(px2-px1);
      t2 = (0-py1)/(py2-py1);
      t = min([t1,t2]);
      px2 = (1-t)*px1 + t*px2;
      py2 = (1-t)*py1 + t*py2;
      if (L.l<0){
        px2 = L.x - (px2-L.x);
      }
      setLineDash([5, 5]);
      line(px1,py1,px2,py2);
      pop();
    }

    // Principal Ray #1 (Outgoing; Real; Converging)
    if (showPrinciple){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      fill(200,50,50);
      px1 = L.x;
      px2 = L.x + abs(L.f);
      py1 = height/2 - O.h;
      py2 = height/2;
      t1 = (width-px1)/(px2-px1);
      t2 = (height-py1)/(py2-py1);
      t = min([t1,t2]);
      px2 = (1-t)*px1 + t*px2;
      if (L.l<0){
        px2 = L.x - (px2-L.x);
      }
      py2 = (1-t)*py1 + t*py2;
      line(px1,py1,px2,py2);
      translate(px2,py2);
      rotate(atan2(py2-py1,px2-px1)-PI/2);
      triangle(-5,-10,0,0,5,-10);
      pop();
    }
  } else {
    // Principal Ray #1 (Incident; Virtual; Diverging)
    if (showVirtual){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      fill(200,50,50);
      px1 = L.x;
      px2 = L.x-abs(L.f);
      py1 = height/2-O.h;
      py2 = height/2;
      t1 = (0-px1)/(px2-px1);
      t2 = (height-py1)/(py2-py1);
      t = min([t1,t2]);
      px2 = (1-t)*px1 + t*px2;
      py2 = (1-t)*py1 + t*py2;
      if (L.l<0){
        px2 = L.x - (px2-L.x);
      }
      setLineDash([5, 5]);
      line(px1,py1,px2,py2);
      pop();
    }
    
    // Principal Ray #1 (Outgoing; Real; Converging)
    if (showPrinciple){
      push();
      strokeWeight(2);
      stroke(200,50,50);
      fill(200,50,50);
      px1 = L.x - abs(L.f);
      px2 = L.x;
      py1 = height/2;
      py2 = height/2-O.h;
      t1 = (width-px1)/(px2-px1);
      t2 = (0-py1)/(py2-py1);
      t = min([t1,t2]);
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
      if (L.l<0){
        px3 = L.x - (px3-L.x);
      }
      line(px2,py2,px3,py3);
      translate(px3,py3);
      rotate(atan2(py3-py2,px3-px2)-PI/2);
      triangle(-5,-10,0,0,5,-10);
      pop();
    }
  }

  if (L.f>0){
    if (showPrinciple && mouseCounter>0){
      // focused ray -> parallel
      push();
      strokeWeight(2);
      stroke(200, 50, 50);
      fill(200, 50, 50);
      px1 = O.x;
      px2 = L.x-abs(L.f);
      py1 = height/2-O.h;
      py2 = height/2;
      t = (L.x-px1)/(px2-px1);
      px2 = (1-t)*px1 + t*px2;
      py2 = (1-t)*py1 + t*py2;
      line(px1,py1,px2,py2);
      if (L.l<0){
        line(L.x,py2,0,py2);
        translate(0,py2);
        rotate(atan2(0,-1*L.x)-PI/2);
        triangle(-5,-10,0,0,5,-10);
      } else {
        line(px2,py2,width,py2);
        translate(width,py2);
        rotate(atan2(0,width-px1)-PI/2);
        triangle(-5,-10,0,0,5,-10);
      }
    
      pop();
    }

    if (showVirtual){
      push();
      strokeWeight(2);
      stroke(200, 50, 50);
      fill(200, 50, 50);
      setLineDash([5, 5]);
      if (L.l<0){
        line(L.x,py2,width,py2);
      } else {
        line(0,py2,px2,py2);
      }
      setLineDash([1,0]);
      pop();
    }
  } else {
    if (showPrinciple && mouseCounter>0){
      // focused ray -> parallel
      push();
      strokeWeight(2);
      stroke(200, 50, 50);
      fill(200, 50, 50);
      px1 = O.x;
      px2 = L.x+abs(L.f);
      py1 = height/2-O.h;
      py2 = height/2;
      t = (L.x-px1)/(px2-px1);
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
    
      if (L.l<0){
        px4 = 0;
      } else {
        px4 = width;
      }
      py4 = py3;

      line(px1,py1,px3,py3);
      line(px3,py3,px4,py4);
      translate(px4,py4);
      rotate(atan2(0,px4-px3)-PI/2);
      triangle(-5,-10,0,0,5,-10);
      pop();
    }
    
    if (showVirtual){
      push();
      strokeWeight(2);
      stroke(200, 50, 50);
      fill(200, 50, 50);
      setLineDash([5, 5]);
      if (L.l<0){
        px4 = width;
      } else {
        px4 = 0;
      }
      line(px3,py3,px4,py4);
      setLineDash([1,0]);
      pop();
    }
  }
  
  if (showPrinciple && mouseCounter>1){
    // undeflected ray
    push();
    strokeWeight(2);
    stroke(200, 50, 50);
    fill(200, 50, 50);
    px1 = O.x;
    py1 = height/2-O.h;
    px2 = L.x;
    py2 = height/2;
    line(px1,py1,px2,py2);

    t1 = (width-px1)/(px2-px1);
    t2 = (height-py1)/(py2-py1);
    t = min([t1,t2]);

    px3 = (1-t)*px1 + t*px2;
    py3 = (1-t)*py1 + t*py2;
    if (L.l<0){
      px3 = L.x - (px3-L.x);
    }
    line(px2,py2,px3,py3);
    translate(px3,py3);
    rotate(atan2(py3-py2,px3-px2)-PI/2);
    triangle(-5,-10,0,0,5,-10);
    pop();
  }

  if (showVirtual){
    push();
    strokeWeight(2);
    stroke(200, 50, 50);
    fill(200, 50, 50);
    if (L.l>0){
      px1 = O.x;
      px2 = L.x;
      py1 = height/2-O.h;
      py2 = height/2;
      t1 = (0-px1)/(px2-px1);
      t2 = (0-py1)/(py2-py1);
      t = min([t1,t2]);
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
    } else {
      px1 = px2;
      py1 = py2;
      px2 = px3;
      py2 = py3;
      t1 = (width-px1)/(px2-px1);
      t2 = (0-py1)/(py2-py1);
      t = min([t1,t2]);
      px3 = (1-t)*px1 + t*px2;
      py3 = (1-t)*py1 + t*py2;
    }
    setLineDash([5, 5]);
    line(px1,py1,px3,py3);
    setLineDash([1,0]);
    pop();
  }
  
  if (showImage){
    push();
    stroke(0);
    strokeWeight(2);
    noFill()
    line(O.x, height/2-O.h-20, L.x,height/2-O.h-20);
    line(L.x, height/2-O.h-25, L.x, height/2-O.h-15);
    line(O.x, height/2-O.h-25, O.x, height/2-O.h-15);
    
    line(I.x, height/2-I.h+20, L.x,height/2-I.h+20);
    line(L.x, height/2-I.h+25, L.x, height/2-I.h+15);
    line(I.x, height/2-I.h+25, I.x, height/2-I.h+15);
    
    line(L.x-L.f, height/2+O.h, L.x, height/2+O.h);
    line(L.x, height/2+O.h-5, L.x, height/2+O.h+5);
    line(L.x-L.f, height/2+O.h-5, L.x-L.f, height/2+O.h+5);
    
    line(O.x-20,height/2,O.x-20,height/2-O.h);
    line(O.x-25,height/2,O.x-15,height/2);
    line(O.x-25,height/2-O.h,O.x-15,height/2-O.h);


    line(I.x+20,height/2,I.x+20,height/2-I.h);
    line(I.x+25,height/2,I.x+15,height/2);
    line(I.x+25,height/2-I.h,I.x+15,height/2-I.h);
    pop();
    
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    let cs = (L.x-O.x)/2 + O.x;
    text('s', cs, height/2-O.h-35);
    let csp = (I.x-L.x)/2 + L.x;
    text('s\'',csp,height/2-I.h+35);
    let csf = L.x - L.f/2;
    text('f',csf,height/2+O.h+15);
    let ch = height/2 - O.h/2;
    text('h',O.x-35,ch);
    let chp = height/2 - I.h/2;
    text('h\'',I.x+35,chp);
    pop();
  }
}