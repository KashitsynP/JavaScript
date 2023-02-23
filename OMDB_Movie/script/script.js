const form = document.getElementById('search-form');
const resultContainer = document.getElementById('result-container');
const detailsContainer = document.getElementById('details-container');

form.addEventListener('submit', event => {
	event.preventDefault();

	const title = form.elements['title-input'].value;
	const type = form.elements['type-select'].value;

	fetch(`http://www.omdbapi.com/?apikey=7aa415eb&s=${title}&type=${type}`)
		.then(response => response.json())
		.then(data => {
			resultContainer.innerHTML = '';
			detailsContainer.innerHTML = '';

			if (data.Response === 'True') {
				data.Search.forEach(item => {
					const div = document.createElement('div');
					div.innerHTML = `${item.Title} (${item.Year}) <button class="details-button" data-imdbid="${item.imdbID}">Details</button>`;
					resultContainer.appendChild(div);
                    console.log(data)
				});

				const detailsButtons = document.querySelectorAll('.details-button');
				detailsButtons.forEach(button => {
					button.addEventListener('click', () => {
						fetch(`http://www.omdbapi.com/?apikey=7aa415eb&i=${button.dataset.imdbid}`)
							.then(response => response.json())
							.then(data => {
								detailsContainer.innerHTML = `
									<h2>${data.Title} (${data.Year})</h2>
									<p><strong>Plot:</strong> ${data.Plot}</p>
									<p><strong>Actors:</strong> ${data.Actors}</p>
									<p><strong>Director:</strong> ${data.Director}</p>
                                    <div id="poster-details"> <img src="${data.Poster}" alt=""></div>
								`;
                                console.log(data)
							})
							.catch(error => console.error(error));
					});
				});
			} else {
				resultContainer.innerHTML = 'Movie not found!';
			}
		})
		.catch(error => console.error(error));
});
