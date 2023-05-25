class lens {
  constructor(x,f,l){
    this.x = x;
    this.f = f;
    if (this.f>0){
      this.type = 1;
    } else {
      this.type = -1;
    }
    this.l = 1;
    this.highlight = false;
  }
  
  draw(){
    if (this.l>0){
      push();
      fill(0,100,100);
      noStroke();
      if (this.f>0){
        arc(this.x+78,200,180,800,PI-1.2,PI+1.2,CHORD);
        arc(this.x-78,200,180,800,-1.2,1.2,CHORD);
      } else {
        rectMode(CORNERS)
        rect(this.x-15,0,this.x+15,height);
        fill(220);
        let f = 4;
        arc(this.x+f*width/2+5,height/2,f*width,f*width,PI-0.12,PI+0.12,CHORD);
        //arc(this.x-91,200,180,800,-1.2,1.2,CHORD);
        arc(this.x-f*width/2-5,height/2,f*width,f*width,-0.12,0.12,CHORD);
      }
      pop();
    } else {
      push();
      noFill()
      strokeWeight(2);
      if (this.f>0){
        arc(this.x-90,200,180,800,-1.2,1.2,OPEN);
      } else {
        arc(this.x+90,200,180,800,PI-1.2,PI+1.2,OPEN);
      }
      pop();
      
    }
    
    
    if (showPrinciple){
      push();
      textAlign(CENTER);
      rectMode(CENTER);
      fill(225);
      noStroke()
      rect(this.x-abs(this.f),height/2+15,15,15);
      rect(this.x+abs(this.f),height/2+15,15,15);
      fill(0);
      noStroke();
      // near focal point
      circle(this.x-abs(this.f),height/2,10);
      text('F',this.x-abs(this.f),height/2+20);
      circle(this.x+abs(this.f),height/2,10);
      text('F',this.x+abs(this.f),height/2+20);
      pop();
    }
    
    if ((abs(mouseX-this.x)<20) && (abs(mouseY-height/2)<40)){
      //circle(this.x,height/2,10);  
      this.highlight = true;
    } else {
      this.highlight = false;
    }

    if ((abs(mouseX-(this.x+abs(this.f)))<15) && (abs(mouseY-height/2)<15)){
      //circle(this.x,height/2-this.x+abs(this.f),10);  
      this.stretch = true;
    } else {
      this.stretch = false;
    }
    
    return (this.stretch || this.highlight)
  }  
}