import drawPokemon from './drawPokemon';
import createBtn from './loadMoreBtn';
import chooseFunc from './choose-func';
import addToFav from './addToFav';
import typeArr from './getTypesList';
//import toDoFilter from './makeFilter';


let request = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';
let query = 'http://pokeapi.co';
export let typesRequest = 'http://pokeapi.co/api/v1/type/?limit=999';
export let nextUrl = '';
export const container = document.getElementById('post-container');
container.className = 'animate-bottom'
export let typesBox = document.getElementById('#typesBox');
export const pokemon_Array = [];
export const inputSearch = document.querySelector('#search');
let favoriteBox = document.querySelector('#favorite');
let loader = document.getElementById('loader');

chooseFunc(container);
export let makeFetch = (url) => {
fetch(url)
    .then((response) =>{
        //console.log(response);
        return response.json();
    })
    .then((pokeList)=>{
        //console.log(pokeList.objects);
        drawPokemon(pokeList.objects);
        nextUrl = query + pokeList.meta.next;
       
    });
}



makeFetch(request);
createBtn();
var btnT = document.querySelector('.loadMoreBtn');
btnT.addEventListener('click', ()=> makeFetch(nextUrl));

let showPokemon = () => {

    let length = localStorage.length;
        if(length > 0){
            for(let u =0; u<length; u++){
                let key = localStorage.key(u);
                  let  data = JSON.parse(localStorage.getItem(key));
                    
                 let div = document.createElement('DIV');
                    div.id = data.id;
                    div.className = 'pokeBox';

                    let pokeFavorImg = document.createElement('IMG');
                        pokeFavorImg.className = 'pokeImg';
                            div.style.background = '#6666ff';
                                pokeFavorImg.src = data.img;
                                 favoriteBox.appendChild(div);
                                div.appendChild(pokeFavorImg);

                    let name = document.createElement('span');
                        name.className = 'name';
                        name.innerHTML = data.name;
                        div.appendChild(name);

                    let types = document.createElement('span');
                     types.className = 'types';
                        types.innerHTML = data.types;
                         div.appendChild(types);
                            if(data.types1 !== undefined){
                                  let types1 = document.createElement('span');
                                    types.className = 'types';
                                        types.innerHTML = data.types1;
                                         div.appendChild(types1);
                            }
                 div.addEventListener('click', ()=>{
                    localStorage.removeItem(div.id);
                favoriteBox.removeChild(div);
          });
            }
        }
}

showPokemon();

window.onload = () => {
    setTimeout(() => {
    loader.style.display = 'none';
    container.style.display = 'block';
    favoriteBox.style.display = 'block';
    }, 3000);
 }  



