class object {
  constructor(x,h,label){
    this.x = x;
    this.h = h;
    this.label = label;

    this.highlight = false;
    this.stretch = false;
  }
  
  draw(){
    push();
    rectMode(CORNERS);
    fill(0)
    noStroke();
    if (this.h>0){
      rect(this.x-7,height/2-this.h+15,this.x+7,height/2);
      triangle(this.x-15, height/2-this.h+15, this.x, height/2-this.h, this.x+15, height/2-this.h+15);
    } else {
      rect(this.x-7,max([height/2-this.h-15,height/2]),this.x+7,height/2);
      triangle(this.x-15, height/2-this.h-15, this.x, height/2-this.h, this.x+15, height/2-this.h-15);
    }
    pop();
    
    
        
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    fill(225);
    noStroke()

    // near focal point
    if (this.h>0){
      rect(this.x,height/2+15,15,15);
      fill(0);
      text(this.label,this.x,height/2+20);
    } else {
      rect(this.x,height/2-10,15,15);
      fill(0);
      text(this.label,this.x,height/2-10);
    }
    pop();
    

    if ((abs(mouseX-this.x)<15) && (abs(mouseY-height/2)<20)){
      //circle(this.x,height/2,10);  
      this.highlight = true;
    } else {
      this.highlight = false;
    }
    
    if ((abs(mouseX-this.x)<15) && (abs(mouseY-height/2+this.h)<20)){
      //circle(this.x,height/2-this.h,10);  
      this.stretch = true;
    } else {
      this.stretch = false;
    }
    

    return (this.stretch || this.highlight)
  }  
}