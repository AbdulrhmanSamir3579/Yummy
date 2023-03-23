const parmasSearch = location.search;
const params = new URLSearchParams(parmasSearch);
const id = params.get("id");
console.log(id);

const mealDetails = document.getElementById("mealDetails");

async function getMeals() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const res = await api.json();
  const meal = res.meals[0];
  console.log(meal);
  displayMealDetails(meal);
}
getMeals();

function displayMealDetails(meal) {
  let mealDetailsBox = `                <div class="row py-5 g-4 ">
                    <div class="col-md-12">
                        <h2 class="h1 fs-1 fw-bolder text-center">Meal Details</h2>
                    </div>
                    <div class="col-md-4 p-5">
                        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="meal picture">
                        <h3 class="h1 text-center my-5 fw-bolder text-dark-emphasis">Beef and Mustard Pie</h3>
                    </div>
                    <div class="col-md-8">
                        <h3 class="fs-1 fw-bold">Instructions</h3>
                        <p class="lead">${meal.strInstructions}</p>
                        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                        <h3 class="fw-bolder">Recipes :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap fs-5 text-capitalize">
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure1} ${meal.strIngredient1}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure2} ${meal.strIngredient2}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure3} ${meal.strIngredient3}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure4} ${meal.strIngredient4}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure5} ${meal.strIngredient5}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure6} ${meal.strIngredient6}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure7} ${meal.strIngredient7}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure8} ${meal.strIngredient8}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure9} ${meal.strIngredient9}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure10} ${meal.strIngredient10}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure11} ${meal.strIngredient11}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure12} ${meal.strIngredient12}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure13} ${meal.strIngredient13}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure14} ${meal.strIngredient14}</li>
                            <li class="alert alert-info m-2 p-1">${meal.strMeasure15} ${meal.strIngredient15}</li>
                        </ul>

                        <h3 class="fw-bolder">Tags :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">

                            <li class="alert alert-danger m-2 p-1">${meal.strTags}</li>
                        </ul>

                        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                    </div>
                </div>
            </div>:`;
  mealDetails.innerHTML = mealDetailsBox;
}
