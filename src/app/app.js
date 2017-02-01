import loadMore from "./getPokemon.js"

let main = document.getElementById('post-container');
let btn = document.getElementById('btn');
let api = 'http://pokeapi.co/';
let query = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=24';
fetch(query)
.then(function(res){
    return res.json();
})
.then(function(json){
    console.log(json.meta.next);
   // query = json.meta.next; ulr for 24
    let addButton = document.createElement('BUTTON');
    addButton.addEventListener('click', loadMore);
    addButton.className = 'addButton';
    addButton.innerHTML = 'load more';
    btn.appendChild(addButton);

    for(let i =0; i<json.objects.length; i++){
    let div = document.createElement('div');
    div.className = 'post';   
    let name = document.createElement('span');
    name.className = "name";
    name.innerHTML = json.objects[i].name;
    main.append(div);
    div.appendChild(name);
       
    for(let j=0; j<json.objects[i].types.length; j++){
    let types = document.createElement('span');
    types.className = "types";
    types.innerHTML = json.objects[i].types[j].name;
    div.appendChild(types);
       }
   }
 });
           
        
