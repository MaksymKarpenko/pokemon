import drawPokemon from './drawPokemon';
import renderPost  from'./render-post';
let urlImg = "https://pokeapi.co/api/v1/sprite/";
let request = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
let query = 'http://pokeapi.co';
let nextUrl = '';
const container = document.getElementById('post-container');
console.log(renderPost(urlImg));
fetch(request)
    .then((response) =>{
        return response.json();
    })
    .then((pokeList)=>{
        //console.log(pokeList.objects);

        drawPokemon(container, pokeList.objects);
        nextUrl = query + pokeList.meta.next;
        let url = query + pokeList.objects[0].resource_uri;
        return fetch(url);
    })
    .then((pokeInfo)=>{
        return pokeInfo.json();
    })

    .then((pokemon) => {
        //console.log(pokemon);
    });
    