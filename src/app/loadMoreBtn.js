
export default () => {
	
	let btn = document.createElement('BUTTON');
	btn.id = 'loadMoreBtn';
	btn.innerHTML = 'Load more';
	let blockBtn = document.getElementById('btn');
	blockBtn.appendChild(btn);

	//btn.addEventListener('click', makeFetch(nextUrl));
}