export default (arr, tag) =>{

				arr.forEach(function(item, i, arr){
				let types = document.createElement('span');
    			types.className = "types";
    			types.innerHTML = item.name;
    			tag.appendChild(types);
				});

}				