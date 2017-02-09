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
    });
};

makeFetch(request);
(0, _loadMoreBtn2.default)();
var btnT = document.querySelector('.loadMoreBtn');
btnT.addEventListener('click', function () {
    return makeFetch(nextUrl);
});

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
	btn.className = 'loadMoreBtn';
	btn.innerHTML = 'Load more';
	var blockBtn = document.getElementById('btn');
	blockBtn.appendChild(btn);

	//btn.addEventListener('click', makeFetch(nextUrl));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGRyYXdQb2tlbW9uLmpzIiwic3JjXFxhcHBcXGdldFR5cGUuanMiLCJzcmNcXGFwcFxcbG9hZE1vcmVCdG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBQ0E7O0FBRUEsSUFBSSxVQUFVLHNEQUFkO0FBQ0EsSUFBSSxRQUFRLG1CQUFaO0FBQ08sSUFBSSw0QkFBVSxFQUFkO0FBQ1AsSUFBTSxZQUFZLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBbEI7O0FBRU8sSUFBSSxnQ0FBWSxTQUFaLFNBQVksQ0FBQyxHQUFELEVBQVM7QUFDaEMsVUFBTSxHQUFOLEVBQ0ssSUFETCxDQUNVLFVBQUMsUUFBRCxFQUFhO0FBQ2Y7QUFDQSxlQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0gsS0FKTCxFQUtLLElBTEwsQ0FLVSxVQUFDLFFBQUQsRUFBWTtBQUNkO0FBQ0EsbUNBQVksU0FBWixFQUF1QixTQUFTLE9BQWhDO0FBQ0EsZ0JBWkcsT0FZSCxhQUFVLFFBQVEsU0FBUyxJQUFULENBQWMsSUFBaEM7QUFDQSxnQkFBUSxHQUFSLENBQVksT0FBWjtBQUVILEtBWEw7QUFZQyxDQWJNOztBQWVQLFVBQVUsT0FBVjtBQUNBO0FBQ0EsSUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFYO0FBQ0EsS0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQjtBQUFBLFdBQUssVUFBVSxPQUFWLENBQUw7QUFBQSxDQUEvQjs7Ozs7Ozs7O0FDM0JBOzs7O0FBQ0E7Ozs7QUFDQTs7OztrQkFHZSxVQUFDLFNBQUQsRUFBWSxHQUFaLEVBQW9CO0FBQ2xDLE1BQUksWUFBWSxFQUFoQjtBQUNJO0FBQ0EsTUFBSSxPQUFKLENBQVksVUFBUyxJQUFULEVBQWUsQ0FBZixFQUFrQixHQUFsQixFQUFzQjtBQUNqQyxjQUFVLElBQVYsQ0FBZSxJQUFJLENBQUosRUFBTyxPQUF0QjtBQUNBLFFBQUksYUFBYSw4QkFBakI7QUFDQSxRQUFJLEtBQUssSUFBSSxDQUFKLEVBQU8sT0FBaEI7QUFDQSxRQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxRQUFJLFNBQUosR0FBZ0IsTUFBaEI7QUFDQSxRQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxRQUFJLEdBQUosZ0hBQW1ILEVBQW5IO0FBQ0EsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLElBQUksQ0FBSixFQUFPLElBQXhCO0FBQ0EsY0FBVSxXQUFWLENBQXNCLEdBQXRCO0FBQ00sUUFBSSxXQUFKLENBQWdCLEdBQWhCO0FBQ04sUUFBSSxXQUFKLENBQWdCLElBQWhCO0FBQ0UsMkJBQVMsSUFBSSxDQUFKLEVBQU8sS0FBaEIsRUFBdUIsR0FBdkI7QUFDRixHQWZEO0FBaUJKLEM7Ozs7Ozs7OztrQkN6QmMsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFhOztBQUV4QixRQUFJLE9BQUosQ0FBWSxVQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXNCO0FBQ2xDLFlBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNHLGNBQU0sU0FBTixHQUFrQixPQUFsQjtBQUNBLGNBQU0sU0FBTixHQUFrQixLQUFLLElBQXZCO0FBQ0EsWUFBSSxXQUFKLENBQWdCLEtBQWhCO0FBQ0YsS0FMRDtBQU9ILEM7Ozs7Ozs7OztrQkNSYyxZQUFNOztBQUVwQixLQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVY7QUFDQSxLQUFJLFNBQUosR0FBZ0IsYUFBaEI7QUFDQSxLQUFJLFNBQUosR0FBZ0IsV0FBaEI7QUFDQSxLQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQWY7QUFDQSxVQUFTLFdBQVQsQ0FBcUIsR0FBckI7O0FBRUE7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBkcmF3UG9rZW1vbiBmcm9tICcuL2RyYXdQb2tlbW9uJztcclxuaW1wb3J0IGNyZWF0ZUJ0biBmcm9tICcuL2xvYWRNb3JlQnRuJztcclxuLy9pbXBvcnQgZmV0Y2hEYXRlIGZyb20gJy4vYXBpU2VydmljZSc7XHJcblxyXG5sZXQgcmVxdWVzdCA9ICdodHRwOi8vcG9rZWFwaS5jby9hcGkvdjEvcG9rZW1vbi8/bGltaXQ9MTImb2Zmc2V0PTEyJztcclxubGV0IHF1ZXJ5ID0gJ2h0dHA6Ly9wb2tlYXBpLmNvJztcclxuZXhwb3J0IGxldCBuZXh0VXJsID0gJyc7XHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRhaW5lcicpO1xyXG5cclxuZXhwb3J0IGxldCBtYWtlRmV0Y2ggPSAodXJsKSA9PiB7XHJcbmZldGNoKHVybClcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT57XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigocG9rZUxpc3QpPT57XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwb2tlTGlzdC5vYmplY3RzKTtcclxuICAgICAgICBkcmF3UG9rZW1vbihjb250YWluZXIsIHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIG5leHRVcmwgPSBxdWVyeSArIHBva2VMaXN0Lm1ldGEubmV4dDtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXh0VXJsKTtcclxuICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcblxyXG5tYWtlRmV0Y2gocmVxdWVzdCk7XHJcbmNyZWF0ZUJ0bigpO1xyXG52YXIgYnRuVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkTW9yZUJ0bicpO1xyXG5idG5ULmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBtYWtlRmV0Y2gobmV4dFVybCkpO1xyXG5cclxuXHJcbiIsImltcG9ydCBnZXRUeXBlcyBmcm9tICcuL2dldFR5cGUnO1xyXG5pbXBvcnQgY3JlYXRlQnRuIGZyb20gJy4vbG9hZE1vcmVCdG4nO1xyXG5pbXBvcnQge25leHRVcmx9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHttYWtlRmV0Y2h9IGZyb20gJy4vYXBwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChjb250YWluZXIsIGFycikgPT4ge1xyXG5cdGxldCBwb2tlbW9uSWQgPSBbXTtcclxuICAgIFx0Ly9mb3IobGV0IGkgPTA7IGk8YXJyLmxlbmd0aDsgaSsrKVxyXG4gICAgXHRhcnIuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpLCBhcnIpe1xyXG4gICAgXHRcdHBva2Vtb25JZC5wdXNoKGFycltpXS5wa2R4X2lkKTtcclxuICAgIFx0XHRsZXQgaW1nUmVxdWVzdCA9IFwiaHR0cDovL3Bva2VhcGkuY28vbWVkaWEvaW1nL1wiO1xyXG4gICAgXHRcdGxldCBpZCA9IGFycltpXS5wa2R4X2lkO1xyXG4gICAgXHRcdGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFx0XHRkaXYuY2xhc3NOYW1lID0gJ3Bvc3QnOyBcclxuICAgIFx0XHRsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBcdFx0aW1nLnNyYz1gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uL290aGVyLXNwcml0ZXMvb2ZmaWNpYWwtYXJ0d29yay8ke2lkfS5wbmdgXHJcbiAgICBcdFx0bGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBcdFx0bmFtZS5jbGFzc05hbWUgPSBcIm5hbWVcIjtcclxuICAgIFx0XHRuYW1lLmlubmVySFRNTCA9IGFycltpXS5uYW1lO1xyXG4gICAgXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgIFx0XHRkaXYuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICAgIFx0XHRnZXRUeXBlcyhhcnJbaV0udHlwZXMsIGRpdik7XHJcbiAgICBcdH0pO1xyXG5cclxufVxyXG5cdCIsImV4cG9ydCBkZWZhdWx0IChhcnIsIHRhZykgPT57XHJcblxyXG5cdFx0XHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycil7XHJcblx0XHRcdFx0bGV0IHR5cGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgXHRcdFx0dHlwZXMuY2xhc3NOYW1lID0gXCJ0eXBlc1wiO1xyXG4gICAgXHRcdFx0dHlwZXMuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xyXG4gICAgXHRcdFx0dGFnLmFwcGVuZENoaWxkKHR5cGVzKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcbn1cdFx0XHRcdCIsIlxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcblx0XHJcblx0bGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG5cdGJ0bi5jbGFzc05hbWUgPSAnbG9hZE1vcmVCdG4nO1xyXG5cdGJ0bi5pbm5lckhUTUwgPSAnTG9hZCBtb3JlJztcclxuXHRsZXQgYmxvY2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyk7XHJcblx0YmxvY2tCdG4uYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcblx0Ly9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtYWtlRmV0Y2gobmV4dFVybCkpO1xyXG59Il19
