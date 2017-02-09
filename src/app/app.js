import drawPokemon from './drawPokemon';
import createBtn from './loadMoreBtn';
//import fetchDate from './apiService';

let request = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=12';
let query = 'http://pokeapi.co';
export let nextUrl = '';
const container = document.getElementById('post-container');

export let makeFetch = (url) => {
fetch(url)
    .then((response) =>{
        //console.log(response);
        return response.json();
    })
    .then((pokeList)=>{
        //console.log(pokeList.objects);
        drawPokemon(container, pokeList.objects);
        nextUrl = query + pokeList.meta.next;
        console.log(nextUrl);
        //let url = query + pokeList.objects[0].resource_uri;
        //return fetch(url);
    });
}
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

