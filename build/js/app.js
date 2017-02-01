(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getPokemon = require('./getPokemon.js');

var _getPokemon2 = _interopRequireDefault(_getPokemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = document.getElementById('post-container');
var btn = document.getElementById('btn');
var api = 'http://pokeapi.co/';
var query = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=24';
fetch(query).then(function (res) {
    return res.json();
}).then(function (json) {
    console.log(json.meta.next);
    // query = json.meta.next; ulr for 24
    var addButton = document.createElement('BUTTON');
    addButton.addEventListener('click', _getPokemon2.default);
    addButton.className = 'addButton';
    addButton.innerHTML = 'load more';
    btn.appendChild(addButton);

    for (var i = 0; i < json.objects.length; i++) {
        var div = document.createElement('div');
        div.className = 'post';
        var name = document.createElement('span');
        name.className = "name";
        name.innerHTML = json.objects[i].name;
        main.append(div);
        div.appendChild(name);

        for (var j = 0; j < json.objects[i].types.length; j++) {
            var types = document.createElement('span');
            types.className = "types";
            types.innerHTML = json.objects[i].types[j].name;
            div.appendChild(types);
        }
    }
});

},{"./getPokemon.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loadMore;
function loadMore() {
	query = "http://pokeapi.co/api/v1/pokemon/?limit=12&offset=36";
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGdldFBva2Vtb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLE9BQU8sU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUFYO0FBQ0EsSUFBSSxNQUFNLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFWO0FBQ0EsSUFBSSxNQUFNLG9CQUFWO0FBQ0EsSUFBSSxRQUFRLHNEQUFaO0FBQ0EsTUFBTSxLQUFOLEVBQ0MsSUFERCxDQUNNLFVBQVMsR0FBVCxFQUFhO0FBQ2YsV0FBTyxJQUFJLElBQUosRUFBUDtBQUNILENBSEQsRUFJQyxJQUpELENBSU0sVUFBUyxJQUFULEVBQWM7QUFDaEIsWUFBUSxHQUFSLENBQVksS0FBSyxJQUFMLENBQVUsSUFBdEI7QUFDRDtBQUNDLFFBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQSxjQUFVLGdCQUFWLENBQTJCLE9BQTNCO0FBQ0EsY0FBVSxTQUFWLEdBQXNCLFdBQXRCO0FBQ0EsY0FBVSxTQUFWLEdBQXNCLFdBQXRCO0FBQ0EsUUFBSSxXQUFKLENBQWdCLFNBQWhCOztBQUVBLFNBQUksSUFBSSxJQUFHLENBQVgsRUFBYyxJQUFFLEtBQUssT0FBTCxDQUFhLE1BQTdCLEVBQXFDLEdBQXJDLEVBQXlDO0FBQ3pDLFlBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUNBLFlBQUksU0FBSixHQUFnQixNQUFoQjtBQUNBLFlBQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWDtBQUNBLGFBQUssU0FBTCxHQUFpQixNQUFqQjtBQUNBLGFBQUssU0FBTCxHQUFpQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLElBQWpDO0FBQ0EsYUFBSyxNQUFMLENBQVksR0FBWjtBQUNBLFlBQUksV0FBSixDQUFnQixJQUFoQjs7QUFFQSxhQUFJLElBQUksSUFBRSxDQUFWLEVBQWEsSUFBRSxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEtBQWhCLENBQXNCLE1BQXJDLEVBQTZDLEdBQTdDLEVBQWlEO0FBQ2pELGdCQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQSxrQkFBTSxTQUFOLEdBQWtCLE9BQWxCO0FBQ0Esa0JBQU0sU0FBTixHQUFrQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLElBQTNDO0FBQ0EsZ0JBQUksV0FBSixDQUFnQixLQUFoQjtBQUNJO0FBQ0o7QUFDRixDQTdCRjs7Ozs7Ozs7a0JDTHdCLFE7QUFBVCxTQUFTLFFBQVQsR0FBbUI7QUFDakMsU0FBUSxzREFBUjtBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBsb2FkTW9yZSBmcm9tIFwiLi9nZXRQb2tlbW9uLmpzXCJcclxuXHJcbmxldCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGFpbmVyJyk7XHJcbmxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyk7XHJcbmxldCBhcGkgPSAnaHR0cDovL3Bva2VhcGkuY28vJztcclxubGV0IHF1ZXJ5ID0gJ2h0dHA6Ly9wb2tlYXBpLmNvL2FwaS92MS9wb2tlbW9uLz9saW1pdD0xMiZvZmZzZXQ9MjQnO1xyXG5mZXRjaChxdWVyeSlcclxuLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgIHJldHVybiByZXMuanNvbigpO1xyXG59KVxyXG4udGhlbihmdW5jdGlvbihqc29uKXtcclxuICAgIGNvbnNvbGUubG9nKGpzb24ubWV0YS5uZXh0KTtcclxuICAgLy8gcXVlcnkgPSBqc29uLm1ldGEubmV4dDsgdWxyIGZvciAyNFxyXG4gICAgbGV0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG4gICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZE1vcmUpO1xyXG4gICAgYWRkQnV0dG9uLmNsYXNzTmFtZSA9ICdhZGRCdXR0b24nO1xyXG4gICAgYWRkQnV0dG9uLmlubmVySFRNTCA9ICdsb2FkIG1vcmUnO1xyXG4gICAgYnRuLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XHJcblxyXG4gICAgZm9yKGxldCBpID0wOyBpPGpzb24ub2JqZWN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3Bvc3QnOyAgIFxyXG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBuYW1lLmNsYXNzTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgbmFtZS5pbm5lckhUTUwgPSBqc29uLm9iamVjdHNbaV0ubmFtZTtcclxuICAgIG1haW4uYXBwZW5kKGRpdik7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICAgICBcclxuICAgIGZvcihsZXQgaj0wOyBqPGpzb24ub2JqZWN0c1tpXS50eXBlcy5sZW5ndGg7IGorKyl7XHJcbiAgICBsZXQgdHlwZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICB0eXBlcy5jbGFzc05hbWUgPSBcInR5cGVzXCI7XHJcbiAgICB0eXBlcy5pbm5lckhUTUwgPSBqc29uLm9iamVjdHNbaV0udHlwZXNbal0ubmFtZTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZCh0eXBlcyk7XHJcbiAgICAgICB9XHJcbiAgIH1cclxuIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4iLCJcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZE1vcmUoKXtcclxuXHRxdWVyeSA9IFwiaHR0cDovL3Bva2VhcGkuY28vYXBpL3YxL3Bva2Vtb24vP2xpbWl0PTEyJm9mZnNldD0zNlwiO1xyXG5cclxufSJdfQ==
