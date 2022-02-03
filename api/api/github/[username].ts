import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import parse from "github-calendar-parser";

const GRID_SIZE = 5;

export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");

  const { username } = request.query;

  const contributionsHtml = await axios.get(
    `https://github.com/users/${username}/contributions`
  );

  const contributionsSvg =
    contributionsHtml.data.match(/(<svg[\s\S]*?svg>)/g)[0];

  const lastContributions = parse(contributionsSvg).days.splice(
    -(GRID_SIZE ** 2)
  );

  const placeholderArray = Array(GRID_SIZE).fill(undefined);

  function generateLine({ lineNth, contributions }) {
    return placeholderArray.map((_, i) => {
      const contributionIndex = i + lineNth * GRID_SIZE;
      const contribution = contributions[contributionIndex];
      return Number(contribution.level) > 0 ? "🟩" : "⬛";
    });
  }

  const rows = placeholderArray.map((_, i) => {
    const line = generateLine({
      lineNth: i,
      contributions: lastContributions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    });

    return line;
  });

  const matrix = rows.map((row, index) => {
    const newLine = placeholderArray.map((_, elementIndex) => {
      const line = rows[rows.length - elementIndex - 1];

      return line[line.length - index - 1];
    });

    return newLine;
  });

  response.status(200).send(matrix);
};
