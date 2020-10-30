function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const categoryArray = [];
  const result = {};
  for (let i = 0; i < restaurantList.lenth; i += 1) {
    categoryArray.push(restaurantList[i].category);
  }
  for (let i = 0; i < categoryArray.length; i += 1) {
    if (!result[categoryArray[i]]) {
      result[categoryArray[i]] = 0;
    }
    result[categoryArray[i]] += 1;
   }
  const reply = Object.keys(result).map((category) => ({
    y: result[category],
    label: category
  }));
  console.log('reply', reply);
  return reply;
}


function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
 // CanvasJS.addColorSet("customColorSet1", [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/

const chart = new CanvasJS.Chart('chartContainer', {
  animationEnabled: true,

  title: {
    text: 'Restaurants'
  },
  axisX: {
    interval:1
  },
  axisY2:{
    interLacedColor: 'rgba(1,77,101,.2)',
    gridColor: 'rgba(1,77,101,.1)',
    title: 'Number of Restaurants'
  },
  data: [{
    type: 'bar',
    name: 'Companies',
    axisYType: 'secoundary',
    color: '#014D65',
    dataPoints: datapointsFromRestaurantsList
  }]
});
chart.render();
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log("jsonFromServer", jsonFromServer);
  sessionStorage.setItem("restaurantList", JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  // const chart = new CanvasJS.Chart("chartContainer", options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener("submit", async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});
