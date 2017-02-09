(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFetch = exports.nextUrl = undefined;

var _drawPokemon = require('./drawPokemon');

var _drawPokemon2 = _interopRequireDefault(_drawPokemon);

var _loadMoreBtn = require('./loadMoreBtn');

var _loadMoreBtn2 = _interopRequireDefault(_loadMoreBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import fetchDate from './apiService';

var request = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';
var query = 'http://pokeapi.co';
var nextUrl = exports.nextUrl = '';
var container = document.getElementById('post-container');

var makeFetch = exports.makeFetch = function makeFetch(url) {
    fetch(url).then(function (response) {
        //console.log(response);
        return response.json();
    }).then(function (pokeList) {
        //console.log(pokeList.objects);
        (0, _drawPokemon2.default)(container, pokeList.objects);
        exports.nextUrl = nextUrl = query + pokeList.meta.next;
        console.log(nextUrl);
        //let url = query + pokeList.objects[0].resource_uri;
        //return fetch(url);
    });
};
/*.then((pokeInfo)=>{
    console.log(pokeInfo);
    return pokeInfo.json();
})
  .then((pokemon) => {
    console.log(pokemon);
});
}*/

makeFetch(request);

var btnT = document.querySelector('.loadMoreBtn');
btnT.addEventListener('click', makeFetch(nextUrl));

},{"./drawPokemon":2,"./loadMoreBtn":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getType = require('./getType');

var _getType2 = _interopRequireDefault(_getType);

var _loadMoreBtn = require('./loadMoreBtn');

var _loadMoreBtn2 = _interopRequireDefault(_loadMoreBtn);

var _app = require('./app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (container, arr) {
  var pokemonId = [];
  //for(let i =0; i<arr.length; i++)
  arr.forEach(function (item, i, arr) {
    pokemonId.push(arr[i].pkdx_id);
    var imgRequest = "http://pokeapi.co/media/img/";
    var id = arr[i].pkdx_id;
    var div = document.createElement('div');
    div.className = 'post';
    var img = document.createElement('IMG');
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/' + id + '.png';
    var name = document.createElement('span');
    name.className = "name";
    name.innerHTML = arr[i].name;
    container.appendChild(div);
    div.appendChild(img);
    div.appendChild(name);
    (0, _getType2.default)(arr[i].types, div);
  });

  //
  //btn.addEventListener('click', makeFetch(nextUrl));
};

},{"./app":1,"./getType":3,"./loadMoreBtn":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr, tag) {

    arr.forEach(function (item, i, arr) {
        var types = document.createElement('span');
        types.className = "types";
        types.innerHTML = item.name;
        tag.appendChild(types);
    });
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	var btn = document.createElement('BUTTON');
	btn.id = 'loadMoreBtn';
	btn.innerHTML = 'Load more';
	var blockBtn = document.getElementById('btn');
	blockBtn.appendChild(btn);

	//btn.addEventListener('click', makeFetch(nextUrl));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGRyYXdQb2tlbW9uLmpzIiwic3JjXFxhcHBcXGdldFR5cGUuanMiLCJzcmNcXGFwcFxcbG9hZE1vcmVCdG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBQ0E7O0FBRUEsSUFBSSxVQUFVLHNEQUFkO0FBQ0EsSUFBSSxRQUFRLG1CQUFaO0FBQ08sSUFBSSw0QkFBVSxFQUFkO0FBQ1AsSUFBTSxZQUFZLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBbEI7O0FBRU8sSUFBSSxnQ0FBWSxTQUFaLFNBQVksQ0FBQyxHQUFELEVBQVM7QUFDaEMsVUFBTSxHQUFOLEVBQ0ssSUFETCxDQUNVLFVBQUMsUUFBRCxFQUFhO0FBQ2Y7QUFDQSxlQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0gsS0FKTCxFQUtLLElBTEwsQ0FLVSxVQUFDLFFBQUQsRUFBWTtBQUNkO0FBQ0EsbUNBQVksU0FBWixFQUF1QixTQUFTLE9BQWhDO0FBQ0EsZ0JBWkcsT0FZSCxhQUFVLFFBQVEsU0FBUyxJQUFULENBQWMsSUFBaEM7QUFDQSxnQkFBUSxHQUFSLENBQVksT0FBWjtBQUNBO0FBQ0E7QUFDSCxLQVpMO0FBYUMsQ0FkTTtBQWVIOzs7Ozs7Ozs7QUFVSixVQUFVLE9BQVY7O0FBRUEsSUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFYO0FBQ0EsS0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFVLE9BQVYsQ0FBL0I7Ozs7Ozs7OztBQ3JDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7a0JBR2UsVUFBQyxTQUFELEVBQVksR0FBWixFQUFvQjtBQUNsQyxNQUFJLFlBQVksRUFBaEI7QUFDSTtBQUNBLE1BQUksT0FBSixDQUFZLFVBQVMsSUFBVCxFQUFlLENBQWYsRUFBa0IsR0FBbEIsRUFBc0I7QUFDakMsY0FBVSxJQUFWLENBQWUsSUFBSSxDQUFKLEVBQU8sT0FBdEI7QUFDQSxRQUFJLGFBQWEsOEJBQWpCO0FBQ0EsUUFBSSxLQUFLLElBQUksQ0FBSixFQUFPLE9BQWhCO0FBQ0EsUUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsUUFBSSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0EsUUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsUUFBSSxHQUFKLGdIQUFtSCxFQUFuSDtBQUNBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWDtBQUNBLFNBQUssU0FBTCxHQUFpQixNQUFqQjtBQUNBLFNBQUssU0FBTCxHQUFpQixJQUFJLENBQUosRUFBTyxJQUF4QjtBQUNBLGNBQVUsV0FBVixDQUFzQixHQUF0QjtBQUNNLFFBQUksV0FBSixDQUFnQixHQUFoQjtBQUNOLFFBQUksV0FBSixDQUFnQixJQUFoQjtBQUNFLDJCQUFTLElBQUksQ0FBSixFQUFPLEtBQWhCLEVBQXVCLEdBQXZCO0FBQ0YsR0FmRDs7QUFpQkg7QUFDTTtBQUNQLEM7Ozs7Ozs7OztrQkMzQmMsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFhOztBQUV4QixRQUFJLE9BQUosQ0FBWSxVQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXNCO0FBQ2xDLFlBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNHLGNBQU0sU0FBTixHQUFrQixPQUFsQjtBQUNBLGNBQU0sU0FBTixHQUFrQixLQUFLLElBQXZCO0FBQ0EsWUFBSSxXQUFKLENBQWdCLEtBQWhCO0FBQ0YsS0FMRDtBQU9ILEM7Ozs7Ozs7OztrQkNSYyxZQUFNOztBQUVwQixLQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVY7QUFDQSxLQUFJLEVBQUosR0FBUyxhQUFUO0FBQ0EsS0FBSSxTQUFKLEdBQWdCLFdBQWhCO0FBQ0EsS0FBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFmO0FBQ0EsVUFBUyxXQUFULENBQXFCLEdBQXJCOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZHJhd1Bva2Vtb24gZnJvbSAnLi9kcmF3UG9rZW1vbic7XHJcbmltcG9ydCBjcmVhdGVCdG4gZnJvbSAnLi9sb2FkTW9yZUJ0bic7XHJcbi8vaW1wb3J0IGZldGNoRGF0ZSBmcm9tICcuL2FwaVNlcnZpY2UnO1xyXG5cclxubGV0IHJlcXVlc3QgPSAnaHR0cDovL3Bva2VhcGkuY28vYXBpL3YxL3Bva2Vtb24vP2xpbWl0PTEyJm9mZnNldD0xMic7XHJcbmxldCBxdWVyeSA9ICdodHRwOi8vcG9rZWFwaS5jbyc7XHJcbmV4cG9ydCBsZXQgbmV4dFVybCA9ICcnO1xyXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250YWluZXInKTtcclxuXHJcbmV4cG9ydCBsZXQgbWFrZUZldGNoID0gKHVybCkgPT4ge1xyXG5mZXRjaCh1cmwpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+e1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHBva2VMaXN0KT0+e1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocG9rZUxpc3Qub2JqZWN0cyk7XHJcbiAgICAgICAgZHJhd1Bva2Vtb24oY29udGFpbmVyLCBwb2tlTGlzdC5vYmplY3RzKTtcclxuICAgICAgICBuZXh0VXJsID0gcXVlcnkgKyBwb2tlTGlzdC5tZXRhLm5leHQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV4dFVybCk7XHJcbiAgICAgICAgLy9sZXQgdXJsID0gcXVlcnkgKyBwb2tlTGlzdC5vYmplY3RzWzBdLnJlc291cmNlX3VyaTtcclxuICAgICAgICAvL3JldHVybiBmZXRjaCh1cmwpO1xyXG4gICAgfSk7XHJcbn1cclxuICAgIC8qLnRoZW4oKHBva2VJbmZvKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBva2VJbmZvKTtcclxuICAgICAgICByZXR1cm4gcG9rZUluZm8uanNvbigpO1xyXG4gICAgfSlcclxuXHJcbiAgICAudGhlbigocG9rZW1vbikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBva2Vtb24pO1xyXG4gICAgfSk7XHJcbn0qL1xyXG5cclxubWFrZUZldGNoKHJlcXVlc3QpO1xyXG5cclxudmFyIGJ0blQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZE1vcmVCdG4nKTtcclxuYnRuVC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1ha2VGZXRjaChuZXh0VXJsKSk7XHJcblxyXG4iLCJpbXBvcnQgZ2V0VHlwZXMgZnJvbSAnLi9nZXRUeXBlJztcclxuaW1wb3J0IGNyZWF0ZUJ0biBmcm9tICcuL2xvYWRNb3JlQnRuJztcclxuaW1wb3J0IHtuZXh0VXJsfSBmcm9tICcuL2FwcCc7XHJcbmltcG9ydCB7bWFrZUZldGNofSBmcm9tICcuL2FwcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoY29udGFpbmVyLCBhcnIpID0+IHtcclxuXHRsZXQgcG9rZW1vbklkID0gW107XHJcbiAgICBcdC8vZm9yKGxldCBpID0wOyBpPGFyci5sZW5ndGg7IGkrKylcclxuICAgIFx0YXJyLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSwgYXJyKXtcclxuICAgIFx0XHRwb2tlbW9uSWQucHVzaChhcnJbaV0ucGtkeF9pZCk7XHJcbiAgICBcdFx0bGV0IGltZ1JlcXVlc3QgPSBcImh0dHA6Ly9wb2tlYXBpLmNvL21lZGlhL2ltZy9cIjtcclxuICAgIFx0XHRsZXQgaWQgPSBhcnJbaV0ucGtkeF9pZDtcclxuICAgIFx0XHRsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBcdFx0ZGl2LmNsYXNzTmFtZSA9ICdwb3N0JzsgXHJcbiAgICBcdFx0bGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgXHRcdGltZy5zcmM9YGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi9vdGhlci1zcHJpdGVzL29mZmljaWFsLWFydHdvcmsvJHtpZH0ucG5nYFxyXG4gICAgXHRcdGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgXHRcdG5hbWUuY2xhc3NOYW1lID0gXCJuYW1lXCI7XHJcbiAgICBcdFx0bmFtZS5pbm5lckhUTUwgPSBhcnJbaV0ubmFtZTtcclxuICAgIFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBcdFx0ZGl2LmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgICBcdFx0Z2V0VHlwZXMoYXJyW2ldLnR5cGVzLCBkaXYpO1xyXG4gICAgXHR9KTtcclxuXHJcblx0XHQvL1xyXG4gICAgICAgIC8vYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFrZUZldGNoKG5leHRVcmwpKTtcclxufVxyXG5cdCIsImV4cG9ydCBkZWZhdWx0IChhcnIsIHRhZykgPT57XHJcblxyXG5cdFx0XHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycil7XHJcblx0XHRcdFx0bGV0IHR5cGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgXHRcdFx0dHlwZXMuY2xhc3NOYW1lID0gXCJ0eXBlc1wiO1xyXG4gICAgXHRcdFx0dHlwZXMuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xyXG4gICAgXHRcdFx0dGFnLmFwcGVuZENoaWxkKHR5cGVzKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcbn1cdFx0XHRcdCIsIlxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcblx0XHJcblx0bGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG5cdGJ0bi5pZCA9ICdsb2FkTW9yZUJ0bic7XHJcblx0YnRuLmlubmVySFRNTCA9ICdMb2FkIG1vcmUnO1xyXG5cdGxldCBibG9ja0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4nKTtcclxuXHRibG9ja0J0bi5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuXHQvL2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1ha2VGZXRjaChuZXh0VXJsKSk7XHJcbn0iXX0=
