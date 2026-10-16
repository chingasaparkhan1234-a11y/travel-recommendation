document.addEventListener("DOMContentLoaded", () => {
  const btnSearch = document.getElementById("btnSearch");
  const btnClear = document.getElementById("btnClear");
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("resultsContainer");

  let travelData = null;

  fetch("./travel_recommendation_api.json")
    .then(res => res.json())
    .then(data => { travelData = data; })
    .catch(err => console.error(err));

  btnSearch.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (!query || !travelData) {
      alert("Please enter a keyword (beach, temple, or country).");
      return;
    }

    let results = [];
    if (query === "beach" || query === "beaches") {
      results = travelData.beaches;
    } else if (query === "temple" || query === "temples") {
      results = travelData.temples;
    } else if (query === "country" || query === "countries") {
      results = travelData.countries[0].cities;
    } else {
      const matched = travelData.countries.find(c => c.name.toLowerCase().includes(query));
      if (matched) results = matched.cities;
    }

    if (results && results.length > 0) {
      results.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}">
          <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;
        resultsContainer.appendChild(card);
      });
    } else {
      resultsContainer.innerHTML = `<p style="padding: 1rem; background: #1e293b; border-radius: 8px;">No recommendations found.</p>`;
    }
  });

  btnClear.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
  });
});
