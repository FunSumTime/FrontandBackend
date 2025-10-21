console.log("connected");

// div that holds the trails

//can do const because we arent chnaging the varable
const trails_div = document.querySelector("#trial_reviews");

// fetch the stuff from our python server
// now when we add a new trail we would like the page to reload
function load() {
  //blank out the list
  trails_div.innerHTML = "";
  fetch("http://localhost:5000/trials").then(function (response) {
    // after we convert to json then we console log it
    response.json().then(function (data) {
      console.log(data);
      data.forEach(load_trails);
    });
  });
}
// for every delete button onclick it will get rid of it

function load_trails(trail) {
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  let delete_btn = document.createElement("button");
  trails_div.append(div);
  div.append(h3);
  div.append(p);
  div.append(p2);
  h3.innerHTML = trail.name;
  p.innerHTML = trail.description;
  p2.innerHTML = trail.length;
  delete_btn.innerHTML = "DELETE";
  div.append(delete_btn);
  delete_btn.onclick = function () {
    let id = trail.id;
    console.log("you are going to delete ", id);
    // putting it within the url as we do with our naming conventions
    // but since its not simple we need to do a preflight

    fetch("http://localhost:5000/trials/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function () {
      console.log("Deleted");
      load();
    });
  };
}

function do_delete(id) {}
function addNewTrail() {
  //get the form data
  let name = document.querySelector("#input_name").value;

  let description = document.querySelector("#input_description").value;
  let rating = document.querySelector("#input_rating").value;
  let length = document.querySelector("#input_length").value;
  console.log(name);
  console.log(description);
  console.log(rating);
  console.log(length);

  // building the query string to send to the backend
  // name=tom&description=...&length=...&rating=...
  // the string that will be sent via the post request
  // why do we have to encode it?
  let data = "name=" + encodeURIComponent(name);
  data += "&description=" + encodeURIComponent(description);
  data += "&rating=" + encodeURIComponent(rating);
  data += "&length=" + encodeURIComponent(length);
  // read the rest of the cors policy page

  // send to api
  fetch("http://localhost:5000/trials", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("Saved");
    load(response);
  });
  //get it ready to send to api

  // then update or display succes
}

submit_button = document.querySelector("#trial_submit_button");

submit_button.onclick = addNewTrail;

load();
