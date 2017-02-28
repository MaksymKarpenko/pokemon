import drawTypesList from './draw-Types-List';
export default(url) => {
let arrList ;
	fetch(url)
    .then((response) =>{
        //console.log(response);
        return response.json();
    })
    .then((json)=>{
         //console.log(json.objects);
         const typesBlock = document.createElement('DIV');
        arrList = json.objects;
        	drawTypesList(arrList, typesBlock);
    });
}
//console.log(typesArr);
