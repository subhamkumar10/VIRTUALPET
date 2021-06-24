var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var feedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("feedDog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })
 fill ("black");
textSize (25);
console.log(lastFed);
  //write code to display text lastFed time here
  if(lastFed>=12){
text("lastFed:"+lastFed%12+" PM",200,30);
  }else if(lastFed==0){
text("lastFed:12AM",200,30);
  }else {
    text("lastFed"+lastFed+" AM",200,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
 var food_stock_val=foodObj.getFoodStock();
 if(food_stock_val<=0){
foodObj.updateFoodStock(food_stock_val*0)
 }else{foodObj.updateFoodStock(food_stock_val-1)}
 database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
})

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
