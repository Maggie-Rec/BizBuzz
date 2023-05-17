const API_KEY = "AnrgHGhpzYe9AyrUL-Da6y52WE4BtRs2frkUl6UFanzOodvn2WLBKk_os2yk6oq2";

export async function getCoordinates(searchQuery: string) {
  const url = new URL(`http://dev.virtualearth.net/REST/v1/Locations/${searchQuery}?includeNeighborhood=0&maxResults=1&key=${API_KEY}`);
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  response = await response.json();
  let coords = response.resourceSets[0].resources[0].point.coordinates;
  return coords;
};

export async function getMapImage(coordinates: number[]) {
  const cString = coordinates.toString();
  const url = new URL(`https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/${cString}/13?key=${API_KEY}&pushpin=${cString};64;`);
  let response = await fetch(url);
  let imageData = await response.blob();
  return URL.createObjectURL(imageData);
};


