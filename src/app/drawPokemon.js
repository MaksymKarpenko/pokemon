import getTypes from './drawTypesUnderImg';
import createBtn from './loadMoreBtn';
import {nextUrl} from './app';
import {makeFetch} from './app';
import {container} from './app';
import {pokemon_Array} from './app';
import {inputSearch} from './app';

export default (arr) => {
arr.forEach(function (item, i, arr){
        pokemon_Array.push(arr[i]);
            });
    //filter(pokemon_Array);
    //console.log(pokemon_Array[1]);  
arr.forEach(function(item, i, arr){
    let imgRequest = "http://pokeapi.co/media/img/";
        let id = arr[i].pkdx_id;
        
        let div = document.createElement('div');
            div.className = 'pokeBox';
             div.id = arr[i].pkdx_id;

        let img = document.createElement('IMG');
         img.className = 'pokeImg';
            img.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${id}.png`
        
        let name = document.createElement('span');
            name.className = "name";
             name.innerHTML = arr[i].name;
                 container.appendChild(div);
                     div.appendChild(img);
                        div.appendChild(name);
                            getTypes(arr[i].types, div);

    });
       
let box = container.getElementsByClassName('pokeBox');
console.log(box);
let value = '';             
inputSearch.oninput = () =>{
    console.log(inputSearch.value);
     value = inputSearch.value;
        for(let i =0; i<box.length; i++){
            let filterArrey=[];
            let span = box[i].getElementsByClassName('types')[0];
                if(span.innerHTML.indexOf(value) > -1){
                                               
                     box[i].style.display = '';
                    }else{
                        span = box[i].getElementsByClassName('types')[1];
                        if(span !== undefined){
                            if(span.innerHTML.indexOf(value) > -1){
                                               
                                box[i].style.display = '';
                                 }
                                 else{
                                    box[i].style.display = 'none';
                                 }
                        
                        }else{
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
    }
}

  /*span.forEach = [].forEach;
                span.forEach((item, q, span) => {
                    
                    if(span[q].innerHTML.indexOf(value) > -1){
                        console.log(span[q].innerHTML);
                     box[i].style.display = 'block';
                    }else{
                        box[i].style.display = 'none';
                    }
                });*/

