
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {

    let noteatenElem = $("#notEatenBurgers");
    let eatenElem = $("#eatenBurgers");

    let burgers = data.burgers;
    let len = burgers.length;

    for (let i = 0; i < len; i++) {
      let new_elem =
        "<li>" +
        burgers[i].id +
        ". " + burgers[i].burger_name +
        "<button class='change-devour' data-id='" +
        burgers[i].id +
        "' data-newdevour='" +
        !burgers[i].devoured +
        "'>";

      if (burgers[i].devoured) {
        new_elem += "</button>";

        new_elem +=
          "<button class='delete-burger' data-id='" +
          burgers[i].id +
          "'>Delete</button></li>";
      } else {
        new_elem += "Devour";
      }

      if (burgers[i].devoured) {
        eatenElem.append(new_elem);
      } else {
        noteatenElem.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-devour", function (event) {
    let id = $(this).data("id");
    let newdevour = $(this).data("newdevour") === true;

    let newdevourState = {
      devoured: newdevour
    };

  
    
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newdevourState),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("Changed devour to " + newdevour);

      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {

    event.preventDefault();

    let newBurger = {
      burger_name: $("#burgerData").val().trim()
    };

    
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: 'json',
      contentType: 'application/json'
    }).then(function () {
      console.log("Created new burger! " + newBurger);

      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function (event) {
    let id = $(this).data("id");


    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("Deleted burger", id);

      location.reload();
    });
  });
});