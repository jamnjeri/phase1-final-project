//Add the Collapsable Navbar
function collapsableNavbar(){
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.navbar-main-content');
    let navButton = document.querySelector('#navButton');
    navButton.addEventListener('click', function(){
        sidebar.classList.toggle('sidebar_small')
        mainContent.classList.toggle('navbar-main-content_large')
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
    //All
    selection[0].addEventListener('click', function(){
        console.log("All Selected")
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Categories
    selection[1].addEventListener('click', function(){
        console.log("Categories Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Nationality
    selection[2].addEventListener('click', function(){
        console.log("Nationality Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })
    //Dish id.no.
    selection[3].addEventListener('click', function(){
        console.log("Dish id.no. Selected");
        //Close the dropdown
        let dropDown = document.querySelector('.drop_down ul')
        dropDown.classList.remove("active");
    })  
}

//Add an eventlistener to all the categories
function categoriesSelection(){
    let categoriesSelection = document.querySelectorAll('.dropdown li')
    //Add event listener to 
    for (category of categoriesSelection){
        console.log(category)
    }
}

function addEventListenerToCategoryName(category){
    let categoryName = document.querySelector()
}


function initialize(){
    console.log("Hi")
    collapsableNavbar()
    dropdownSearchbox()
    categoriesSelection()
}

initialize()