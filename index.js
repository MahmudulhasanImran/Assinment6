//  CATEGORY SECTION

const catagory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      displaycatagory(data.categories);
      loadCataory(data.categories[0].id); // first category active
    });
};

const displaycatagory = categories => {
  const container = document.getElementById("catagoriese");

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button 
        id="catActBtn-${cat.id}"
        onclick="loadCataory(${cat.id})"
        class="btn btn-wide shadow-none justify-start text-left Catebtn">
        ${cat.category_name}
      </button>
    `;
    container.appendChild(div);
  });
};

const removeActive = () => {
  document.querySelectorAll(".Catebtn").forEach(btn => {
    btn.classList.remove("active");
  });
};

const loadCataory = id => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      document.getElementById(`catActBtn-${id}`).classList.add("active");
      displayPlants(data.plants);
    });
};


  //  PLANT CARD


const displayPlants = plants => {
  const container = document.getElementById("plantes");
  container.innerHTML = "";

  plants.forEach(tree => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 shadow-sm flex flex-col h-[480px]">
        <figure class="h-[160px] overflow-hidden">
          <img src="${tree.image}" class="w-full h-full object-cover rounded-xl"/>
        </figure>
        <div class="card-body flex-1 overflow-auto">
          <h2 onclick="PlantDetails('${tree.id}')" class="card-title cursor-pointer">
            ${tree.name}
          </h2>
          <p>${tree.description}</p>
        </div>
        <div class="flex justify-between items-center mb-3 px-5">
          <p>৳${tree.price}</p>
        </div>
        <div class="px-5 mb-3">
          <button 
            class="bg-[#15803D] text-white w-full rounded-[50px] py-2 cartBtn"
            data-name="${tree.name}"
            data-price="${tree.price}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  addCartEvent();
};

//modal

const PlantDetails = async id => {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  const p = data.plants;

  document.getElementById("PlantsDetailes-Container").innerHTML = `
    <h2 class="text-xl font-bold mb-3">${p.name}</h2>
    <img src="${p.image}" class="w-full h-[200px] object-cover rounded mb-3"/>
    <p><b>Category:</b> ${p.category}</p>
    <p><b>Price:</b> ৳${p.price}</p>
    <p class="mt-3">${p.description}</p>
  `;

  document.getElementById("PlanteModal").showModal();
};

//cart system

let cart = [];
let total = 0;

const addCartEvent = () => {
  document.querySelectorAll(".cartBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const name = e.target.dataset.name;
      const price = Number(e.target.dataset.price);

      cart.push({ name, price });
      total += price;
      updateCart();

      alert(`${name} added to cart 🌱`);
    });
  });
};

const updateCart = () => {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ৳${item.price}`;
    li.style.listStyle = "none";
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ৳${total}`;
};

const clearCart = () => {
  cart = [];
  total = 0;
  updateCart();
};



catagory();

