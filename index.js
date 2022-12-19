//Add the Collapsable Navbar
function leftCollapsableNavbar(){
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.navbar-main-content');
    let navButton = document.querySelector('#navButton');
    navButton.addEventListener('click', function(){
        sidebar.classList.toggle('sidebar_small')
        mainContent.classList.toggle('navbar-main-content_large')
    })
}
function rightCollapsableNavbar(){
    const sidebar = document.querySelector('.right-sidebar');
    const mainContent = document.querySelector('.rightnavbar-main-content');
    let navButton = document.querySelector('#rightNavButton');
    navButton.addEventListener('click', function(){
        // console.log('clicked');
        sidebar.classList.toggle('rightnavbar_small')
        mainContent.classList.toggle('rightnavbar-main-content_large')
    })
}


//Add the Dropdown Search Box
function dropdownSearchbox(){
    let defaultOption = document.querySelector('.default_option')
    //Add event listener
    defaultOption.addEventListener('click', function(){
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.className = ("active");
    })
    let selection = document.querySelectorAll('.drop_down ul li')

    //Add event listener to each option
    //Name
    selection[0].addEventListener('click', function(){
        console.log("Name Selected")
        let searchChoice = 0;
        searchButtonFunc(searchChoice)
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Ingredient(s)
    selection[1].addEventListener('click', function(){
        console.log("Ingredient(s) Selected");
        let searchChoice = 1;
        searchButtonFunc(searchChoice)
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Random
    selection[2].addEventListener('click', function(){
        let searchChoice = 2;
        searchButtonFunc(searchChoice)
        console.log("Random Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Dish id.no.
    selection[3].addEventListener('click', function(){
        let searchChoice = 3;
        searchButtonFunc(searchChoice)
        console.log("Dish id.no. Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })  
}

//Activate Search Button
function searchButtonFunc(searchChoice){
    //Grab inputed value
    // console.log(searchChoice)
    let userInput = document.getElementById('searchBarInput').value
    // console.log(userInput)
    if (userInput === '') {
        console.log("String is empty");
        if (searchChoice === 2){
            randomFilter()
        }
    }
    else {
        // console.log("String is NOT empty");
        if (searchChoice === 0){
            console.log("Name")
            nameFilter(userInput)
        }
        else if (searchChoice === 1){
            console.log("Ingredient")
            ingredientFilter(userInput)
        }
        else if (searchChoice === 2){
            console.log("Random")
            randomFilter()
        }
        else if (searchChoice === 3){
            // console.log("ID")
            idSearchFilter(userInput)
        }
    }
}

//Name filter function
function nameFilter(userInput){
    let endPoint = `/search.php?s=${userInput}`
    console.log(endPoint)
    fetchFunction(endPoint)
}
//Ingredient(s) filter function
function ingredientFilter(userInput){
    let endPoint = `/filter.php?i=${userInput}`
    console.log(endPoint)
    fetchFunction(endPoint)
}
//Random filter function
function randomFilter(){
    let endPoint = `/random.php`
    console.log(endPoint)
    fetchFunction(endPoint)
}
//ID number filter function
function idSearchFilter(userInput){
    let endPoint = `/lookup.php?i=${userInput}`
    console.log(endPoint)
    fetchFunction(endPoint)
}



//Add an eventlistener to all the categories
function categoriesSelection(){
    let categoriesSelection = document.querySelectorAll('.dropdown li')
    //Add event listener to 
    for (category of categoriesSelection){
        // console.log(category)
        addEventListenerToCategoryName(category)
    }
}

function addEventListenerToCategoryName(category){
    //Grab each category
    let categoryName = document.querySelector(`#${category.id}`)
    //Add an eventlistener
    categoryName.addEventListener('click', function(){
        //Fetch each categories data
        let end= `${category.id}`
        // console.log(end)
        let endPoint = `/filter.php?c=${end}`
        fetchFunction(endPoint)
        // console.log(`${endPoint}`)
    })
    // console.log(categoryName);
}

//Fetch Function
function fetchFunction(endPoint){
    let baseUrl = 'https:www.themealdb.com/api/json/v1/1'
    let url = `${baseUrl}${endPoint}`
    //console.log(url)

    //https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

    let foods = fetch(url)
        .then((foods) => foods.json())
        .then((response) => {
            let foods =response
            // console.log(foods.meals[1])
            createCardFunc(foods) 
        })
}

//Create cards for each food
function createCardFunc(foods) {
    clearGridFunc()
    let myArray = foods.meals
    for (let i=0; i < myArray.length; i++){
        let meal = myArray[i]
        console.log(meal.strMeal)
        // //Grab where you want to put it
        let parentContent = document.querySelector('.display-area')
        //Create the new element
        let card = document.createElement('div')
        card.className = `card card${i}`
        card.id = `meal.${i}`
        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <div class = "card-container">
                <h4><b>${meal.strMeal}</b></h4>
                <p><b>Meal ID Number:</b>${meal.idMeal}</p>
            </div>
        `
        //Add card to DOM
        parentContent.appendChild(card)
    }

}

//Create function to clear grid when another button is pressed
function clearGridFunc(){
    const target = document.querySelector('.display-area')
    // console.log(target)
    //Check if it has child nodes, if it does delete them
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    } 
}

function initialize(){
    console.log("Hi")
    leftCollapsableNavbar()
    rightCollapsableNavbar()
    dropdownSearchbox()
    categoriesSelection()
}

initialize()