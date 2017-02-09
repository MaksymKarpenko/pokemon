
export default () => {
	
	let btn = document.createElement('BUTTON');
	btn.className = 'loadMoreBtn';
	btn.innerHTML = 'Load more';
	let blockBtn = document.getElementById('btn');
	blockBtn.appendChild(btn);

	//btn.addEventListener('click', makeFetch(nextUrl));
}