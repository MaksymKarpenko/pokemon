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


var request = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';;
var query = 'http://pokeapi.co';
var typesRequest = exports.typesRequest = 'http://pokeapi.co/api/v1/type/?limit=999';
var nextUrl = exports.nextUrl = '';
var container = exports.container = document.getElementById('post-container');
container.className = 'animate-bottom';
var typesBox = exports.typesBox = document.getElementById('#typesBox');
var pokemon_Array = exports.pokemon_Array = [];
var inputSearch = exports.inputSearch = document.querySelector('#search');
var favoriteBox = document.querySelector('#favorite');
var loader = document.getElementById('loader');

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

window.onload = function () {
    setTimeout(function () {
        loader.style.display = 'none';
        container.style.display = 'block';
        favoriteBox.style.display = 'block';
    }, 3000);
};

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
      /// console.log(url);

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
    console.log(box);
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

  arr.forEach(function (item, i, arr) {

    var types = document.createElement('span');
    types.className = "types";
    types.innerHTML = item.name;
    tag.appendChild(types);
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcFxcYWRkVG9GYXYuanMiLCJzcmNcXGFwcFxcYXBwLmpzIiwic3JjXFxhcHBcXGNob29zZS1mdW5jLmpzIiwic3JjXFxhcHBcXGRyYXctVHlwZXMtTGlzdC5qcyIsInNyY1xcYXBwXFxkcmF3UG9rZW1vbi5qcyIsInNyY1xcYXBwXFxkcmF3VHlwZXNVbmRlckltZy5qcyIsInNyY1xcYXBwXFxnZXRUeXBlc0xpc3QuanMiLCJzcmNcXGFwcFxcbG9hZE1vcmVCdG4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7a0JDQWMsVUFBQyxPQUFELEVBQVk7QUFDdEIsU0FBSSxjQUFjLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFsQjtBQUNFLFNBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxlQUFVLFdBQVYsQ0FBc0IsT0FBdEI7QUFDTCxDOzs7Ozs7Ozs7O0FDSkQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7OztBQUdBLElBQUksVUFBVSxzREFBZCxDQUFxRTtBQUNyRSxJQUFJLFFBQVEsbUJBQVo7QUFDTyxJQUFJLHNDQUFlLDBDQUFuQjtBQUNBLElBQUksNEJBQVUsRUFBZDtBQUNBLElBQU0sZ0NBQVksU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUFsQjtBQUNQLFVBQVUsU0FBVixHQUFzQixnQkFBdEI7QUFDTyxJQUFJLDhCQUFXLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFmO0FBQ0EsSUFBTSx3Q0FBZ0IsRUFBdEI7QUFDQSxJQUFNLG9DQUFjLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFwQjtBQUNQLElBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBbEI7QUFDQSxJQUFJLFNBQVMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWI7O0FBRUEsMEJBQVcsU0FBWDtBQUNPLElB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QUNJLElBREosQ0FDUyxVQUFDLFFBQUQsRUFBYTtBQUNmO0FBQ0EsZUFBTyxTQUFTLElBQVQsRUFBUDtBQUNILEtBSkosRUFLSSxJQUxKLENBS1MsVUFBQyxJQUFELEVBQVE7QUFDVDtBQUNBLFlBQU0sYUFBYSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDRCxrQkFBVSxLQUFLLE9BQWY7QUFDQyxxQ0FBYyxPQUFkLEVBQXVCLFVBQXZCO0FBQ0osS0FWSjtBQVdBLEM7QUFDRDs7Ozs7Ozs7O2tCQ2RlLFlBQU07O0FBRXBCLEtBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVjtBQUNBLEtBQUksU0FBSixHQUFnQixhQUFoQjtBQUNBLEtBQUksU0FBSixHQUFnQixXQUFoQjtBQUNBLEtBQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZjtBQUNBLFVBQVMsV0FBVCxDQUFxQixHQUFyQjs7QUFFQTtBQUNBLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQocG9rZUJveCkgPT57XHJcblx0ICAgbGV0IGZhdm9yaXRlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zhdm9yaXRlJyk7XHJcbiAgICAgIGxldCBwb2tlRmF2b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgcG9rZUZhdm9yLmFwcGVuZENoaWxkKHBva2VCb3gpO1xyXG59IiwiaW1wb3J0IGRyYXdQb2tlbW9uIGZyb20gJy4vZHJhd1Bva2Vtb24nO1xyXG5pbXBvcnQgY3JlYXRlQnRuIGZyb20gJy4vbG9hZE1vcmVCdG4nO1xyXG5pbXBvcnQgY2hvb3NlRnVuYyBmcm9tICcuL2Nob29zZS1mdW5jJztcclxuaW1wb3J0IGFkZFRvRmF2IGZyb20gJy4vYWRkVG9GYXYnO1xyXG5pbXBvcnQgdHlwZUFyciBmcm9tICcuL2dldFR5cGVzTGlzdCc7XHJcbi8vaW1wb3J0IHRvRG9GaWx0ZXIgZnJvbSAnLi9tYWtlRmlsdGVyJztcclxuXHJcblxyXG5sZXQgcmVxdWVzdCA9ICdodHRwOi8vcG9rZWFwaS5jby9hcGkvdjEvcG9rZW1vbi8/bGltaXQ9MTImb2Zmc2V0PTEyJzs7XHJcbmxldCBxdWVyeSA9ICdodHRwOi8vcG9rZWFwaS5jbyc7XHJcbmV4cG9ydCBsZXQgdHlwZXNSZXF1ZXN0ID0gJ2h0dHA6Ly9wb2tlYXBpLmNvL2FwaS92MS90eXBlLz9saW1pdD05OTknO1xyXG5leHBvcnQgbGV0IG5leHRVcmwgPSAnJztcclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0LWNvbnRhaW5lcicpO1xyXG5jb250YWluZXIuY2xhc3NOYW1lID0gJ2FuaW1hdGUtYm90dG9tJ1xyXG5leHBvcnQgbGV0IHR5cGVzQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyN0eXBlc0JveCcpO1xyXG5leHBvcnQgY29uc3QgcG9rZW1vbl9BcnJheSA9IFtdO1xyXG5leHBvcnQgY29uc3QgaW5wdXRTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJyk7XHJcbmxldCBmYXZvcml0ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXZvcml0ZScpO1xyXG5sZXQgbG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRlcicpO1xyXG5cclxuY2hvb3NlRnVuYyhjb250YWluZXIpO1xyXG5leHBvcnQgbGV0IG1ha2VGZXRjaCA9ICh1cmwpID0+IHtcclxuZmV0Y2godXJsKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChwb2tlTGlzdCk9PntcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIGRyYXdQb2tlbW9uKHBva2VMaXN0Lm9iamVjdHMpO1xyXG4gICAgICAgIG5leHRVcmwgPSBxdWVyeSArIHBva2VMaXN0Lm1ldGEubmV4dDtcclxuICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1ha2VGZXRjaChyZXF1ZXN0KTtcclxuXHJcbmNyZWF0ZUJ0bigpO1xyXG52YXIgYnRuVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkTW9yZUJ0bicpO1xyXG5idG5ULmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiBtYWtlRmV0Y2gobmV4dFVybCkpO1xyXG5cclxubGV0IHNob3dQb2tlbW9uID0gKCkgPT4ge1xyXG5cclxuICAgIGxldCBsZW5ndGggPSBsb2NhbFN0b3JhZ2UubGVuZ3RoO1xyXG4gICAgICAgIGlmKGxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IHUgPTA7IHU8bGVuZ3RoOyB1Kyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGxvY2FsU3RvcmFnZS5rZXkodSk7XHJcbiAgICAgICAgICAgICAgICAgIGxldCAgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdwb2tlQm94JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBva2VGYXZvckltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlRmF2b3JJbWcuY2xhc3NOYW1lID0gJ3Bva2VJbWcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSAnIzY2NjZmZic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9rZUZhdm9ySW1nLnNyYyA9IGRhdGEuaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUJveC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChwb2tlRmF2b3JJbWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS5jbGFzc05hbWUgPSAnbmFtZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUuaW5uZXJIVE1MID0gZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgdHlwZXMuY2xhc3NOYW1lID0gJ3R5cGVzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZXMuaW5uZXJIVE1MID0gZGF0YS50eXBlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0eXBlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLnR5cGVzMSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlczEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVzLmNsYXNzTmFtZSA9ICd0eXBlcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlcy5pbm5lckhUTUwgPSBkYXRhLnR5cGVzMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodHlwZXMxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGRpdi5pZCk7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZUJveC5yZW1vdmVDaGlsZChkaXYpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbn1cclxuXHJcbnNob3dQb2tlbW9uKCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9hZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGZhdm9yaXRlQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSwgMzAwMCk7XHJcbiB9IFxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0XHQoY29udGFpbmVyKSA9PntcclxuXHJcbnZhciBjdXJyZW50RWxlbSA9IG51bGw7XHJcbmxldCBidG5fQWRkX3RvX0ZhdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xyXG5idG5fQWRkX3RvX0Zhdi5jbGFzc05hbWUgPSAnYnRuX2FkZF90b19GYXZCb3gnO1xyXG5idG5fQWRkX3RvX0Zhdi5pbm5lckhUTUwgPSAnYWRkIHRvIEZhdmFyaXRlJztcclxuY29udGFpbmVyLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAoY3VycmVudEVsZW0pIHtcclxuICAgIC8vINC/0LXRgNC10LQg0YLQtdC8LCDQutCw0Log0LfQsNC50YLQuCDQsiDQvdC+0LLRi9C5INGN0LvQtdC80LXQvdGCLCDQutGD0YDRgdC+0YAg0LLRgdC10LPQtNCwINCy0YvRhdC+0LTQuNGCINC40Lcg0L/RgNC10LTRi9C00YPRidC10LPQvlxyXG4gICAgLy9cclxuICAgIC8vINC10YHQu9C4INC80Ysg0LXRidC1INC90LUg0LLRi9GI0LvQuCwg0LfQvdCw0YfQuNGCINGN0YLQviDQv9C10YDQtdGF0L7QtCDQstC90YPRgtGA0Lgg0Y3Qu9C10LzQtdC90YLQsCwg0L7RgtGE0LjQu9GM0YLRgNGD0LXQvCDQtdCz0L5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vINC/0L7RgdC80L7RgtGA0LjQvCwg0LrRg9C00LAg0L/RgNC40YjRkdC7INC60YPRgNGB0L7RgFxyXG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gIC8vINGD0LYg0L3QtSDQvdCwIFREINC70Lg/XHJcbiAgd2hpbGUgKHRhcmdldCAhPSB0aGlzKSB7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAncG9rZUJveCcpIGJyZWFrO1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgfVxyXG4gIGlmICh0YXJnZXQgPT0gdGhpcykgcmV0dXJuO1xyXG5cclxuICAvLyDQtNCwLCDRjdC70LXQvNC10L3RgiDQv9C10YDQtdGI0ZHQuyDQstC90YPRgtGA0YwgVEQhXHJcbiAgY3VycmVudEVsZW0gPSB0YXJnZXQ7XHJcbiAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnIzAwNjY2Nic7XHJcbiAgdGFyZ2V0LnN0eWxlLmNvbG9yID0gJ3doaXRlJztcclxuXHJcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKGJ0bl9BZGRfdG9fRmF2KTtcclxuICBcclxufTtcclxuXHJcbmNvbnRhaW5lci5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAvLyDQtdGB0LvQuCDQutGD0YDRgdC+0YAg0Lgg0YLQsNC6INGB0L3QsNGA0YPQttC4IC0g0LjQs9C90L7RgNC40YDRg9C10Lwg0Y3RgtC+INGB0L7QsdGL0YLQuNC1XHJcbiAgaWYgKCFjdXJyZW50RWxlbSkgcmV0dXJuO1xyXG5cclxuICAvLyDQv9GA0L7QuNC30L7RiNGR0Lsg0YPRhdC+0LQg0YEg0Y3Qu9C10LzQtdC90YLQsCAtINC/0YDQvtCy0LXRgNC40LwsINC60YPQtNCwLCDQvNC+0LbQtdGCINCx0YvRgtGMINC90LAg0L/QvtGC0L7QvNC60LA/XHJcbiAgdmFyIHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xyXG4gIGlmIChyZWxhdGVkVGFyZ2V0KSB7IC8vINC80L7QttC10YIg0LHRi9GC0YwgcmVsYXRlZFRhcmdldCA9IG51bGxcclxuICAgIHdoaWxlIChyZWxhdGVkVGFyZ2V0KSB7XHJcbiAgICAgIC8vINC40LTRkdC8INC/0L4g0YbQtdC/0L7Rh9C60LUg0YDQvtC00LjRgtC10LvQtdC5INC4INC/0YDQvtCy0LXRgNGP0LXQvCxcclxuICAgICAgLy8g0LXRgdC70Lgg0L/QtdGA0LXRhdC+0LQg0LLQvdGD0YLRgNGMIGN1cnJlbnRFbGVtIC0g0LjQs9C90L7RgNC40YDRg9C10Lwg0Y3RgtC+INGB0L7QsdGL0YLQuNC1XHJcbiAgICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09IGN1cnJlbnRFbGVtKSByZXR1cm47XHJcbiAgICAgIHJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkVGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDQv9GA0L7QuNC30L7RiNC70L4g0YHQvtCx0YvRgtC40LUgbW91c2VvdXQsINC60YPRgNGB0L7RgCDRg9GI0ZHQu1xyXG4gIGN1cnJlbnRFbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcclxuICBjdXJyZW50RWxlbS5zdHlsZS5jb2xvcj0nYmxhY2snO1xyXG4gIGN1cnJlbnRFbGVtLnJlbW92ZUNoaWxkKGJ0bl9BZGRfdG9fRmF2KTtcclxuICBjdXJyZW50RWxlbSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG4gICAgXHJcbiBcclxuICAgIGJ0bl9BZGRfdG9fRmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KT0+e1xyXG5cclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIFxyXG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuICAgIGxldCBpbWFnZSA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb2tlSW1nJyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlWzBdLnNyYyk7XHJcbiAgICBsZXQgaW1nVXJsID0gaW1hZ2VbMF0uc3JjO1xyXG5cclxuICAgICAgICBsZXQgYWRkVG9GYXYgPSAodXJsKSA9PiB7XHJcbiAgICAgICAgICAgLy8vIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBmYXZvcml0ZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXZvcml0ZScpO1xyXG4gICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICAgZGl2LmlkID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ3Bva2VCb3gnO1xyXG4gICAgICAgICAgb2JqLmlkID0gdGFyZ2V0LmlkO1xyXG4gICAgICAgICAgb2JqLmltZyA9IHVybDtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgICAgICAgLy9kaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcG9rZUZhdm9ySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICAgICAgICAgIHBva2VGYXZvckltZy5jbGFzc05hbWUgPSAncG9rZUltZyc7XHJcbiAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZCA9ICcjNjY2NmZmJztcclxuICAgICAgICAgICAgICAgIHBva2VGYXZvckltZy5zcmMgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVCb3guYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQocG9rZUZhdm9ySW1nKTtcclxuXHJcbiAgICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgbmFtZS5jbGFzc05hbWUgPSAnbmFtZSc7XHJcbiAgICAgICAgICBuYW1lLmlubmVySFRNTCA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYW1lJylbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICBvYmoubmFtZSA9IG5hbWUuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhvYmopO1xyXG4gICAgICAgICAgZGl2LmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgICAgICAgIGxldCBhcnJUeXBlcyA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpO1xyXG4gICAgICAgICAgYXJyVHlwZXMuZm9yRWFjaCA9IFtdLmZvckVhY2g7XHJcbiAgICAgICAgICAgIGFyclR5cGVzLmZvckVhY2goKGl0ZW0sIGksIGFyclR5cGVzKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgdHlwZXMuY2xhc3NOYW1lID0gJ3R5cGVzJztcclxuICAgICAgICAgICAgICAgIHR5cGVzLmlubmVySFRNTCA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpW2ldLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICBpZihpPDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50eXBlcyA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpW2ldLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgb2JqLnR5cGVzMSA9IHRhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpW2ldLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHR5cGVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZGl2LmlkLCBKU09OLnN0cmluZ2lmeShvYmopKTsgIFxyXG5cclxuICAgICAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGRpdi5pZCk7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZUJveC5yZW1vdmVDaGlsZChkaXYpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFkZFRvRmF2KGltZ1VybCk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQge3Bva2Vtb25fQXJyZXl9IGZyb20gJy4vYXBwJztcclxuXHJcbi8vY29uc29sZS5sb2cocG9rZW1vbl9BcnJleSk7XHJcbmV4cG9ydCBkZWZhdWx0IChhcnIpID0+IHtcclxuXHQvL2NvbnNvbGUubG9nKGFycik7XHJcblx0Ly9jb25zb2xlLmxvZyhjb250YWluZXIpO1xyXG5cclxuXHJcblx0bGV0IHNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0c2VhcmNoLmNsYXNzTmFtZSA9ICdzZWFyY2gnO1xyXG5cdC8vc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ29ua2V5dXAnLCBmaWx0ZXIoKSk7XHJcbn0iLCJpbXBvcnQgZ2V0VHlwZXMgZnJvbSAnLi9kcmF3VHlwZXNVbmRlckltZyc7XHJcbmltcG9ydCBjcmVhdGVCdG4gZnJvbSAnLi9sb2FkTW9yZUJ0bic7XHJcbmltcG9ydCB7bmV4dFVybH0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQge21ha2VGZXRjaH0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQge2NvbnRhaW5lcn0gZnJvbSAnLi9hcHAnO1xyXG5pbXBvcnQge3Bva2Vtb25fQXJyYXl9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHtpbnB1dFNlYXJjaH0gZnJvbSAnLi9hcHAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGFycikgPT4ge1xyXG5hcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSwgYXJyKXtcclxuICAgICAgICBwb2tlbW9uX0FycmF5LnB1c2goYXJyW2ldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAvL2ZpbHRlcihwb2tlbW9uX0FycmF5KTtcclxuICAgIC8vY29uc29sZS5sb2cocG9rZW1vbl9BcnJheVsxXSk7ICBcclxuYXJyLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSwgYXJyKXtcclxuICAgIGxldCBpbWdSZXF1ZXN0ID0gXCJodHRwOi8vcG9rZWFwaS5jby9tZWRpYS9pbWcvXCI7XHJcbiAgICAgICAgbGV0IGlkID0gYXJyW2ldLnBrZHhfaWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ3Bva2VCb3gnO1xyXG4gICAgICAgICAgICAgZGl2LmlkID0gYXJyW2ldLnBrZHhfaWQ7XHJcblxyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICdwb2tlSW1nJztcclxuICAgICAgICAgICAgaW1nLnNyYz1gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1Bva2VBUEkvc3ByaXRlcy9tYXN0ZXIvc3ByaXRlcy9wb2tlbW9uL290aGVyLXNwcml0ZXMvb2ZmaWNpYWwtYXJ0d29yay8ke2lkfS5wbmdgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIG5hbWUuY2xhc3NOYW1lID0gXCJuYW1lXCI7XHJcbiAgICAgICAgICAgICBuYW1lLmlubmVySFRNTCA9IGFycltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VHlwZXMoYXJyW2ldLnR5cGVzLCBkaXYpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgICAgXHJcbmxldCBib3ggPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9rZUJveCcpO1xyXG5jb25zb2xlLmxvZyhib3gpO1xyXG5sZXQgdmFsdWUgPSAnJzsgICAgICAgICAgICAgXHJcbmlucHV0U2VhcmNoLm9uaW5wdXQgPSAoKSA9PntcclxuICAgIGNvbnNvbGUubG9nKGlucHV0U2VhcmNoLnZhbHVlKTtcclxuICAgICB2YWx1ZSA9IGlucHV0U2VhcmNoLnZhbHVlO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaTxib3gubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyQXJyZXk9W107XHJcbiAgICAgICAgICAgIGxldCBzcGFuID0gYm94W2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R5cGVzJylbMF07XHJcbiAgICAgICAgICAgICAgICBpZihzcGFuLmlubmVySFRNTC5pbmRleE9mKHZhbHVlKSA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhbiA9IGJveFtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0eXBlcycpWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcGFuICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3Bhbi5pbm5lckhUTUwuaW5kZXhPZih2YWx1ZSkgPiAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgLyogc3Bhbi5mb3JFYWNoID0gW10uZm9yRWFjaDtcclxuICAgICAgICAgICAgICAgIHNwYW4uZm9yRWFjaCgoaXRlbSwgcSwgc3BhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYW5bcV0uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBib3hbaV0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcGFuW3FdLmlubmVySFRNTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4gIC8qc3Bhbi5mb3JFYWNoID0gW10uZm9yRWFjaDtcclxuICAgICAgICAgICAgICAgIHNwYW4uZm9yRWFjaCgoaXRlbSwgcSwgc3BhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYW5bcV0uaW5uZXJIVE1MLmluZGV4T2YodmFsdWUpID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcGFuW3FdLmlubmVySFRNTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGJveFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuXHJcbiIsImltcG9ydCB7aW5wdXRTZWFyY2h9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHtkcmF3UG9rZW1vbn0gZnJvbSAnLi9kcmF3UG9rZW1vbic7XHJcbmV4cG9ydCBkZWZhdWx0IChhcnIsIHRhZykgPT57XHJcblx0XHJcblx0YXJyLmZvckVhY2goKGl0ZW0sIGksIGFycik9PntcclxuXHRcclxuXHRcdGxldCB0eXBlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIFx0dHlwZXMuY2xhc3NOYW1lID0gXCJ0eXBlc1wiO1xyXG4gICAgXHR0eXBlcy5pbm5lckhUTUwgPSBpdGVtLm5hbWU7XHJcbiAgICBcdHRhZy5hcHBlbmRDaGlsZCh0eXBlcyk7XHJcbiAgICBcdH0pO1xyXG4gICBcclxufVx0XHRcdFx0IiwiaW1wb3J0IGRyYXdUeXBlc0xpc3QgZnJvbSAnLi9kcmF3LVR5cGVzLUxpc3QnO1xyXG5leHBvcnQgZGVmYXVsdCh1cmwpID0+IHtcclxubGV0IGFyckxpc3QgO1xyXG5cdGZldGNoKHVybClcclxuICAgIC50aGVuKChyZXNwb25zZSkgPT57XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigoanNvbik9PntcclxuICAgICAgICAgLy9jb25zb2xlLmxvZyhqc29uLm9iamVjdHMpO1xyXG4gICAgICAgICBjb25zdCB0eXBlc0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgYXJyTGlzdCA9IGpzb24ub2JqZWN0cztcclxuICAgICAgICBcdGRyYXdUeXBlc0xpc3QoYXJyTGlzdCwgdHlwZXNCbG9jayk7XHJcbiAgICB9KTtcclxufVxyXG4vL2NvbnNvbGUubG9nKHR5cGVzQXJyKTtcclxuIiwiXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuXHRcclxuXHRsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XHJcblx0YnRuLmNsYXNzTmFtZSA9ICdsb2FkTW9yZUJ0bic7XHJcblx0YnRuLmlubmVySFRNTCA9ICdMb2FkIG1vcmUnO1xyXG5cdGxldCBibG9ja0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4nKTtcclxuXHRibG9ja0J0bi5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuXHQvL2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1ha2VGZXRjaChuZXh0VXJsKSk7XHJcbn0iXX0=
