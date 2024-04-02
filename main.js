const resultsDiv = document.querySelector("#results");

// Search  Form//
let searchForm = document.querySelector("#user-input");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let urlEnd = searchBox.value.split(" ").join("+");

  // Named API Search Parameters// Limiting 15 Results
  searchUrl = "https://itunes.apple.com/search?term=";
  searchUrl = `${searchUrl}${urlEnd}&limit=15`;

  clearTracks();
  console.log("search url", searchUrl);
  getSearchResults(searchUrl);
});

///////////////////////////////////////////////////////
function getSearchResults(url) {
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "text/javascript; charset=utf-8" },
  })
    //Responding To The Said Function//
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.status);
      } else {
        console.log(response);
        return response.json();
      }
    })

    // Data Returns Above Code//
    .then(function (data) {
      let songs = data.results;
      showTracks(songs);
      isEmpty();
    })
    .catch((error) => {
      console.log(error);
      alert(`Your request failed, beacause: ${error}`);
    });
}

/////////////////TRACK RESULTS///////////////////////////////
function showTracks(trackArray) {
  for (let track of trackArray) {
    let songDiv = document.createElement("div");
    songDiv.classList.add("song");

    // Album Artwork Div Class//
    let imageTag = document.createElement("img");
    imageTag.classList.add("albumImg");
    imageTag.src = track.artworkUrl100;
    songDiv.appendChild(imageTag);

    //Track Name Div Class //
    let trackDiv = document.createElement("div");
    trackDiv.classList.add("trackName");
    trackDiv.innerText = track.trackName;
    songDiv.appendChild(trackDiv);

    // Artist Name Div Class//
    let artistDiv = document.createElement("div");
    artistDiv.classList.add("artist");
    artistDiv.innerText = track.artistName;
    songDiv.appendChild(artistDiv);

    // Audio Player Div Class//
    let audioTag = document.createElement("audio");
    audioTag.classList.add("audio");
    audioTag.src = track.previewUrl;
    audioTag.controls = true;
    songDiv.appendChild(audioTag);

    //
    resultsDiv.appendChild(songDiv);
  }
}

//////////////// NO REULTS MESSAGE ////////
function isEmpty() {
  if (results.firstChild === null) {
    let noResults = document.createElement("p");
    noResults.classList.add("Error");
    noResults.innerText = "No results found. Please try again.";
    resultsDiv.appendChild(noResults);
  }
}

/////////////CLEARING TRACKS LOOP//////////////////////////
function clearTracks() {
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }
}
