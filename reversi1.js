circleSize = 50
syoriFlag = 0;
oa = 0;　//置く場所アシスト
ma = 1;//前の手アシスト
state = 0;
canMouse = 0;
cpu = 0;
clickCells = 0;
rireki = [];
beforeTe = null;
canPut = 0;
black = 0;
white = 0;

function setup() {
  reset();
  memo = [1,-1,10,-10,11,-11,9,-9]
  noStroke();
  
}

function reset(){
  createCanvas(400, 400);
  beforeTE = null;
  turn = 0;
  bord=[];
  for(i=0;i<10;i++)
  {
    bord.push(-2);
  }
  for(i=0;i<8;i++)
    {
      bord.push(-2);
      for(k=0;k<8;k++)
        {
          bord.push(-1);
        }
      bord.push(-2);
    }
  for(i=0;i<10;i++)
    {
      bord.push(-2);
    }
  bord.splice(44,1,0)
  bord.splice(55,1,0)
  bord.splice(45,1,1)
  bord.splice(54,1,1)
  
}

function draw() {
  if(state == 0)
    {
      canPutOn();
      drowing(oa,ma,0);
      state = 1;
      if(bord.includes(-1) == false)
        {
          result();
        }
    }
  else
    if(state == 1)
    {
      if(canCells.length > 0)
      {
        canPut = 0;
        if(cpu-1 == turn || cpu == 0  )
          {
        mouse();
          }
        else
          {
            Cpu();
          }
        if(canCells.includes(clickCells))
          {
            changeCells(0,0);
            state = 0;
            turn = abs(turn-1);
            clickCells = 0;
          }
          
      }
     else
       {
         canPut++;
         state = 0;
         turn = abs(turn-1);
         if(canPut >1)
           {
             result();
           }
         else
           {
             alert("置くことのできる場所がないのでスキップします")
           }
       }
    }
  
  
}

function drowing(putAsist,beforeTeAsist,i){
  background(220);
  background("#66ffab"); // 背景を白にする
  fill(0); // 塗りつぶし色を黒にする
  //ellipse(x, y, 50, 50); // 円を描く
  
  for(i=0;i<64;i++)
    {
      temp = (i%8+1)+(floor(i/8)*10)+10;
      x = (i%8+1)*33;
      y = floor((i+1)/-8)*(-33)-150;
      
      if(beforeTeAsist == 1)
        {
          if(temp == beforeTe)
            {
              fill("#ffae00");
            }
          else
            {
              fill(0);
            }
        }
      else
        {
          fill(0);
        }
      circle(x+50,y+200,30);
      
      
      
      
      
      if(bord[temp] == 1)
         {
           fill(0);
         }
      else
        if(bord[temp] == 0)
        {
          fill(255);
        }
      else
        if(bord[temp] == -1)
        {
          fill("#66ffab");
        }
      circle(x+50,y+200,28); // 円を描く
      if(putAsist == 1)
        {
          if(canCells.includes(temp))
            {
              fill("rgba(255,255,255,0.75)");
              circle(x+50,y+200,14)
              
            }
        }
      
      
    }
  
}

function canPutOn(){
  canCells = [];
  for(i=0;i<100;i++)
    {
      if(bord[i] == -1)
       
         {
           for(k=0;k<8;k++)
             {
               aaa =  search(memo[k],i)
               
               if(temp == 1)
                 {
                   if(canCells.includes(i)==false)
                     {
                       canCells.push(i);
                     }
                 }
             }
         }
    }
}

function search(zure,position){
  for(g=1;g<11;g++)
    {
      if(abs(turn-1) == bord[position+(zure*g)])
         {
           temp = bord[position + (zure*(g+1))];
           if(turn == temp)
             {
               temp = 1;
               return(1);
             }
           else
           {
             if((abs(turn-1) == temp) == false)
               {
                 temp = 0;
                 return(0);
               }
           }
         }
      else
      {
        temp = 0
        return(0);
      }
    }
  temp = 0;
}

function mouse(){
  if((cpu-1) == turn || cpu == 0)
    {
      if(132.5>abs((mouseX+2)/33 && 131.5>abs(mouseY-11.5)))
         {
           if(mouseIsPressed && mouseButton == LEFT)
             {
               if(canMouse == 0)
                 {
                   canMouse = 1;
                   temp = 9 + floor((mouseX-1)/33)+(10*floor((mouseY-65)/33))
                 }
             }
           else
           {
             canMouse = 0;
             if(temp > -1)
               {
                 if(temp == 9 + floor((mouseX-1)/33)+(10*floor((mouseY-65)/33)))
                   {
                     clickCells = temp;
                     
                   }
               }
           }
         }
    }
  else
  {
    clickCells = canCells[random(0,canCells.length-1)]
  }
}

function changeCells(backTe,skip){
  
  if(backTe == 0)
    {
      rireki.push(clickCells);
    }
  beforeTe = clickCells;
  bord.splice(clickCells,1,turn);
  for(i=0;i<8;i++)
    {
      temp=0
      search(memo[i],clickCells);
      if(temp == 1)
        {

          for(k=1;turn != bord[clickCells + (k*memo[i])];k++)
            {
              bord.splice((clickCells+(k*memo[i])),1,turn);
              
              
              drowing(0,0,i);
              if(k>8)
                {
                  break;
                }
            }
        }
    }
  
  canCells.length = 0;
}

function result(){
  count();
  if(black > white)
    {
      alert("黒"　+ black + "　白" + white + "　黒の勝ち");
    }
  else
  if(black < white)
    {
      alert("黒"　+ black  + "　白" + white + "　白の勝ち");
    }
  else
    {
      alert("黒"　+ black  + "　白" + white + "　引き分け")
    }
  state = 3;
}

function count(){
  for(i=0;i<100;i++)
    {
      if(bord[i] == 1)
        {
          black++;
        }
      else
        if(bord[i] == 0)
          {
            white++;
          }
    }
}

function Cpu(){
  clickCells = canCells[int(random(canCells.length))]
}

function tc()
{
  turn = 0;
  canPutOn();
  drowing(oa,ma,0);
  state = 1;
  se
}