const cardMiniatures = document.querySelector("#card-miniatures");

// Creates HTML card miniature in index.html
function createMiniature(cardObject) {
  const div = document.createElement("div");
  div.className = "card-miniature";
  div.setAttribute("data-cards-id", cardObject.id);

  div.innerHTML = `
    <div class="face face-1">
      <div class="content">
        <div class="icon-outer">
          <img
            src="${cardObject.img}"
            alt="${cardObject.title}"
            class="icon"
          />
        </div>
        <h3 class="card-title" id="card-title">${cardObject.title}</h3>
      </div>
    </div>
    <div class="face face-2">
      <div class="content">
        <small class="author"
          >Author: <span id="author">${cardObject.author}</span></small
        >
        <p>${cardObject.description}</p>
      </div>
      <div class="btn">
        <a href="./view-cards.html" target="_self" class="go-to"
          >Go to
          <div class="border border-1"></div>
          <div class="border border-2"></div>
          <div class="border border-3"></div>
          <div class="border border-4"></div>
        </a>
      </div>
    </div>
    `;

  cardMiniatures.appendChild(div);
}

export { createMiniature };
