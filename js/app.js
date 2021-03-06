// Simple JQuery Note Sample App

var Note = function(title, content) {
  this.title = title;
  this.content = content;
}

var printNote = function(note) {
  console.log(note);
}

var defaultNote = new Note('Default Note', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

printNote(defaultNote);

var appendNote = function(note) {
  var noteContainer = '.note-items';
  $(noteContainer).prepend("<div class='note-item col-md-3'><h3>" + note.title + "</h3><p>" + note.content + "</p></div>");
}
var addNote = function(note) {
  appendNote(note);
}



// cool thing - meow
var appendThing = function (name, url, gender) {
  var suffix = "";

  if (gender === "male") {
    suffix = "Mr "
  } else {
    suffix = "Lil "
  }

  $('.note-items').prepend("<div class='note-item col-md-3'><h3>This is " + suffix + name + "</h3><img src='" + url + "' class='randoGif'></div>");
}

var aThing = function () {
  $.getJSON('http://uinames.com/api/', function (data) {
    var nameObj = data;
    return nameObj
  }).then(function (nameObj) {
    $.getJSON('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat', function (data) {
      var giphyObj = data.data;

      console.log(giphyObj);
      console.log(nameObj);

      appendThing(nameObj.name, giphyObj.image_url, nameObj.gender);
    })
  })
}

var appendGif = function (url) {
  $('.note-items').prepend("<div class='note-item col-md-3'><img src='" + url + "' class='randoGif'></div>");
}

var gifCategroy = function () {
  var category = $('#gifCategroy').val();

  $.getJSON('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + category, function (data) {
    var giphyObj = data.data;
    appendGif(giphyObj.image_url);
  });
  
  console.log("gif category: " + category);
}

// var addFamousNote = function() {
//   $.getJSON('https://wisdomapi.herokuapp.com/v1/random?callback=?',function(data) {
//     console.log(data);

//     var note = new Note(data.author.name, data.content);
//     addNote(note);

//   })
// }




var updateNoteCount = function() {
  $('.notes div:first-child h1').eq(0).text("Notes: " + $('.note-item').length);
}

addNote(defaultNote);

$('#addDefaultNote').click(function(e) {
    addNote(defaultNote);
    updateNoteCount();
});

$('#addFamousQuote').click(function(e) {
  aThing();
  // addFamousNote();
  updateNoteCount();
});

$('#addGif').click(function(e) {
  gifCategroy();
})



// Simple Angular App

// Define Angular App
var notesApp = angular.module('notesApp', []);

notesApp.controller('NoteController', function NoteController($scope) {
  var vm = this;
  vm.all = [
    {
      title: "Angular Default Note",
      content: "This is a note that was defined within our js/app.js javascript file."
    }
  ];

  vm.addNote = function() {
    vm.all.push({ title: vm.formnote.title , content: vm.formnote.content });
    vm.resetNote();
  }

  vm.resetNote = function() {
    vm.formnote.title = "";
    vm.formnote.content = "";
  }

  console.log("Angular is working, Sanity Check");

});
