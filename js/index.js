//* Global //

const page = document.getElementById("data"),
  search = document.getElementById("search"),
  categories = document.getElementById("categories"),
  area = document.getElementById("area"),
  ingredients = document.getElementById("ingredients"),
  contact = document.getElementById("contact"),
  contactPage = document.getElementById("contactPage"),
  searchByName = document.getElementById("searchByName"),
  searchByletter = document.getElementById("searchByletter"),
  category = document.getElementById("category");
menuItems = [search, categories, area, ingredients, contact];

//? Toggler //

const aside = document.querySelector(".side-bar"),
  asideActive = document.querySelector(".toggler-activate"),
  asideClosed = document.querySelector(".toggler-close");

function hideToggle() {
  aside.classList.remove("opened");
  aside.classList.add("collapsed");
  asideClosed.classList.add("d-none");
  asideActive.classList.remove("d-none");
}
asideClosed.addEventListener("click", hideToggle);

function showToggle() {
  aside.classList.remove("collapsed");
  aside.classList.add("opened");
  asideActive.classList.add("d-none");
  asideClosed.classList.remove("d-none");
}
asideActive.addEventListener("click", showToggle);

for (i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", hideToggle);
}

//?  Home Page Default //

async function getMeals() {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const res = await api.json();
  displayMeal(res);
}
getMeals();

function displayMeal(mealData) {
  let mealsbox = ``;
  for (i = 0; i < mealData.meals.length; i++) {
    mealsbox += `<div onclick="getMealDetails('${mealData.meals[i].idMeal}')" class="meal col-md-3" >
    <img class="w-100" src="${mealData.meals[i].strMealThumb}" />
    <div  class="meal-caption w-100 bg-dark opacity-75 position-relative">
      <h3  class="position-absolute text-white text-capitalize h5 fs-5">
        ${mealData.meals[i].strMeal}
      </h3>
    </div>
  </div> 
    `;
  }
  page.innerHTML = mealsbox;
}

contact.addEventListener("click", function () {
  contactPage.classList.remove("d-none");
  page.innerHTML = "";
  searchPage.classList.add("d-none");
});

search.addEventListener("click", function () {
  page.innerHTML = "";
  searchPage.classList.remove("d-none");
  contactPage.classList.add("d-none");
});

//?Search By Name //

searchByName.addEventListener("keyup", function () {
  page.innerHTML = "";
  let mealName = searchByName.value;
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const res = await api.json();
    displayMeal(res);
  }
  getMeals();
});

//?Search By Letter //
searchByletter.addEventListener("keyup", function () {
  page.innerHTML = "";
  let mealFirstLetter = searchByletter.value;
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealFirstLetter}`
    );
    const res = await api.json();
    console.log(mealFirstLetter);
    console.log(res);
    displayMeal(res);
  }
  getMeals();
});

//?  Search By Categories //

//! Display //

function displayCategories(categoriesData) {
  let categoriesBox = ``;
  for (i = 0; i < categoriesData.categories.length; i++) {
    categoriesBox += `<div onclick="getCategory('${categoriesData.categories[i].strCategory}')"  id="category"  class="meal col-md-4" >
    <img class="w-100" src="${categoriesData.categories[i].strCategoryThumb}" />
    <div class="meal-caption w-100 bg-dark opacity-75 position-relative text-center overflow-auto">
      <h3 class="position-absolute text-white text-capitalize fs-3 w-100 ">
        ${categoriesData.categories[i].strCategory}
        </br>
        <span class="fs-5">${categoriesData.categories[i].strCategoryDescription}</span>
      </h3>
    </div>
  </div> 
    `;
  }
  page.innerHTML = categoriesBox;
}

function getCategory(category) {
  console.log(category);

  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const res = await api.json();
    console.log(res);
    displayMeal(res);
  }
  getMeals();
}

categories.addEventListener("click", function () {
  searchPage.classList.add("d-none");
  contactPage.classList.add("d-none");
  page.innerHTML = "";
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const res = await api.json();
    displayCategories(res);
  }
  getMeals();
});

function getMealDetails(id) {
  //! Getting Meal Id
  location.href = `./details.html?id=${id}`;
}

//? Display Meals By Area //

function displayAreaData(areaData) {
  let categoriesBox = ``;
  for (i = 0; i < areaData.meals.length; i++) {
    categoriesBox += `<div   id="area"  class="meal col-md-4" >
    <div onclick="getArea('${areaData.meals[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="h1">${areaData.meals[i].strArea}</h3>
                </div>
  </div> 
    `;
  }
  page.innerHTML = categoriesBox;
}

function getArea(area) {
  console.log(area);

  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const res = await api.json();
    console.log(res);
    displayMeal(res);
  }
  getMeals();
}

area.addEventListener("click", function () {
  searchPage.classList.add("d-none");
  contactPage.classList.add("d-none");
  page.innerHTML = "";
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const res = await api.json();
    displayAreaData(res);
  }
  getMeals();
});

//? Display Meals By Ingredients //

function displayIngredients(ingredient) {
  let categoriesBox = ``;
  for (i = 0; i < ingredient.meals.length; i++) {
    categoriesBox += `<div onclick="getIngredientsMeals('${ingredient.meals[i].strIngredient}')" class="rounded-2 text-center cursor-pointer col-md-3 fs-2  ingredient">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3 class="text-primary">${ingredient.meals[i].strIngredient}</h3>
    <p class="small"> ${ingredient.meals[i].strDescription}</p>
</div> 
    `;
  }
  page.innerHTML = categoriesBox;
}

function getIngredientsMeals(ingredient) {
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const res = await api.json();
    console.log(res);
    displayMeal(res);
  }
  getMeals();
}

ingredients.addEventListener("click", function () {
  searchPage.classList.add("d-none");
  contactPage.classList.add("d-none");
  page.innerHTML = "";
  async function getMeals() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const res = await api.json();
    displayIngredients(res);
  }
  getMeals();
});

//? Form //

const firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  age = document.getElementById("age"),
  passwordInput = document.getElementById("password"),
  passwordRepeatInput = document.getElementById("password_repeat"),
  inputs = document.querySelectorAll('input:not([type="submit"])'),
  submit = document.querySelector('input[type="submit"]');

function CustomValidation() {
  this.invalidities = [];
  this.validityChecks = [];
}

CustomValidation.prototype = {
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    return this.invalidities.join(". \n");
  },
  checkValidity: function (input) {
    for (let i = 0; i < this.validityChecks.length; i++) {
      let isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      let requirementElement = this.validityChecks[i].element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add("invalid");
          requirementElement.classList.remove("valid");
        } else {
          requirementElement.classList.remove("invalid");
          requirementElement.classList.add("valid");
        }
      }
    }
  },
};

let firstNameValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 3;
    },
    invalidityMessage: "This input needs to be at least 3 characters",
    element: document.querySelector(
      'label[for="firstName"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage: "Only letters and numbers are allowed",
    element: document.querySelector(
      'label[for="firstName"] .input-requirements li:nth-child(2)'
    ),
  },
];
let lastNameValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 3;
    },
    invalidityMessage: "This input needs to be at least 3 characters",
    element: document.querySelector(
      'label[for="lastName"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage: "Only letters and numbers are allowed",
    element: document.querySelector(
      'label[for="lastName"] .input-requirements li:nth-child(2)'
    ),
  },
];

let emailValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 7;
    },
    invalidityMessage: "This input needs to be at least 7 characters",
    element: document.querySelector(
      'label[for="email"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      );
      return illegalCharacters ? false : true;
    },
    invalidityMessage: "email must ends with @....",
    element: document.querySelector(
      'label[for="email"] .input-requirements li:nth-child(2)'
    ),
  },
];

let ageValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 2;
    },
    invalidityMessage: "This input needs to be at least 2 characters",
    element: document.querySelector(
      'label[for="age"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/^([1-7][0-9]|80)$/);
      return illegalCharacters ? false : true;
    },
    invalidityMessage: "age must be between less than 80",
    element: document.querySelector(
      'label[for="age"] .input-requirements li:nth-child(2)'
    ),
  },
];

let passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return (input.value.length < 8) | (input.value.length > 100);
    },
    invalidityMessage: "This input needs to be between 8 and 100 characters",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: "At least 1 number is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(2)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[a-z]/g);
    },
    invalidityMessage: "At least 1 lowercase letter is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(3)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z]/g);
    },
    invalidityMessage: "At least 1 uppercase letter is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(4)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
    },
    invalidityMessage: "You need one of the required special characters",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(5)'
    ),
  },
];

let passwordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return passwordRepeatInput.value != passwordInput.value;
    },
    invalidityMessage: "This password needs to match the first one",
  },
];

function checkInput(input) {
  input.CustomValidation.invalidities = [];
  input.CustomValidation.checkValidity(input);

  if (input.CustomValidation.invalidities.length == 0 && input.value != "") {
    input.setCustomValidity("");
  } else {
    let message = input.CustomValidation.getInvalidities();
    input.setCustomValidity(message);
  }
}

firstName.CustomValidation = new CustomValidation();
firstName.CustomValidation.validityChecks = firstNameValidityChecks;

lastName.CustomValidation = new CustomValidation();
lastName.CustomValidation.validityChecks = lastNameValidityChecks;

email.CustomValidation = new CustomValidation();
email.CustomValidation.validityChecks = emailValidityChecks;

age.CustomValidation = new CustomValidation();
age.CustomValidation.validityChecks = ageValidityChecks;

passwordInput.CustomValidation = new CustomValidation();
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation();
passwordRepeatInput.CustomValidation.validityChecks =
  passwordRepeatValidityChecks;

/* Disabled */

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    if (1 == 0) {
      // Condition mot3eb
      submit.classList.remove("disabled");
    } else {
      submit.classList.add("disabled");
    }
  });
}

/* Check Again */

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    checkInput(this);
  });
}
