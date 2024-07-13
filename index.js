let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let allDish = document.querySelectorAll(".dishes");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let dishValue = document.querySelectorAll(".dishVal");

let count = 0;

const getData = async (value) => {
  try {
    let datas = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    let jsonData = await datas.json();
    document.querySelector(".showMeal").innerHTML = "";
    console.log(jsonData);

    jsonData.meals.map((data) => {
      // const tags = data.strTags;
      // const newTag = tags.split(",").join(" | ");
      // console.log(newTag);
      // <p>${newTag}</p>
      // newTag must check if its value is empty/null else do nothing
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
              <img src="${data.strMealThumb}" alt="">
              <h1>${data.strMeal}</h1>
              <button>View More</button>`;
      document.querySelector(".showMeal").appendChild(div);
    });
  } catch (error) {
    document.querySelector(".showMeal").innerHTML = "<h1>Dish not found</h2>";
    console.log(error);
  }
};

searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value;
  if (searchValue == "") {
    alert("Enter a valid Meal");
  } else {
    getData(searchValue);
  }
});

dishValue.forEach((dishCategory) => {
  dishCategory.addEventListener("click", () => {
    getData(dishCategory.value);
  });
});

allDish.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

function myFunc() {
  allDish.forEach((curVal) => {
    curVal.style.transform = `translateX(-${count * 100}%)`;
  });
}

nextBtn.addEventListener("click", function () {
  count++;
  console.log(count);
  if (count == allDish.length) {
    count = 0;
  }
  myFunc();
});

prevBtn.addEventListener("click", function () {
  count--;
  console.log(count);
  if (count == -1) {
    count = allDish.length - 1;
  }
  myFunc();
});
