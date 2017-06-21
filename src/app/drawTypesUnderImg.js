import {inputSearch} from './app';
import {drawPokemon} from './drawPokemon';
export default (arr, tag) =>{
	
	arr.forEach((item, i, arr)=>{
	
		let types = document.createElement('span');
    	types.className = "types";
    	types.innerHTML = item.name;
    	tag.appendChild(types);
    	});
   
}				