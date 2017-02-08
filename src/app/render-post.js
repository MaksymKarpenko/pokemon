export default (url)=>{
let urlImg = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
let query = 'http://pokeapi.co';
fetch(urlImg)
.then((response) =>{
		return response.json();
	})
	.then((pokeImg)=>{
		let bock = document.getElementById('btn');
		let img = document.createElement('IMG');
		img.src = query + pokeImg.objects[0].sprites[0].resource_uri + '';
		bock.appendChild(img);
		console.log(pokeImg.objects[0].sprites[0].resource_uri);
		
	});
	}
