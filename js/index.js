const gettingApi = () => {
  const inputValue = document.getElementById("search-input");
  const inputText = inputValue.value;
  inputValue.value = "";
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResults(data.drinks));
};
const displayResults = (cocktails) => {
  const results = document.getElementById("results");
  results.textContent = "";
  cocktails.forEach((cocktail) => {
    console.log(cocktail);
    const div = document.createElement("div");
    div.innerHTML = `
    <div onclick="displayResultDetails(${
      cocktail.idDrink
    })" class="card search-result">
        <img
          src="${cocktail.strDrinkThumb}"
          class="card-img-top"
        />
        <div class="card-body">
          <h4 class="card-title text-center">${cocktail.strDrink}</h4>
          <p class="card-text text-center">${cocktail.strInstructions.slice(
            0,
            30
          )}...</p>
        </div>
      </div>
    `;
    results.appendChild(div);
  });
};

const displayResultDetails = (id) => {
  console.log(id);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const individualDrink = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayDetail(data.drinks[0]));
  };
  individualDrink();
  const displayDetail = (cocktail) => {
    document.getElementById("details-result").style.display = "flex";
    const details = document.getElementById("details-result");
    details.innerHTML = `
        <div class="picture">
          <img
            class="detail-image"
            src="${cocktail.strDrinkThumb}"
            class=""
          />
        </div>
        <div class="">
            <div class="top-detail">
                <h1 class="card-title text-center">${cocktail.strDrink}</h1>
                <h6 class="card-title text-center">Category : ${
                  cocktail.strCategory
                }</h6>
                <h6 class="card-title text-center">Drink Type : ${
                  cocktail.strAlcoholic
                }</h6>
            </div>
            <div class="middle-detail">
                <h3 class="card-title text-center">Instructions</h3>
                <p>${cocktail.strInstructions.slice(0, 250)}</p>
                <p>${cocktail.strInstructionsDE.slice(0, 250)}</p>
                <p>${cocktail.strInstructionsIT.slice(0, 250)}</p>
            </div>
            <div class="bottom-detail">
                <h3 class="card-title text-center">Ingredients</h3>
                <h6 class="text-center">${cocktail.strIngredient1} | ${
      cocktail.strIngredient2
    } | ${cocktail.strIngredient3} | ${cocktail.strIngredient4} | ${
      cocktail.strIngredient5
    } </h6>
            </div>
        </div>
        <button onclick="closeDetail()" id="detail-cancel-button">×</button>
      `;
  };
};
const closeDetail = () => {
  document.getElementById("details-result").style.display = "none";
};
