const DDG = require('duck-duck-scrape');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

async function search(query) {
  let searchResults = await DDG.search(query, {
    safeSearch: DDG.SafeSearchType.STRICT
  });
  searchResults = searchResults.results
  const formattedResults = searchResults.map(result => ({
      title: result.title,
      url: result.url,
      description: result.description
  }));
  return formattedResults;
}

function no(res, message = "DENIES") {
  res.statusCode = 400;
  res.end(message);
}

app.post("/api/search", async (req, res, next) => {
  if (!req.body.query) return no(res, "Query parameter missing");

  const query = req.body.query;
  const output = await search(query);

  res.json(output);
});

app.use(express.static(`${__dirname}/web`));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
