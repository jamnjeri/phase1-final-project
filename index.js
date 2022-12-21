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
        // console.log("Name Selected")
        let searchChoice = 0;
        searchButtonFunc(searchChoice)
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Ingredient(s)
    selection[1].addEventListener('click', function(){
        // console.log("Ingredient(s) Selected");
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
        // console.log("Random Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Dish id.no.
    selection[3].addEventListener('click', function(){
        let searchChoice = 3;
        searchButtonFunc(searchChoice)
        // console.log("Dish id.no. Selected");
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
        alert("Search box is empty.");
        if (searchChoice === 2){
            randomFilter()
        }
    }
    else {
        // console.log("String is NOT empty");
        if (searchChoice === 0){
            // console.log("Name")
            nameFilter(userInput)
        }
        else if (searchChoice === 1){
            // console.log("Ingredient")
            ingredientFilter(userInput)
        }
        else if (searchChoice === 2){
            // console.log("Random")
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
    // console.log(endPoint)
    fetchFunction(endPoint)
}
//Ingredient(s) filter function
function ingredientFilter(userInput){
    let endPoint = `/filter.php?i=${userInput}`
    // console.log(endPoint)
    fetchFunction(endPoint)
}
//Random filter function
function randomFilter(){
    let endPoint = `/random.php`
    // console.log(endPoint)
    fetchFunction(endPoint)
}
//ID number filter function
function idSearchFilter(userInput){
    let endPoint = `/lookup.php?i=${userInput}`
    // console.log(endPoint)
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
    let baseUrl = 'https://www.themealdb.com/api/json/v1/1'
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
        // console.log(meal.strMeal)
        // //Grab where you want to put it
        let parentContent = document.querySelector('.display-area')
        //Create the new element
        let card = document.createElement('div')
        card.className = `card card${i}`
        card.id = `meal.${i}`
        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <div class = "card-container">
                <h4 class="mealName"><b>${meal.strMeal}</b></h4>
                <p><b>Meal ID Number:</b>${meal.idMeal}</p>
            </div>
        `
        //Add card to DOM
        parentContent.appendChild(card)

        
    }

    cardEventListener()
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

//Add an event listener to all cards displayed
function cardEventListener() {
    let target = document.querySelectorAll('.card')
    // console.log(target)
    // console.log(target.length)

    //Create loop to iterate through all the elements in the list
    for (i=0; i<target.length; i++) {
        let post = document.querySelector(`.card${i}`)
        // console.log(post)
        post.addEventListener('click', function() {
            let mealId = document.getElementById(`${post.id}`).querySelector('.mealName')
            // console.log(`${post.id}clicked`)
            let name = mealId.innerText
            // console.log(name)
            let endPoint = `/search.php?s=${name}`
            // console.log(endPoint)
            mealRecipeFetchFunc(endPoint)
        })
    }
}

//Recipe fetch function
function mealRecipeFetchFunc(endPoint) {
    let baseUrl = 'https://www.themealdb.com/api/json/v1/1'
    let url = `${baseUrl}${endPoint}`

    //Fetch the recipe
    let foods = fetch(url)
        .then((foods) => foods.json())
        .then((response) => {
            let foods =response
            // console.log(foods.meals)
            recipeDisplayFunc(foods)
        })
}

//Recipe display function
function recipeDisplayFunc(foods){
    clearGridFunc()
    //Create card
    let myArray = foods.meals
    for (let i=0; i < myArray.length; i++){
        let meal = myArray[i]
        // console.log(meal.strMeal)
        // //Grab where you want to put it
        let parentContent = document.querySelector('.display-area')
        //Create the new element
        let card = document.createElement('div')
        card.className = `recipe-card`
        card.id = `${meal.idMeal}`
        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <div class = "recipe-container">
                <h4 class="mealName"><b>${meal.strMeal}</b></h4>
                <p><b>Meal ID Number:</b>${meal.idMeal}</p>
                <p><b>Category:</b>${meal.strCategory}</p>
                <p><b>Nationality:</b>${meal.strArea}</p>
                <p><b>Source:</b>${meal.strSource}</p>
                <p><b>Ingredients:</b></p>
                <ul class='ingredients'>
                    <li>=> ${meal.strIngredient1}, ${meal.strMeasure1} </li>
                    <li>=> ${meal.strIngredient2}, ${meal.strMeasure2} </li>
                    <li>=> ${meal.strIngredient3}, ${meal.strMeasure3} </li>
                    <li>=> ${meal.strIngredient4}, ${meal.strMeasure4} </li>
                    <li>=> ${meal.strIngredient5}, ${meal.strMeasure5} </li>
                    <li>=> ${meal.strIngredient6}, ${meal.strMeasure6} </li>
                    <li>=> ${meal.strIngredient7}, ${meal.strMeasure7} </li>
                    <li>=> ${meal.strIngredient8}, ${meal.strMeasure8} </li>
                    <li>=> ${meal.strIngredient9}, ${meal.strMeasure9} </li>
                    <li>=> ${meal.strIngredient10}, ${meal.strMeasure10} </li>
                    <li>=> ${meal.strIngredient11}, ${meal.strMeasure11} </li>
                    <li>=> ${meal.strIngredient12}, ${meal.strMeasure12} </li>
                    <li>=> ${meal.strIngredient13}, ${meal.strMeasure13} </li>
                    <li>=> ${meal.strIngredient14}, ${meal.strMeasure14} </li>
                    <li>=> ${meal.strIngredient15}, ${meal.strMeasure15} </li>
                    <li>=> ${meal.strIngredient16}, ${meal.strMeasure16} </li>
                    <li>=> ${meal.strIngredient17}, ${meal.strMeasure17} </li>
                    <li>=> ${meal.strIngredient18}, ${meal.strMeasure18} </li>
                    <li>=> ${meal.strIngredient19}, ${meal.strMeasure19} </li>
                    <li>=> ${meal.strIngredient20}, ${meal.strMeasure20} </li>
                </ul>
                <p><b>Instructions:</b></p>
                <p class="instructions">${meal.strInstructions}</p>
            </div>
            <div class="like-Button">
                <ul>
                <p><b>Press like button to add to meal plan list</b></p>
                <button id="likeButton" class="likeButton"><i class="fa-regular fa-heart"></i></button>
                </ul>
            </div>
        `
        //Add card to DOM
        parentContent.appendChild(card)
        likeFunc()
        
    }
}

//Create an event listener for the heart button
function likeFunc(){
    let like = document.querySelector('.likeButton')
    like.addEventListener('click', function(){
        // console.log('liked')
        like.innerHTML = `<i class="fa-solid fa-heart"></i>`

        //Add meal name to meal plan list:
        let name = document.querySelector('.mealName').innerText
        // console.log(name)

        //Grab where you want to put it
        let parentContent = document.querySelector('.content')
        let meal = document.createElement('div')
        meal.className = 'meal-list'
        meal.textContent = `-${name}        `
        let close = document.createElement('button')
        close.textContent = ` X`
        close.addEventListener('click', handleDelete)

        //Add the x button as a child of the p tag
        meal.appendChild(close)

        //Add the p tag
        parentContent.appendChild(meal)
    })
    // console.log(like)
    // console.log('liked')
}

//Handle the removal of the name from list
function handleDelete (event){
    event.target.parentNode.remove()
}

function initialize(){
    console.log("Hi")
    leftCollapsableNavbar()
    rightCollapsableNavbar()
    dropdownSearchbox()
    categoriesSelection() 
}

initialize()