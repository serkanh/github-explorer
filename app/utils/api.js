var axios = require("axios");
var labels = ["security", "js"];
module.exports = {
  constructUri: constructUri,
  fetchReposWithLabels: fetchReposWithLabels,
  stringToArray: stringToArray
};

/**
 * @param {string}
 * @return {Array.<{name: string, html_url: string, description: string, github_stars: Number}>}
 */
function fetchReposWithLabels(label) {
  var arr = stringToArray(label);
  var params = constructUri(arr);
  var encodedUrl = window.encodeURI(
    "https://api.github.com/search/repositories?q=" +
      params +
      "&sort=stars&order=desc"
  );
  return axios
    .get(encodedUrl)
    .then(function(response) {
      return response.data.items;
    })
    .then(function(data) {
      return data.map(function(element) {
        return {
          name: element.name,
          html_url: element.html_url,
          description: element.description,
          github_stars: element.stargazers_count,
          owner_avatar_url: element.owner.avatar_url
        };
      });
    });
}

/**
 * A function that receives a comma seperated string
 * and return an array.
 * @params{string}
 */

function stringToArray(str) {
  return str.split(",");
}

/**
 * A function to construct url with given array of tags
 * @params {string[]}
 */
function constructUri(tagarray) {
  return tagarray
    .map(function(value, i, array) {
      if (array.length - 1 === i) {
        return "topic:" + value;
      }
      return "topic:" + value + "+";
    })
    .join("");
}
