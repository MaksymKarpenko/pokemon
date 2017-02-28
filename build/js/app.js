(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

exports.default = function (pokeBox) {
     var favoriteBox = document.getElementById('favorite');
     var pokeFavor = document.createElement('DIV');
     pokeFavor.appendChild(pokeBox);
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFetch = exports.inputSearch = exports.pokemon_Array = exports.typesBox = exports.container = exports.nextUrl = exports.typesRequest = undefined;

var _drawPokemon = require('./drawPokemon');

var _drawPokemon2 = _interopRequireDefault(_drawPokemon);

var _loadMoreBtn = require('./loadMoreBtn');

var _loadMoreBtn2 = _interopRequireDefault(_loadMoreBtn);

var _chooseFunc = require('./choose-func');

var _chooseFunc2 = _interopRequireDefault(_chooseFunc);

var _addToFav = require('./addToFav');

var _addToFav2 = _interopRequireDefault(_addToFav);

var _getTypesList = require('./getTypesList');

var _getTypesList2 = _interopRequireDefault(_getTypesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import toDoFilter from './makeFilter';

var request = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';
var query = 'http://pokeapi.co';
var typesRequest = exports.typesRequest = 'http://pokeapi.co/api/v1/type/?limit=999';
var nextUrl = exports.nextUrl = '';
var container = exports.container = document.getElementById('post-container');
var typesBox = exports.typesBox = document.getElementById('#typesBox');
var pokemon_Array = exports.pokemon_Array = [];
var inputSearch = exports.inputSearch = document.querySelector('#search');
var favoriteBox = document.querySelector('#favorite');

(0, _chooseFunc2.default)(container);
var makeFetch = exports.makeFetch = function makeFetch(url) {
    fetch(url).then(function (response) {
        //console.log(response);
        return response.json();
    }).then(function (pokeList) {
        //console.log(pokeList.objects);
        (0, _drawPokemon2.default)(pokeList.objects);
        exports.nextUrl = nextUrl = query + pokeList.meta.next;
    });
};

makeFetch(request);
(0, _loadMoreBtn2.default)();
var btnT = document.querySelector('.loadMoreBtn');
btnT.addEventListener('click', function () {
    return makeFetch(nextUrl);
});

var showPokemon = function showPokemon() {

    var length = localStorage.length;
    if (length > 0) {
        var _loop = function _loop(u) {
            var key = localStorage.key(u);
            var data = JSON.parse(localStorage.getItem(key));

            var div = document.createElement('DIV');
            div.id = data.id;
            div.className = 'pokeBox';

            var pokeFavorImg = document.createElement('IMG');
            pokeFavorImg.className = 'pokeImg';
            div.style.background = '#6666ff';
            pokeFavorImg.src = data.img;
            favoriteBox.appendChild(div);
            div.appendChild(pokeFavorImg);

            var name = document.createElement('span');
            name.className = 'name';
            name.innerHTML = data.name;
            div.appendChild(name);

            var types = document.createElement('span');
            types.className = 'types';
            types.innerHTML = data.types;
            div.appendChild(types);
            if (data.types1 !== undefined) {
                var types1 = document.createElement('span');
                types.className = 'types';
                types.innerHTML = data.types1;
                div.appendChild(types1);
            }
            div.addEventListener('click', function () {
                localStorage.removeItem(div.id);
                favoriteBox.removeChild(div);
            });
        };

        for (var u = 0; u < length; u++) {
            _loop(u);
        }
    }
};

showPokemon();

},{"./addToFav":1,"./choose-func":3,"./drawPokemon":5,"./getTypesList":7,"./loadMoreBtn":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (container) {

  var currentElem = null;
  var btn_Add_to_Fav = document.createElement('BUTTON');
  btn_Add_to_Fav.className = 'btn_add_to_FavBox';
  btn_Add_to_Fav.innerHTML = 'add to Favarite';
  container.onmouseover = function (event) {
    if (currentElem) {
      // перед тем, как зайти в новый элемент, курсор всегда выходит из предыдущего
      //
      // если мы еще не вышли, значит это переход внутри элемента, отфильтруем его
      return;
    }

    // посмотрим, куда пришёл курсор
    var target = event.target;

    // уж не на TD ли?
    while (target != this) {
      if (target.className == 'pokeBox') break;
      target = target.parentNode;
    }
    if (target == this) return;

    // да, элемент перешёл внутрь TD!
    currentElem = target;
    target.style.background = '#006666';
    target.style.color = 'white';

    target.appendChild(btn_Add_to_Fav);
  };

  container.onmouseout = function (event) {
    // если курсор и так снаружи - игнорируем это событие
    if (!currentElem) return;

    // произошёл уход с элемента - проверим, куда, может быть на потомка?
    var relatedTarget = event.relatedTarget;
    if (relatedTarget) {
      // может быть relatedTarget = null
      while (relatedTarget) {
        // идём по цепочке родителей и проверяем,
        // если переход внутрь currentElem - игнорируем это событие
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
      }
    }

    // произошло событие mouseout, курсор ушёл
    currentElem.style.background = '';
    currentElem.style.color = 'black';
    currentElem.removeChild(btn_Add_to_Fav);
    currentElem = null;
  };

  btn_Add_to_Fav.addEventListener('click', function (event) {

    var obj = {};

    var target = event.target.parentNode;
    var image = target.getElementsByClassName('pokeImg');
    //console.log(image[0].src);
    var imgUrl = image[0].src;

    var addToFav = function addToFav(url) {
      ///console.log(url);

      var favoriteBox = document.querySelector('#favorite');
      var div = document.createElement('DIV');
      div.id = target.id;
      div.className = 'pokeBox';
      obj.id = target.id;
      obj.img = url;
      // console.log(obj);
      //div.style.display = 'block';

      var pokeFavorImg = document.createElement('IMG');
      pokeFavorImg.className = 'pokeImg';
      div.style.background = '#6666ff';
      pokeFavorImg.src = url;
      favoriteBox.appendChild(div);
      div.appendChild(pokeFavorImg);

      var name = document.createElement('span');
      name.className = 'name';
      name.innerHTML = target.getElementsByClassName('name')[0].textContent;
      obj.name = name.innerHTML;
      //console.log(obj);
      div.appendChild(name);

      var arrTypes = target.getElementsByClassName('types');
      arrTypes.forEach = [].forEach;
      arrTypes.forEach(function (item, i, arrTypes) {
        var types = document.createElement('span');
        types.className = 'types';
        types.innerHTML = target.getElementsByClassName('types')[i].textContent;
        if (i < 1) {
          obj.types = target.getElementsByClassName('types')[i].textContent;
        }

        if (i > 0) {
          obj.types1 = target.getElementsByClassName('types')[i].textContent;
        }

        div.appendChild(types);
      });

      localStorage.setItem(div.id, JSON.stringify(obj));

      div.addEventListener('click', function () {
        localStorage.removeItem(div.id);
        favoriteBox.removeChild(div);
      });
    };

    addToFav(imgUrl);
  });
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = require('./app');

//console.log(pokemon_Arrey);
exports.default = function (arr) {
	//console.log(arr);
	//console.log(container);


	var search = document.createElement('input');
	search.className = 'search';
	//search.addEventListener('onkeyup', filter());
};

},{"./app":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _drawTypesUnderImg = require('./drawTypesUnderImg');

var _drawTypesUnderImg2 = _interopRequireDefault(_drawTypesUnderImg);

var _loadMoreBtn = require('./loadMoreBtn');

var _loadMoreBtn2 = _interopRequireDefault(_loadMoreBtn);

var _app = require('./app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
    arr.forEach(function (item, i, arr) {
        _app.pokemon_Array.push(arr[i]);
    });
    //filter(pokemon_Array);
    //console.log(pokemon_Array[1]);  
    arr.forEach(function (item, i, arr) {
        var imgRequest = "http://pokeapi.co/media/img/";
        var id = arr[i].pkdx_id;

        var div = document.createElement('div');
        div.className = 'pokeBox';
        div.id = arr[i].pkdx_id;

        var img = document.createElement('IMG');
        img.className = 'pokeImg';
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/' + id + '.png';

        var name = document.createElement('span');
        name.className = "name";
        name.innerHTML = arr[i].name;
        _app.container.appendChild(div);
        div.appendChild(img);
        div.appendChild(name);
        (0, _drawTypesUnderImg2.default)(arr[i].types, div);
    });

    var box = _app.container.getElementsByClassName('pokeBox');
    var value = '';
    _app.inputSearch.oninput = function () {
        console.log(_app.inputSearch.value);
        value = _app.inputSearch.value;
        for (var i = 0; i < box.length; i++) {
            var filterArrey = [];
            var span = box[i].getElementsByClassName('types')[0];
            if (span.innerHTML.indexOf(value) > -1) {

                box[i].style.display = '';
            } else {
                span = box[i].getElementsByClassName('types')[1];
                if (span !== undefined) {
                    if (span.innerHTML.indexOf(value) > -1) {

                        box[i].style.display = '';
                    } else {
                        box[i].style.display = 'none';
                    }
                } else {
                    box[i].style.display = 'none';
                }
            }

            /* span.forEach = [].forEach;
                  span.forEach((item, q, span) => {
                      
                      if(span[q].innerHTML.indexOf(value) > -1){
                                                 
                       box[i].style.display = '';
                      }else{
                          console.log(span[q].innerHTML);
                          box[i].style.display = 'none';
                        }
                  });*/
        }
    };
};

/*span.forEach = [].forEach;
              span.forEach((item, q, span) => {
                  
                  if(span[q].innerHTML.indexOf(value) > -1){
                      console.log(span[q].innerHTML);
                   box[i].style.display = 'block';
                  }else{
                      box[i].style.display = 'none';
                  }
              });*/

},{"./app":2,"./drawTypesUnderImg":6,"./loadMoreBtn":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _drawPokemon = require('./drawPokemon');

exports.default = function (arr, tag) {
  //inputSearch.oninput = () =>{
  //let value = inputSearch.value;
  //console.log(value);

  arr.forEach(function (item, i, arr) {
    //if(item.name.indexOf(value) > -1){	
    //tag.style.display = '';
    var types = document.createElement('span');
    types.className = "types";
    types.innerHTML = item.name;
    tag.appendChild(types);
  });
  //if(value == ''){
  //let types = document.createElement('span');
  //types.className = "types";
  //types.innerHTML = item.name;
  //tag.appendChild(types);

  //}
  //if (item.name.indexOf(value) == 1){
  //	tag.style.display = 'none';
  //			}
  //		});

  //}
};

},{"./app":2,"./drawPokemon":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _drawTypesList = require('./draw-Types-List');

var _drawTypesList2 = _interopRequireDefault(_drawTypesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (url) {
    var arrList = void 0;
    fetch(url).then(function (response) {
        //console.log(response);
        return response.json();
    }).then(function (json) {
        //console.log(json.objects);
        var typesBlock = document.createElement('DIV');
        arrList = json.objects;
        (0, _drawTypesList2.default)(arrList, typesBlock);
    });
};
//console.log(typesArr);

},{"./draw-Types-List":4}],8:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYWRkVG9GYXYuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGNob29zZS1mdW5jLmpzIiwic3JjXFxhcHBcXGRyYXctVHlwZXMtTGlzdC5qcyIsInNyY1xcYXBwXFxkcmF3UG9rZW1vbi5qcyIsInNyY1xcYXBwXFxkcmF3VHlwZXNVbmRlckltZy5qcyIsInNyY1xcYXBwXFxnZXRUeXBlc0xpc3QuanMiLCJzcmNcXGFwcFxcbG9hZE1vcmVCdG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7a0JDQWMsVUFBQyxPQUFELEVBQVk7QUFDdEIsU0FBSSxjQUFjLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFsQjtBQUNFLFNBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxlQUFVLFdBQVYsQ0FBc0IsT0FBdEI7QUFDTCxDOzs7Ozs7Ozs7O0FDSkQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7O0FBRUEsSUFBSSxVQUFVLHNEQUFkO0FBQ0EsSUFBSSxRQUFRLG1CQUFaO0FBQ08sSUFBSSxzQ0FBZSwwQ0FBbkI7QUFDQSxJQUFJLDRCQUFVLEVBQWQ7QUFDQSxJQUFNLGdDQUFZLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBbEI7QUFDQSxJQUFJLDhCQUFXLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFmO0FBQ0EsSUFBTSx3Q0FBZ0IsRUFBdEI7QUFDQSxJQUFNLG9DQUFjLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFwQjtBQUNQLElBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBbEI7O0FBRUEsMEJBQVcsU0FBWDtBQUNPLElBQUksZ0NBQVksU0FBWixTQUFZLENBQUMsR0FBRCxFQUFTO0FBQ2hDLFVBQU0sR0FBTixFQUNLLElBREwsQ0FDVSxVQUFDLFFBQUQsRUFB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QUNEOzs7Ozs7Ozs7a0JDZGUsWUFBTTs7QUFFcEIsS0FBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBQ0EsS0FBSSxTQUFKLEdBQWdCLGFBQWhCO0FBQ0EsS0FBSSxTQUFKLEdBQWdCLFdBQWhCO0FBQ0EsS0FBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFmO0FBQ0EsVUFBUyxXQUFULENBQXFCLEdBQXJCOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdChwb2tlQm94KSA9PntcclxuXHQgICBsZXQgZmF2b3JpdGVCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmF2b3JpdGUnKTtcclxuICAgICAgbGV0IHBva2VGYXZvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICBwb2tlRmF2b3IuYXBwZW5kQ2hpbGQocG9rZUJveCk7XHJcbn0iLCJpbXBvcnQgZHJhd1Bva2Vtb24gZnJvbSAnLi9kcmF3UG9rZW1vbic7XHJcbmltcG9ydCBjcmVhdGVCdG4gZnJvbSAnLi9sb2FkTW9yZUJ0bic7XHJcbmltcG9ydCBjaG9vc2VGdW5jIGZyb20gJy4vY2hvb3NlLWZ1bmMnO1xyXG5pbXBvcnQgYWRkVG9GYXYgZnJvbSAnLi9hZGRUb0Zhdic7XHJcbmltcG9ydCB0eXBlQXJyIGZyb20gJy4vZ2V0VHlwZXNMaXN0JztcclxuLy9pbXBvcnQgdG9Eb0ZpbHRlciBmcm9tICcuL21ha2VGaWx0ZXInO1xyXG5cclxubGV0IHJlcXVlc3QgPSAnaHR0cDovL3Bva2VhcGkuY28vYXBpL3YxL3Bva2Vtb24vP2xpbWl0PTEyJm9mZnNldD0xMic7XHJcbmxldCBxdWVyeSA9ICdodHRwOi8vcG9rZWFwaS5jbyc7XHJcbmV4cG9ydCBsZXQgdHlwZXNSZXF1ZXN0ID0gJ2h0dHA6Ly9wb2tlYXBpLmNvL2FwaS92MS90eXBlLz9saW1pdD05OTknO1xyXG5leHBvcnQgbGV0IG5leHRVcmwgPSAnJztcclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRhaW5lcicpO1xyXG5leHBvcnQgbGV0IHR5cGVzQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyN0eXBlc0JveCcpO1xyXG5leHBvcnQgY29uc3QgcG9rZW1vbl9BcnJheSA9IFtdO1xyXG5leHBvcnQgY29uc3QgaW5wdXRTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJyk7XHJcbmxldCBmYXZvcml0ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXZvcml0ZScpO1xyXG5cclxuY2hvb3NlRnVuYyhjb250YWluZXIpO1xyXG5leHBvcnQgbGV0IG1ha2VGZXRjaCA9ICh1cmwpID0+IHtcclxuZmV0Y2godXJsKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChwb2tlTGlzdCk9PntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIGRyYXdQb2tlbW9uKHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIG5leHRVcmwgPSBxdWVyeSArIHBva2VMaXN0Lm1ldGEubmV4dDtcclxuICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1ha2VGZXRjaChyZXF1ZXN0KTtcclxuY3JlYXRlQnRuKCk7XHJcbnZhciBidG5UID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRNb3JlQnRuJyk7XHJcbmJ0blQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IG1ha2VGZXRjaChuZXh0VXJsKSk7XHJcblxyXG5sZXQgc2hvd1Bva2Vtb24gPSAoKSA9PiB7XHJcblxyXG4gICAgbGV0IGxlbmd0aCA9IGxvY2FsU3RvcmFnZS5sZW5ndGg7XHJcbiAgICAgICAgaWYobGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgdSA9MDsgdTxsZW5ndGg7IHUrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gbG9jYWxTdG9yYWdlLmtleSh1KTtcclxuICAgICAgICAgICAgICAgICAgbGV0ICBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmlkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ3Bva2VCb3gnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9rZUZhdm9ySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBva2VGYXZvckltZy5jbGFzc05hbWUgPSAncG9rZUltZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZCA9ICcjNjY2NmZmJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2tlRmF2b3JJbWcuc3JjID0gZGF0YS5pbWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlQm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHBva2VGYXZvckltZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTmFtZSA9ICduYW1lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS5pbm5lckhUTUwgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICB0eXBlcy5jbGFzc05hbWUgPSAndHlwZXMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlcy5pbm5lckhUTUwgPSBkYXRhLnR5cGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHR5cGVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEudHlwZXMxICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGVzMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXMuY2xhc3NOYW1lID0gJ3R5cGVzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVzLmlubmVySFRNTCA9IGRhdGEudHlwZXMxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0eXBlczEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oZGl2LmlkKTtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlQm94LnJlbW92ZUNoaWxkKGRpdik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxufVxyXG5cclxuc2hvd1Bva2Vtb24oKTsiLCJleHBvcnQgZGVmYXVsdFx0KGNvbnRhaW5lcikgPT57XHJcblxyXG52YXIgY3VycmVudEVsZW0gPSBudWxsO1xyXG5sZXQgYnRuX0FkZF90b19GYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuYnRuX0FkZF90b19GYXYuY2xhc3NOYW1lID0gJ2J0bl9hZGRfdG9fRmF2Qm94JztcclxuYnRuX0FkZF90b19GYXYuaW5uZXJIVE1MID0gJ2FkZCB0byBGYXZhcml0ZSc7XHJcbmNvbnRhaW5lci5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgaWYgKGN1cnJlbnRFbGVtKSB7XHJcbiAgICAvLyDQv9C10YDQtdC0INGC0LXQvCwg0LrQsNC6INC30LDQudGC0Lgg0LIg0L3QvtCy0YvQuSDRjdC70LXQvNC10L3Rgiwg0LrRg9GA0YHQvtGAINCy0YHQtdCz0LTQsCDQstGL0YXQvtC00LjRgiDQuNC3INC/0YDQtdC00YvQtNGD0YnQtdCz0L5cclxuICAgIC8vXHJcbiAgICAvLyDQtdGB0LvQuCDQvNGLINC10YnQtSDQvdC1INCy0YvRiNC70LgsINC30L3QsNGH0LjRgiDRjdGC0L4g0L/QtdGA0LXRhdC+0LQg0LLQvdGD0YLRgNC4INGN0LvQtdC80LXQvdGC0LAsINC+0YLRhNC40LvRjNGC0YDRg9C10Lwg0LXQs9C+XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyDQv9C+0YHQvNC+0YLRgNC40LwsINC60YPQtNCwINC/0YDQuNGI0ZHQuyDQutGD0YDRgdC+0YBcclxuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAvLyDRg9C2INC90LUg0L3QsCBURCDQu9C4P1xyXG4gIHdoaWxlICh0YXJnZXQgIT0gdGhpcykge1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3Bva2VCb3gnKSBicmVhaztcclxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gIH1cclxuICBpZiAodGFyZ2V0ID09IHRoaXMpIHJldHVybjtcclxuXHJcbiAgLy8g0LTQsCwg0Y3Qu9C10LzQtdC90YIg0L/QtdGA0LXRiNGR0Lsg0LLQvdGD0YLRgNGMIFREIVxyXG4gIGN1cnJlbnRFbGVtID0gdGFyZ2V0O1xyXG4gIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMwMDY2NjYnO1xyXG4gIHRhcmdldC5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XHJcblxyXG4gIHRhcmdldC5hcHBlbmRDaGlsZChidG5fQWRkX3RvX0Zhdik7XHJcbiAgXHJcbn07XHJcblxyXG5jb250YWluZXIub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgLy8g0LXRgdC70Lgg0LrRg9GA0YHQvtGAINC4INGC0LDQuiDRgdC90LDRgNGD0LbQuCAtINC40LPQvdC+0YDQuNGA0YPQtdC8INGN0YLQviDRgdC+0LHRi9GC0LjQtVxyXG4gIGlmICghY3VycmVudEVsZW0pIHJldHVybjtcclxuXHJcbiAgLy8g0L/RgNC+0LjQt9C+0YjRkdC7INGD0YXQvtC0INGBINGN0LvQtdC80LXQvdGC0LAgLSDQv9GA0L7QstC10YDQuNC8LCDQutGD0LTQsCwg0LzQvtC20LXRgiDQsdGL0YLRjCDQvdCwINC/0L7RgtC+0LzQutCwP1xyXG4gIHZhciByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcclxuICBpZiAocmVsYXRlZFRhcmdldCkgeyAvLyDQvNC+0LbQtdGCINCx0YvRgtGMIHJlbGF0ZWRUYXJnZXQgPSBudWxsXHJcbiAgICB3aGlsZSAocmVsYXRlZFRhcmdldCkge1xyXG4gICAgICAvLyDQuNC00ZHQvCDQv9C+INGG0LXQv9C+0YfQutC1INGA0L7QtNC40YLQtdC70LXQuSDQuCDQv9GA0L7QstC10YDRj9C10LwsXHJcbiAgICAgIC8vINC10YHQu9C4INC/0LXRgNC10YXQvtC0INCy0L3Rg9GC0YDRjCBjdXJyZW50RWxlbSAtINC40LPQvdC+0YDQuNGA0YPQtdC8INGN0YLQviDRgdC+0LHRi9GC0LjQtVxyXG4gICAgICBpZiAocmVsYXRlZFRhcmdldCA9PSBjdXJyZW50RWxlbSkgcmV0dXJuO1xyXG4gICAgICByZWxhdGVkVGFyZ2V0ID0gcmVsYXRlZFRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g0L/RgNC+0LjQt9C+0YjQu9C+INGB0L7QsdGL0YLQuNC1IG1vdXNlb3V0LCDQutGD0YDRgdC+0YAg0YPRiNGR0LtcclxuICBjdXJyZW50RWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XHJcbiAgY3VycmVudEVsZW0uc3R5bGUuY29sb3I9J2JsYWNrJztcclxuICBjdXJyZW50RWxlbS5yZW1vdmVDaGlsZChidG5fQWRkX3RvX0Zhdik7XHJcbiAgY3VycmVudEVsZW0gPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgIFxyXG4gXHJcbiAgICBidG5fQWRkX3RvX0Zhdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcclxuXHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBcclxuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIGxldCBpbWFnZSA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb2tlSW1nJyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlWzBdLnNyYyk7XHJcbiAgICBsZXQgaW1nVXJsID0gaW1hZ2VbMF0uc3JjO1xyXG5cclxuICAgICAgICBsZXQgYWRkVG9GYXYgPSAodXJsKSA9PiB7XHJcbiAgICAgICAgICAgIC8vL2NvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBmYXZvcml0ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXZvcml0ZScpO1xyXG4gICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICAgZGl2LmlkID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdwb2tlQm94JztcclxuICAgICAgICAgIG9iai5pZCA9IHRhcmdldC5pZDtcclxuICAgICAgICAgIG9iai5pbWcgPSB1cmw7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgIC8vZGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBva2VGYXZvckltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgICAgICAgICBwb2tlRmF2b3JJbWcuY2xhc3NOYW1lID0gJ3Bva2VJbWcnO1xyXG4gICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSAnIzY2NjZmZic7XHJcbiAgICAgICAgICAgICAgICBwb2tlRmF2b3JJbWcuc3JjID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlQm94LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHBva2VGYXZvckltZyk7XHJcblxyXG4gICAgICAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgIG5hbWUuY2xhc3NOYW1lID0gJ25hbWUnO1xyXG4gICAgICAgICAgbmFtZS5pbm5lckhUTUwgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmFtZScpWzBdLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgb2JqLm5hbWUgPSBuYW1lLmlubmVySFRNTDtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuXHJcbiAgICAgICAgICBsZXQgYXJyVHlwZXMgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHlwZXMnKTtcclxuICAgICAgICAgIGFyclR5cGVzLmZvckVhY2ggPSBbXS5mb3JFYWNoO1xyXG4gICAgICAgICAgICBhcnJUeXBlcy5mb3JFYWNoKChpdGVtLCBpLCBhcnJUeXBlcyk9PntcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIHR5cGVzLmNsYXNzTmFtZSA9ICd0eXBlcyc7XHJcbiAgICAgICAgICAgICAgICB0eXBlcy5pbm5lckhUTUwgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHlwZXMnKVtpXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgaWYoaTwxKXtcclxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZXMgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHlwZXMnKVtpXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG9iai50eXBlczEgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHlwZXMnKVtpXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0eXBlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRpdi5pZCwgSlNPTi5zdHJpbmdpZnkob2JqKSk7ICBcclxuXHJcbiAgICAgICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShkaXYuaWQpO1xyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGVCb3gucmVtb3ZlQ2hpbGQoZGl2KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhZGRUb0ZhdihpbWdVcmwpO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHtwb2tlbW9uX0FycmV5fSBmcm9tICcuL2FwcCc7XHJcblxyXG4vL2NvbnNvbGUubG9nKHBva2Vtb25fQXJyZXkpO1xyXG5leHBvcnQgZGVmYXVsdCAoYXJyKSA9PiB7XHJcblx0Ly9jb25zb2xlLmxvZyhhcnIpO1xyXG5cdC8vY29uc29sZS5sb2coY29udGFpbmVyKTtcclxuXHJcblxyXG5cdGxldCBzZWFyY2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdHNlYXJjaC5jbGFzc05hbWUgPSAnc2VhcmNoJztcclxuXHQvL3NlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdvbmtleXVwJywgZmlsdGVyKCkpO1xyXG59IiwiaW1wb3J0IGdldFR5cGVzIGZyb20gJy4vZHJhd1R5cGVzVW5kZXJJbWcnO1xyXG5pbXBvcnQgY3JlYXRlQnRuIGZyb20gJy4vbG9hZE1vcmVCdG4nO1xyXG5pbXBvcnQge25leHRVcmx9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHttYWtlRmV0Y2h9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHtjb250YWluZXJ9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHtwb2tlbW9uX0FycmF5fSBmcm9tICcuL2FwcCc7XHJcbmltcG9ydCB7aW5wdXRTZWFyY2h9IGZyb20gJy4vYXBwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChhcnIpID0+IHtcclxuYXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGksIGFycil7XHJcbiAgICAgICAgcG9rZW1vbl9BcnJheS5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgLy9maWx0ZXIocG9rZW1vbl9BcnJheSk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHBva2Vtb25fQXJyYXlbMV0pOyAgXHJcbmFyci5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGksIGFycil7XHJcbiAgICBsZXQgaW1nUmVxdWVzdCA9IFwiaHR0cDovL3Bva2VhcGkuY28vbWVkaWEvaW1nL1wiO1xyXG4gICAgICAgIGxldCBpZCA9IGFycltpXS5wa2R4X2lkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdwb2tlQm94JztcclxuICAgICAgICAgICAgIGRpdi5pZCA9IGFycltpXS5wa2R4X2lkO1xyXG5cclxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICAgICAgIGltZy5jbGFzc05hbWUgPSAncG9rZUltZyc7XHJcbiAgICAgICAgICAgIGltZy5zcmM9YGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Qb2tlQVBJL3Nwcml0ZXMvbWFzdGVyL3Nwcml0ZXMvcG9rZW1vbi9vdGhlci1zcHJpdGVzL29mZmljaWFsLWFydHdvcmsvJHtpZH0ucG5nYFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBuYW1lLmNsYXNzTmFtZSA9IFwibmFtZVwiO1xyXG4gICAgICAgICAgICAgbmFtZS5pbm5lckhUTUwgPSBhcnJbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFR5cGVzKGFycltpXS50eXBlcywgZGl2KTtcclxuXHJcbiAgICB9KTtcclxuICAgICAgIFxyXG5sZXQgYm94ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Bva2VCb3gnKTtcclxubGV0IHZhbHVlID0gJyc7ICAgICAgICAgICAgIFxyXG5pbnB1dFNlYXJjaC5vbmlucHV0ID0gKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhpbnB1dFNlYXJjaC52YWx1ZSk7XHJcbiAgICAgdmFsdWUgPSBpbnB1dFNlYXJjaC52YWx1ZTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGk8Ym94Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckFycmV5PVtdO1xyXG4gICAgICAgICAgICBsZXQgc3BhbiA9IGJveFtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYoc3Bhbi5pbm5lckhUTUwuaW5kZXhPZih2YWx1ZSkgPiAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIGJveFtpXS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4gPSBib3hbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHlwZXMnKVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BhbiAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwYW4uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFtpXS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIC8qIHNwYW4uZm9yRWFjaCA9IFtdLmZvckVhY2g7XHJcbiAgICAgICAgICAgICAgICBzcGFuLmZvckVhY2goKGl0ZW0sIHEsIHNwYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGFuW3FdLmlubmVySFRNTC5pbmRleE9mKHZhbHVlKSA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BhbltxXS5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3hbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuICAvKnNwYW4uZm9yRWFjaCA9IFtdLmZvckVhY2g7XHJcbiAgICAgICAgICAgICAgICBzcGFuLmZvckVhY2goKGl0ZW0sIHEsIHNwYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGFuW3FdLmlubmVySFRNTC5pbmRleE9mKHZhbHVlKSA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BhbltxXS5pbm5lckhUTUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICBib3hbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyovXHJcblxyXG4iLCJpbXBvcnQge2lucHV0U2VhcmNofSBmcm9tICcuL2FwcCc7XHJcbmltcG9ydCB7ZHJhd1Bva2Vtb259IGZyb20gJy4vZHJhd1Bva2Vtb24nO1xyXG5leHBvcnQgZGVmYXVsdCAoYXJyLCB0YWcpID0+e1xyXG5cdC8vaW5wdXRTZWFyY2gub25pbnB1dCA9ICgpID0+e1xyXG5cdC8vbGV0IHZhbHVlID0gaW5wdXRTZWFyY2gudmFsdWU7XHJcblx0Ly9jb25zb2xlLmxvZyh2YWx1ZSk7XHJcblx0XHRcdFxyXG5cdGFyci5mb3JFYWNoKChpdGVtLCBpLCBhcnIpPT57XHJcblx0Ly9pZihpdGVtLm5hbWUuaW5kZXhPZih2YWx1ZSkgPiAtMSl7XHRcclxuXHQvL3RhZy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblx0XHRsZXQgdHlwZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBcdHR5cGVzLmNsYXNzTmFtZSA9IFwidHlwZXNcIjtcclxuICAgIFx0dHlwZXMuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xyXG4gICAgXHR0YWcuYXBwZW5kQ2hpbGQodHlwZXMpO1xyXG4gICAgXHR9KTtcclxuICAgIC8vaWYodmFsdWUgPT0gJycpe1xyXG4gICAgLy9sZXQgdHlwZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAvL3R5cGVzLmNsYXNzTmFtZSA9IFwidHlwZXNcIjtcclxuICAgIC8vdHlwZXMuaW5uZXJIVE1MID0gaXRlbS5uYW1lO1xyXG4gICAgLy90YWcuYXBwZW5kQ2hpbGQodHlwZXMpO1xyXG4gICAgXHRcdFxyXG4gICAgLy99XHJcbiAgICAvL2lmIChpdGVtLm5hbWUuaW5kZXhPZih2YWx1ZSkgPT0gMSl7XHJcbiAgICAvL1x0dGFnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAvL1x0XHRcdH1cclxuXHQvL1x0XHR9KTtcclxuXHRcdFxyXG5cdC8vfVxyXG59XHRcdFx0XHQiLCJpbXBvcnQgZHJhd1R5cGVzTGlzdCBmcm9tICcuL2RyYXctVHlwZXMtTGlzdCc7XHJcbmV4cG9ydCBkZWZhdWx0KHVybCkgPT4ge1xyXG5sZXQgYXJyTGlzdCA7XHJcblx0ZmV0Y2godXJsKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChqc29uKT0+e1xyXG4gICAgICAgICAvL2NvbnNvbGUubG9nKGpzb24ub2JqZWN0cyk7XHJcbiAgICAgICAgIGNvbnN0IHR5cGVzQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICBhcnJMaXN0ID0ganNvbi5vYmplY3RzO1xyXG4gICAgICAgIFx0ZHJhd1R5cGVzTGlzdChhcnJMaXN0LCB0eXBlc0Jsb2NrKTtcclxuICAgIH0pO1xyXG59XHJcbi8vY29uc29sZS5sb2codHlwZXNBcnIpO1xyXG4iLCJcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG5cdFxyXG5cdGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcclxuXHRidG4uY2xhc3NOYW1lID0gJ2xvYWRNb3JlQnRuJztcclxuXHRidG4uaW5uZXJIVE1MID0gJ0xvYWQgbW9yZSc7XHJcblx0bGV0IGJsb2NrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bicpO1xyXG5cdGJsb2NrQnRuLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG5cdC8vYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFrZUZldGNoKG5leHRVcmwpKTtcclxufSJdfQ==
