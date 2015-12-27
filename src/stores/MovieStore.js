var EventsSingleton = require('../../src/Service/events.js');


var MovieStore = function(){
  var items = [
      {
        "id": "1",
        "title": "Ocean's 11",
        "url": "https://en.wikipedia.org/wiki/Ocean%27s_11",
        "image": "https://upload.wikimedia.org/wikipedia/en/6/68/Ocean%27s_Eleven_2001_Poster.jpg"
      },
      {
        "id": "2",
        "title": "The Bourne Supremacy",
        "url": "https://en.wikipedia.org/wiki/The_Bourne_Supremacy_(film)",
        "image": "https://upload.wikimedia.org/wikipedia/en/3/30/Bourne_supremacy_ver2.jpg"
      },
      {
        "id": "3",
        "title": "500 Days of Summer",
        "url": "https://en.wikipedia.org/wiki/500_Days_of_Summer",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/d1/Five_hundred_days_of_summer.jpg"
      },
      {
        "id": "4",
        "title": "The Terminal",
        "url": "https://en.wikipedia.org/wiki/The_Terminal",
        "image": "https://upload.wikimedia.org/wikipedia/en/8/86/Movie_poster_the_terminal.jpg"
      },
      {
        "id": "5",
        "title": "Mission: Impossible – Rogue Nation",
        "url": "https://en.wikipedia.org/wiki/Mission:_Impossible_%E2%80%93_Rogue_Nation",
        "image": "https://upload.wikimedia.org/wikipedia/en/f/fb/Mission_Impossible_Rogue_Nation_poster.jpg"
      },
      {
        "id": "6",
        "title": "Up",
        "url": "https://en.wikipedia.org/wiki/Up_(2009_film)",
        "image": "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg"
      },
      {
        "id": "7",
        "title": "Elf",
        "url": "https://en.wikipedia.org/wiki/Elf_(film)",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/df/Elf_movie.jpg"
      },
      {
        "id": "8",
        "title": "A Christmas Carol",
        "url": "https://en.wikipedia.org/wiki/A_Christmas_Carol_(1938_film)",
        "image": "https://upload.wikimedia.org/wikipedia/en/f/ff/CCPoster_art-1938.jpg"
      }
    ];

  var getAll = function() {
    return items;
  };

  // Add item to the store
  var addItem = function(item) {
    var last = getLastId();
    var id = (last)*1+1;
    console.log('New id: %s', id);
    item.id = id;

    items.push(item);
    // Call dom-change event
    EventsSingleton.emitter.emit('dom-change', this.getAll());
  };

  var getLastId = function() {
    var lastIndex = items.length;
    var last = items[lastIndex-1];
    return last.id;
  };

  return {
    getAll: getAll,
    addItem: addItem
  }
};


module.exports = new MovieStore();