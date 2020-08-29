// Select Element atau Memilih elemen yang akan dimanipulasi
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")

// Class Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrought";

// Variables
let LIST, id;

// Get item faroam localstorage
let data = localStorage.getItem("TODO");


// check if datais not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //et the idto the last onein the list
    loadList(LIST);//load the list to the user interface
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load itemsto the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dataElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to do function

function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;

     const position = "beforeend";

     list.insertAdjacentHTML(position, item);
}

//add an item to the list user the enter key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the inputisn't empty
        if(toDo){
            addToDo(toDo, id,false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //Add item tolocaltorage (this code must be adde where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash= true;
}

//target the item creted dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the cliked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
            completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localtorage ( this code mustbe addedwhere the LIST arrray is apdate)
    localStorage.setItem("TODO",JSON.stringify(LIST));
});