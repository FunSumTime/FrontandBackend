console.log("connected");

let edit_id = null;

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
  reset_form();
}
// for every delete button onclick it will get rid of it

function load_trails(trail) {
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let p2 = document.createElement("p");
  let delete_btn = document.createElement("button");
  let edit_button = document.createElement("button");

  trails_div.append(div);
  div.append(h3);
  div.append(p);
  div.append(p2);
  h3.innerHTML = trail.name;
  p.innerHTML = trail.description;
  p2.innerHTML = trail.length;

  ///
  // added delete and edit button
  delete_btn.innerHTML = "DELETE";
  div.append(delete_btn);
  edit_button.innerHTML = "EDIT";
  div.append(edit_button);
  ///
  // delete
  delete_btn.onclick = function () {
    let id = trail.id;
    console.log("you are going to delete ", id);
    let foo = confirm("Are you sure?");
    console.log(foo);
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

  edit_button.onclick = function () {
    do_edit(trail);
  };
}
// edit
function do_edit(trail) {
  console.log("You are going to edit trail: ", trail.id);
  document.querySelector("#input_name").value = trail.name;

  document.querySelector("#input_description").value = trail.description;
  document.querySelector("#input_rating").value = trail.rating;
  document.querySelector("#input_length").value = trail.length;
  document.querySelector("#trial_submit_button").innerHTML = "SAVE";
  edit_id = trail.id;
}

function reset_form() {
  document.querySelector("#input_name").value = "";

  document.querySelector("#input_description").value = "";
  document.querySelector("#input_rating").value = "";
  document.querySelector("#input_length").value = "";
  document.querySelector("#trial_submit_button").innerHTML = "Submit";
  edit_id = null;
}

// function do_delete(id) {}
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
  let submit_method = "POST";
  let url = "http://localhost:5000/trials";
  // read the rest of the cors policy page
  const button_text = document.querySelector("#trial_submit_button").innerHTML;
  if (button_text == "SAVE") {
    submit_method = "PUT";
    url = "http://localhost:5000/trials/" + edit_id;
  }

  // send to api
  fetch(url, {
    method: submit_method,
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

// this might be messing stuff up
load();
