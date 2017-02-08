(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var main = document.getElementById('post-container');
var btn = document.getElementById('btn');
var api = 'http://pokeapi.co/';
var query = api + 'api/v1/pokemon/?limit=12&offset=12';
var queryImg = 'http://pokeapi.co/';
var nextUrl = null;

fetch(query).then(function (res) {
    return res.json();
}).then(function (json) {
    console.log(json);
    nextUrl = api + json.meta.next;
    console.log(nextUrl);
    return drawPokemons(json);
});

fetch(queryImg).then(function (res) {
    return res.json();
}).then(function (json) {

    return json;
});
var addButton = function addButton() {
    var addButton = document.createElement('BUTTON');
    addButton.addEventListener('onclick', loadMore(nextUrl));
    addButton.className = 'addButton';
    addButton.innerHTML = 'load more';
    btn.appendChild(addButton);
};
function drawPokemons(json) {
    nextUrl = json.next;
    for (var i = 0; i < 12; i++) {
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
};
function loadMore() {
    drawPokemons(nextUrl);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE9BQU8sU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUFYO0FBQ0EsSUFBSSxNQUFNLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFWO0FBQ0EsSUFBSSxNQUFNLG9CQUFWO0FBQ0EsSUFBSSxRQUFRLE1BQU0sb0NBQWxCO0FBQ0EsSUFBSSxXQUFXLG9CQUFmO0FBQ0EsSUFBSSxVQUFVLElBQWQ7O0FBRUEsTUFBTSxLQUFOLEVBQ0MsSUFERCxDQUNNLFVBQVMsR0FBVCxFQUFhO0FBQ2YsV0FBTyxJQUFJLElBQUosRUFBUDtBQUNILENBSEQsRUFJQyxJQUpELENBSU0sVUFBUyxJQUFULEVBQWM7QUFDaEIsWUFBUSxHQUFSLENBQVksSUFBWjtBQUNBLGNBQVUsTUFBTSxLQUFLLElBQUwsQ0FBVSxJQUExQjtBQUNBLFlBQVEsR0FBUixDQUFZLE9BQVo7QUFDQSxXQUFPLGFBQWEsSUFBYixDQUFQO0FBQ0YsQ0FURjs7QUFXQSxNQUFNLFFBQU4sRUFDQyxJQURELENBQ00sVUFBUyxHQUFULEVBQWE7QUFDZixXQUFPLElBQUksSUFBSixFQUFQO0FBQ0gsQ0FIRCxFQUlDLElBSkQsQ0FJTSxVQUFTLElBQVQsRUFBYzs7QUFFaEIsV0FBTyxJQUFQO0FBR0gsQ0FURDtBQVVBLElBQUksWUFBWSxxQkFBVTtBQUN0QixRQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWhCO0FBQ0EsY0FBVSxnQkFBVixDQUEyQixTQUEzQixFQUFzQyxTQUFTLE9BQVQsQ0FBdEM7QUFDQSxjQUFVLFNBQVYsR0FBc0IsV0FBdEI7QUFDQSxjQUFVLFNBQVYsR0FBc0IsV0FBdEI7QUFDQSxRQUFJLFdBQUosQ0FBZ0IsU0FBaEI7QUFDSCxDQU5EO0FBT0EsU0FBUyxZQUFULENBQXNCLElBQXRCLEVBQTJCO0FBQ3ZCLGNBQVUsS0FBSyxJQUFmO0FBQ0EsU0FBSSxJQUFJLElBQUcsQ0FBWCxFQUFjLElBQUUsRUFBaEIsRUFBb0IsR0FBcEIsRUFBd0I7QUFDeEIsWUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsWUFBSSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0EsWUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsSUFBakM7QUFDQSxhQUFLLE1BQUwsQ0FBWSxHQUFaO0FBQ0EsWUFBSSxXQUFKLENBQWdCLElBQWhCOztBQUVBLGFBQUksSUFBSSxJQUFFLENBQVYsRUFBYSxJQUFFLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsS0FBaEIsQ0FBc0IsTUFBckMsRUFBNkMsR0FBN0MsRUFBaUQ7QUFDakQsZ0JBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLGtCQUFNLFNBQU4sR0FBa0IsT0FBbEI7QUFDQSxrQkFBTSxTQUFOLEdBQWtCLEtBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsS0FBaEIsQ0FBc0IsQ0FBdEIsRUFBeUIsSUFBM0M7QUFDQSxnQkFBSSxXQUFKLENBQWdCLEtBQWhCO0FBQ0s7QUFDTDtBQUNIO0FBQ0QsU0FBUyxRQUFULEdBQW1CO0FBQ2YsaUJBQWEsT0FBYjtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGFpbmVyJyk7XHJcbmxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyk7XHJcbmxldCBhcGkgPSAnaHR0cDovL3Bva2VhcGkuY28vJztcclxubGV0IHF1ZXJ5ID0gYXBpICsgJ2FwaS92MS9wb2tlbW9uLz9saW1pdD0xMiZvZmZzZXQ9MTInO1xyXG5sZXQgcXVlcnlJbWcgPSAnaHR0cDovL3Bva2VhcGkuY28vJztcclxubGV0IG5leHRVcmwgPSBudWxsO1xyXG5cclxuZmV0Y2gocXVlcnkpXHJcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcclxufSlcclxuLnRoZW4oZnVuY3Rpb24oanNvbil7XHJcbiAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgIG5leHRVcmwgPSBhcGkgKyBqc29uLm1ldGEubmV4dDtcclxuICAgIGNvbnNvbGUubG9nKG5leHRVcmwpO1xyXG4gICAgcmV0dXJuIGRyYXdQb2tlbW9ucyhqc29uKTtcclxuIH0pO1xyXG5cclxuZmV0Y2gocXVlcnlJbWcpXHJcbi50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcclxufSlcclxuLnRoZW4oZnVuY3Rpb24oanNvbil7XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gICAgICAgIFxyXG4gICAgXHJcbn0pO1xyXG5sZXQgYWRkQnV0dG9uID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdvbmNsaWNrJywgbG9hZE1vcmUobmV4dFVybCkpO1xyXG4gICAgYWRkQnV0dG9uLmNsYXNzTmFtZSA9ICdhZGRCdXR0b24nO1xyXG4gICAgYWRkQnV0dG9uLmlubmVySFRNTCA9ICdsb2FkIG1vcmUnO1xyXG4gICAgYnRuLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XHJcbn1cclxuZnVuY3Rpb24gZHJhd1Bva2Vtb25zKGpzb24pe1xyXG4gICAgbmV4dFVybCA9IGpzb24ubmV4dDtcclxuICAgIGZvcihsZXQgaSA9MDsgaTwxMjsgaSsrKXtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5jbGFzc05hbWUgPSAncG9zdCc7ICAgXHJcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIG5hbWUuY2xhc3NOYW1lID0gXCJuYW1lXCI7XHJcbiAgICBuYW1lLmlubmVySFRNTCA9IGpzb24ub2JqZWN0c1tpXS5uYW1lO1xyXG4gICAgbWFpbi5hcHBlbmQoZGl2KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgIFxyXG4gICAgZm9yKGxldCBqPTA7IGo8anNvbi5vYmplY3RzW2ldLnR5cGVzLmxlbmd0aDsgaisrKXtcclxuICAgIGxldCB0eXBlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHR5cGVzLmNsYXNzTmFtZSA9IFwidHlwZXNcIjtcclxuICAgIHR5cGVzLmlubmVySFRNTCA9IGpzb24ub2JqZWN0c1tpXS50eXBlc1tqXS5uYW1lO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHR5cGVzKTtcclxuICAgICAgICB9XHJcbiAgIH0gXHJcbn07ICBcclxuZnVuY3Rpb24gbG9hZE1vcmUoKXtcclxuICAgIGRyYXdQb2tlbW9ucyhuZXh0VXJsKTtcclxufSBcclxuICAgICAgICBcclxuIl19
