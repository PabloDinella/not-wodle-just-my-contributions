console.log("👀");

const loadingIndicator = document.querySelector("#loading-indicator");
const result = document.querySelector("#result");
const resultingMatrix = document.querySelector("#resulting-matrix");
const tweetButton = document.querySelector("#tweet-button");

document.querySelector("form").addEventListener("submit", (event, data) => {
  console.log(event, data);

  event.preventDefault();

  loadingIndicator.classList.remove("hidden");

  fetch(
    `http://localhost:3000/api/github/${event.target.elements.username.value.replace(
      "@",
      ""
    )}`
  )
    .then((response) => response.json())
    .then((matrix) => {
      const htmlfiedMatrix = matrix
        .map((lines) => lines.join(""))
        .join("<br />");

      const stringifiedMatrix = matrix
        .map((lines) => lines.join(""))
        .join("\n");

      console.log("Your last contributions: ");
      console.log(stringifiedMatrix);

      loadingIndicator.classList.add("hidden");
      result.classList.remove("hidden");
      resultingMatrix.innerHTML = htmlfiedMatrix;

      const tweetText = [
        "Not Wordle, just my GitHub contributions",
        stringifiedMatrix,
        "Make yours at: <url></url>",
      ].join("\n\n");

      tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURI(
        tweetText
      )}`;
    });
});
