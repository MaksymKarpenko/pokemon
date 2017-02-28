import {inputSearch} from './app';
import {drawPokemon} from './drawPokemon';
export default (arr, tag) =>{
	//inputSearch.oninput = () =>{
	//let value = inputSearch.value;
	//console.log(value);
			
	arr.forEach((item, i, arr)=>{
	//if(item.name.indexOf(value) > -1){	
	//tag.style.display = '';
		let types = document.createElement('span');
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
}				