(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFetch = exports.nextUrl = undefined;

var _drawPokemon = require('./drawPokemon');

var _drawPokemon2 = _interopRequireDefault(_drawPokemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import createBtn from './loadMoreBtn';
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
        var url = query + pokeList.objects[0].resource_uri;
        return fetch(url);
    }).then(function (pokeInfo) {
        return pokeInfo.json();
    }).then(function (pokemon) {
        //console.log(pokemon);
    });
};

makeFetch(request);
btn.addEventListener('click', makeFetch(nextUrl));

},{"./drawPokemon":2}],2:[function(require,module,exports){
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

  (0, _loadMoreBtn2.default)();
  btn.addEventListener('click', (0, _app.makeFetch)(_app.nextUrl));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGRyYXdQb2tlbW9uLmpzIiwic3JjXFxhcHBcXGdldFR5cGUuanMiLCJzcmNcXGFwcFxcbG9hZE1vcmVCdG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7OztBQUNBO0FBQ0E7OztBQUdBLElBQUksVUFBVSxzREFBZDtBQUNBLElBQUksUUFBUSxtQkFBWjtBQUNPLElBQUksNEJBQVUsRUFBZDtBQUNQLElBQU0sWUFBWSxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQWxCOztBQUVPLElBQUksZ0NBQVksU0FBWixTQUFZLENBQUMsR0FBRCxFQUFTO0FBQ2hDLFVBQU0sR0FBTixFQUNLLElBREwsQ0FDVSxVQUFDLFFBQUQsRUFBYTtBQUNmO0FBQ0EsZUFBTyxTQUFTLElBQVQsRUFBUDtBQUNILEtBSkwsRUFLSyxJQUxMLENBS1UsVUFBQyxRQUFELEVBQVk7QUFDZDtBQUNBLG1DQUFZLFNBQVosRUFBdUIsU0FBUyxPQUFoQztBQUNBLGdCQVpHLE9BWUgsYUFBVSxRQUFRLFNBQVMsSUFBVCxDQUFjLElBQWhDO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDQSxZQUFJLE1BQU0sUUFBUSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsWUFBdEM7QUFDQSxlQUFPLE1BQU0sR0FBTixDQUFQO0FBQ0gsS0FaTCxFQWFLLElBYkwsQ0FhVSxVQUFDLFFBQUQsRUFBWTtBQUNkLGVBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxLQWZMLEVBaUJLLElBakJMLENBaUJVLFVBQUMsT0FBRCxFQUFhO0FBQ2Y7QUFDSCxLQW5CTDtBQW9CQyxDQXJCTTs7QUF1QlAsVUFBVSxPQUFWO0FBQ0EsSUFBSSxnQkFBSixDQUFxQixPQUFyQixFQUE4QixVQUFVLE9BQVYsQ0FBOUI7Ozs7Ozs7OztBQ2xDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7a0JBR2UsVUFBQyxTQUFELEVBQVksR0FBWixFQUFvQjtBQUNsQyxNQUFJLFlBQVksRUFBaEI7QUFDSTtBQUNBLE1BQUksT0FBSixDQUFZLFVBQVMsSUFBVCxFQUFlLENBQWYsRUFBa0IsR0FBbEIsRUFBc0I7QUFDakMsY0FBVSxJQUFWLENBQWUsSUFBSSxDQUFKLEVBQU8sT0FBdEI7QUFDQSxRQUFJLGFBQWEsOEJBQWpCO0FBQ0EsUUFBSSxLQUFLLElBQUksQ0FBSixFQUFPLE9BQWhCO0FBQ0EsUUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsUUFBSSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0EsUUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsUUFBSSxHQUFKLGdIQUFtSCxFQUFuSDtBQUNBLFFBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWDtBQUNBLFNBQUssU0FBTCxHQUFpQixNQUFqQjtBQUNBLFNBQUssU0FBTCxHQUFpQixJQUFJLENBQUosRUFBTyxJQUF4QjtBQUNBLGNBQVUsV0FBVixDQUFzQixHQUF0QjtBQUNNLFFBQUksV0FBSixDQUFnQixHQUFoQjtBQUNOLFFBQUksV0FBSixDQUFnQixJQUFoQjtBQUNFLDJCQUFTLElBQUksQ0FBSixFQUFPLEtBQWhCLEVBQXVCLEdBQXZCO0FBQ0YsR0FmRDs7QUFpQkg7QUFDTSxNQUFJLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLGlDQUE5QjtBQUNQLEM7Ozs7Ozs7OztrQkMzQmMsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFhOztBQUV4QixRQUFJLE9BQUosQ0FBWSxVQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCLEdBQWxCLEVBQXNCO0FBQ2xDLFlBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNHLGNBQU0sU0FBTixHQUFrQixPQUFsQjtBQUNBLGNBQU0sU0FBTixHQUFrQixLQUFLLElBQXZCO0FBQ0EsWUFBSSxXQUFKLENBQWdCLEtBQWhCO0FBQ0YsS0FMRDtBQU9ILEM7Ozs7Ozs7OztrQkNSYyxZQUFNOztBQUVwQixLQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVY7QUFDQSxLQUFJLFNBQUosR0FBZ0IsYUFBaEI7QUFDQSxLQUFJLFNBQUosR0FBZ0IsV0FBaEI7QUFDQSxLQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQWY7QUFDQSxVQUFTLFdBQVQsQ0FBcUIsR0FBckI7O0FBRUE7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBkcmF3UG9rZW1vbiBmcm9tICcuL2RyYXdQb2tlbW9uJztcclxuLy9pbXBvcnQgY3JlYXRlQnRuIGZyb20gJy4vbG9hZE1vcmVCdG4nO1xyXG4vL2ltcG9ydCBmZXRjaERhdGUgZnJvbSAnLi9hcGlTZXJ2aWNlJztcclxuXHJcblxyXG5sZXQgcmVxdWVzdCA9ICdodHRwOi8vcG9rZWFwaS5jby9hcGkvdjEvcG9rZW1vbi8/bGltaXQ9MTImb2Zmc2V0PTEyJztcclxubGV0IHF1ZXJ5ID0gJ2h0dHA6Ly9wb2tlYXBpLmNvJztcclxuZXhwb3J0IGxldCBuZXh0VXJsID0gJyc7XHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRhaW5lcicpO1xyXG5cclxuZXhwb3J0IGxldCBtYWtlRmV0Y2ggPSAodXJsKSA9PiB7XHJcbmZldGNoKHVybClcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT57XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigocG9rZUxpc3QpPT57XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhwb2tlTGlzdC5vYmplY3RzKTtcclxuICAgICAgICBkcmF3UG9rZW1vbihjb250YWluZXIsIHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIG5leHRVcmwgPSBxdWVyeSArIHBva2VMaXN0Lm1ldGEubmV4dDtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXh0VXJsKTtcclxuICAgICAgICBsZXQgdXJsID0gcXVlcnkgKyBwb2tlTGlzdC5vYmplY3RzWzBdLnJlc291cmNlX3VyaTtcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigocG9rZUluZm8pPT57XHJcbiAgICAgICAgcmV0dXJuIHBva2VJbmZvLmpzb24oKTtcclxuICAgIH0pXHJcblxyXG4gICAgLnRoZW4oKHBva2Vtb24pID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHBva2Vtb24pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1ha2VGZXRjaChyZXF1ZXN0KTtcclxuYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFrZUZldGNoKG5leHRVcmwpKTtcclxuIiwiaW1wb3J0IGdldFR5cGVzIGZyb20gJy4vZ2V0VHlwZSc7XHJcbmltcG9ydCBjcmVhdGVCdG4gZnJvbSAnLi9sb2FkTW9yZUJ0bic7XHJcbmltcG9ydCB7bmV4dFVybH0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQge21ha2VGZXRjaH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGNvbnRhaW5lciwgYXJyKSA9PiB7XHJcblx0bGV0IHBva2Vtb25JZCA9IFtdO1xyXG4gICAgXHQvL2ZvcihsZXQgaSA9MDsgaTxhcnIubGVuZ3RoOyBpKyspXHJcbiAgICBcdGFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycil7XHJcbiAgICBcdFx0cG9rZW1vbklkLnB1c2goYXJyW2ldLnBrZHhfaWQpO1xyXG4gICAgXHRcdGxldCBpbWdSZXF1ZXN0ID0gXCJodHRwOi8vcG9rZWFwaS5jby9tZWRpYS9pbWcvXCI7XHJcbiAgICBcdFx0bGV0IGlkID0gYXJyW2ldLnBrZHhfaWQ7XHJcbiAgICBcdFx0bGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgXHRcdGRpdi5jbGFzc05hbWUgPSAncG9zdCc7IFxyXG4gICAgXHRcdGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIFx0XHRpbWcuc3JjPWBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUG9rZUFQSS9zcHJpdGVzL21hc3Rlci9zcHJpdGVzL3Bva2Vtb24vb3RoZXItc3ByaXRlcy9vZmZpY2lhbC1hcnR3b3JrLyR7aWR9LnBuZ2BcclxuICAgIFx0XHRsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIFx0XHRuYW1lLmNsYXNzTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgXHRcdG5hbWUuaW5uZXJIVE1MID0gYXJyW2ldLm5hbWU7XHJcbiAgICBcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgXHRcdGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgXHRcdGdldFR5cGVzKGFycltpXS50eXBlcywgZGl2KTtcclxuICAgIFx0fSk7XHJcblxyXG5cdFx0Y3JlYXRlQnRuKCk7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFrZUZldGNoKG5leHRVcmwpKTtcclxufVxyXG5cdCIsImV4cG9ydCBkZWZhdWx0IChhcnIsIHRhZykgPT57XHJcblxyXG5cdFx0XHRcdGFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycil7XHJcblx0XHRcdFx0bGV0IHR5cGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgXHRcdFx0dHlwZXMuY2xhc3NOYW1lID0gXCJ0eXBlc1wiO1xyXG4gICAgXHRcdFx0dHlwZXMuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xyXG4gICAgXHRcdFx0dGFnLmFwcGVuZENoaWxkKHR5cGVzKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcbn1cdFx0XHRcdCIsIlxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcblx0XHJcblx0bGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG5cdGJ0bi5jbGFzc05hbWUgPSAnbG9hZE1vcmVCdG4nO1xyXG5cdGJ0bi5pbm5lckhUTUwgPSAnTG9hZCBtb3JlJztcclxuXHRsZXQgYmxvY2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyk7XHJcblx0YmxvY2tCdG4uYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcblx0Ly9idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtYWtlRmV0Y2gobmV4dFVybCkpO1xyXG59Il19
