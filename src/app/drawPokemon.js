import getTypes from './getType';
import createBtn from './loadMoreBtn';
import {nextUrl} from './app';
import {makeFetch} from './app';

export default (container, arr) => {
	let pokemonId = [];
    	//for(let i =0; i<arr.length; i++)
    	arr.forEach(function(item, i, arr){
    		pokemonId.push(arr[i].pkdx_id);
    		let imgRequest = "http://pokeapi.co/media/img/";
    		let id = arr[i].pkdx_id;
    		let div = document.createElement('div');
    		div.className = 'post'; 
    		let img = document.createElement('IMG');
    		img.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${id}.png`
    		let name = document.createElement('span');
    		name.className = "name";
    		name.innerHTML = arr[i].name;
    		container.appendChild(div);
            div.appendChild(img);
    		div.appendChild(name);
      		getTypes(arr[i].types, div);
    	});

		createBtn();
        btn.addEventListener('click', makeFetch(nextUrl));
}
	