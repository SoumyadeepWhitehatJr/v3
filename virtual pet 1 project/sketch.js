//Create variables here
var dog,happyDog,database,foodS,foodStock
var happyDogImage,dogImage,foodObj,lastFed,fedTime
var dogImage,feed,addFood,add
var gameState,readState;

function preload()
{
happyDogImage=loadImage("dd.png")
 dogImage=loadImage("gg.png")
garden=loadImage("img/Garden.png")
washroom=loadImage("img/Wash Room.png")
bedroom=loadImage("img/Bed Room.png")
}

function setup() {
  database=firebase.database()
	createCanvas(1000,400)
foodObj=new Food()

foodStock=database.ref('Food')
foodStock.on("value",readStock)
fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){

lastFed=data.val()

  })
readState=database.ref("gameState")
readState.on("value",function(data){

gameState-data.val()


})





  dog=createSprite(800,200,150,150)

  dog.addImage(dogImage)
  dog.scale=0.1

 

  feed= createButton("FeedDog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
      
}


function draw() {  

currentTime=hour()
if(currentTime==(lastFed+1)){
update("Playing")
foodObj.garden()
}
else if(currentTime==(lastFed+2)){
  update("Sleeping")
  foodObj.bedroom()
  }
else if (currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("bathing")
  foodObj.washroom()
  }else{
    update("Hungry")
    foodObj.display()
    }
  
    if(gameState!="Hungry"){

feed.hide()
addFood.hide()
dog.remove()

    }else{

feed.show()
addFood.show()
dog.addImage(dogImage)


    }

          
  drawSprites();
  //add styles here
  
          }

 


function readStock(data){

foodS=data.val();
foodObj.updateFoodStock(foodS)
}
function feedDog(){
dog.addImage(happyDogImage)

  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({

Food:foodObj.getFoodStock(),
FeedTime:hour(),
gameState:"Hungry"




})

  
}


 function addFoods(){
foodS++

database.ref('/').update({

Food:foodS

})
}

function update(state)
{
  database.ref('/').update({
gameState:state
    
    })

}
