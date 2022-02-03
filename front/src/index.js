console.log("👀");

const API =
  process.env.NODE_ENV === "production"
    ? "https://not-wordle-just-my-contributions.vercel.app"
    : "http://localhost:3000";

const loadingIndicator = document.querySelector("#loading-indicator");
const result = document.querySelector("#result");
const resultingMatrix = document.querySelector("#resulting-matrix");
const tweetButton = document.querySelector("#tweet-button");
const error = document.querySelector("#error");

document.querySelector("form").addEventListener("submit", (event, data) => {
  event.preventDefault();

  loadingIndicator.classList.remove("hidden");
  result.classList.add("hidden");
  error.classList.add("hidden");

  fetch(
    `${API}/api/github/${event.target.elements.username.value.replace("@", "")}`
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

      resultingMatrix.innerHTML = htmlfiedMatrix;

      const tweetText = [
        "Not Wordle, just my GitHub contributions",
        stringifiedMatrix,
        "Make yours at: https://pablodinella.github.io/not-wodle-just-my-contributions/",
      ].join("\n\n");

      tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURI(
        tweetText
      )}`;

      loadingIndicator.classList.add("hidden");
      result.classList.remove("hidden");
      tweetButton.focus();
    })
    .catch(() => {
      loadingIndicator.classList.add("hidden");
      error.classList.remove("hidden");
    });
});
