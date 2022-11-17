type Data = {
  id: number;
  name: string;
  imageUrl: string;
  background: string;
  contributions: string;
  source: string;
};
//Global variables:
let isLoading: boolean = false;
const spinnerContainer = document.querySelector(".spinner-container");
const pioneersContent = document.querySelector(".pioneers-content");

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
};
/**Function - isLoadingStart */
const isLoadingStart = () => {
  isLoading = true;
  if (isLoading === true) spinnerContainer?.classList.remove("hidden");
};
/**Function - isLoadingStart */
const isLoadingEnd = () => {
  isLoading = false;
  if (isLoading === false) spinnerContainer?.classList.add("hidden");
};

/**
 * Fetches the api I created containing information about internet pioneers
 */
const fetchUsers = async () => {
  isLoadingStart();
  const pioneers = await getData<Data[]>(
    "https://internet-pioneers-api.herokuapp.com/pioneers"
  );
  isLoadingEnd();
  //Renders content to DOM
  pioneers.map(({ name, imageUrl, contributions, background, source }) => {
    /**
     * Function - check if data type is undefined
     * @param listItem to be eveluated
     * @returns li html element
     */
    const checkIfUndefined = (listItem: string) =>
      typeof listItem !== "undefined" ? `<li>${listItem}</li>` : "";

    pioneersContent?.insertAdjacentHTML(
      "beforeend",
      `    
      <figure class="card-container">
         <h3 class="title">${name}</h3>
         <img alt=${name} src=${imageUrl} width="200"/>
         <figcaption class="hidden">Source: <a href=${source}>${source?.substring(
        0,
        40
      )}...</a></figcaption>
         <p class="body">${background}</p>
         
         <h3>Contributions</h3>
         <ul>
          ${checkIfUndefined(contributions[0])}
          ${checkIfUndefined(contributions[1])}
          ${checkIfUndefined(contributions[2])}
         </ul>
      </figure>`
    );
  });
}; // end of fetchUsers

window.onload = () => {
  fetchUsers();
};
