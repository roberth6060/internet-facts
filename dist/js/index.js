"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isLoading = false;
const spinnerContainer = document.querySelector(".spinner-container");
const pioneersContent = document.querySelector(".pioneers-content");
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    return yield response.json();
});
const isLoadingStart = () => {
    isLoading = true;
    if (isLoading === true)
        spinnerContainer === null || spinnerContainer === void 0 ? void 0 : spinnerContainer.classList.remove("hidden");
};
const isLoadingEnd = () => {
    isLoading = false;
    if (isLoading === false)
        spinnerContainer === null || spinnerContainer === void 0 ? void 0 : spinnerContainer.classList.add("hidden");
};
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    isLoadingStart();
    const pioneers = yield getData("https://internet-pioneers-api.herokuapp.com/pioneers");
    isLoadingEnd();
    pioneers.map(({ name, imageUrl, contributions, background, source }) => {
        const checkIfUndefined = (listItem) => typeof listItem !== "undefined" ? `<li>${listItem}</li>` : "";
        pioneersContent === null || pioneersContent === void 0 ? void 0 : pioneersContent.insertAdjacentHTML("beforeend", `    
      <figure class="card-container">
         <h3 class="title">${name}</h3>
         <img alt=${name} src=${imageUrl} width="200"/>
         <figcaption class="hidden">Source: <a href=${source}>${source === null || source === void 0 ? void 0 : source.substring(0, 40)}...</a></figcaption>
         <p class="body">${background}</p>
         
         <h3>Contributions</h3>
         <ul>
          ${checkIfUndefined(contributions[0])}
          ${checkIfUndefined(contributions[1])}
          ${checkIfUndefined(contributions[2])}
         </ul>
      </figure>`);
    });
});
window.onload = () => {
    fetchUsers();
};
//# sourceMappingURL=index.js.map