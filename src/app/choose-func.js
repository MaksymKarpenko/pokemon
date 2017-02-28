export default	(container) =>{

var currentElem = null;
let btn_Add_to_Fav = document.createElement('BUTTON');
btn_Add_to_Fav.className = 'btn_add_to_FavBox';
btn_Add_to_Fav.innerHTML = 'add to Favarite';
container.onmouseover = function(event) {
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

container.onmouseout = function(event) {
  // если курсор и так снаружи - игнорируем это событие
  if (!currentElem) return;

  // произошёл уход с элемента - проверим, куда, может быть на потомка?
  var relatedTarget = event.relatedTarget;
  if (relatedTarget) { // может быть relatedTarget = null
    while (relatedTarget) {
      // идём по цепочке родителей и проверяем,
      // если переход внутрь currentElem - игнорируем это событие
      if (relatedTarget == currentElem) return;
      relatedTarget = relatedTarget.parentNode;
    }
  }

  // произошло событие mouseout, курсор ушёл
  currentElem.style.background = '';
  currentElem.style.color='black';
  currentElem.removeChild(btn_Add_to_Fav);
  currentElem = null;
    };

    
    
 
    btn_Add_to_Fav.addEventListener('click', (event)=>{

    let obj = {};
    
    let target = event.target.parentNode;
    let image = target.getElementsByClassName('pokeImg');
    //console.log(image[0].src);
    let imgUrl = image[0].src;

        let addToFav = (url) => {
            ///console.log(url);
          
          let favoriteBox = document.querySelector('#favorite');
          let div = document.createElement('DIV');
          div.id = target.id;
          div.className = 'pokeBox';
          obj.id = target.id;
          obj.img = url;
           // console.log(obj);
          //div.style.display = 'block';
                     
            let pokeFavorImg = document.createElement('IMG');
            pokeFavorImg.className = 'pokeImg';
             div.style.background = '#6666ff';
                pokeFavorImg.src = url;
                    favoriteBox.appendChild(div);
                    div.appendChild(pokeFavorImg);

         let name = document.createElement('span');
          name.className = 'name';
          name.innerHTML = target.getElementsByClassName('name')[0].textContent;
          obj.name = name.innerHTML;
          //console.log(obj);
          div.appendChild(name);

          let arrTypes = target.getElementsByClassName('types');
          arrTypes.forEach = [].forEach;
            arrTypes.forEach((item, i, arrTypes)=>{
                let types = document.createElement('span');
                types.className = 'types';
                types.innerHTML = target.getElementsByClassName('types')[i].textContent;
                  if(i<1){
                    obj.types = target.getElementsByClassName('types')[i].textContent;
                   }

                    if(i > 0) {
                      obj.types1 = target.getElementsByClassName('types')[i].textContent;
                    }
                
                div.appendChild(types);
            });
              
              localStorage.setItem(div.id, JSON.stringify(obj));  

            div.addEventListener('click', ()=>{
             localStorage.removeItem(div.id);
                favoriteBox.removeChild(div);
          });
                
             
              
            }
                    
            addToFav(imgUrl);
    });
}
