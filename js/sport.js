document.getElementById('search-btn').addEventListener('click', async () => {
    const searchInputField = document.getElementById('search-input');
    const searchText = searchInputField.value;
    // console.log(searchText);
    searchInputField.value = '';
    if (searchText == '') {
        displayErrorNotice('Please type something to search.');
    } else {
        document.getElementById('error').textContent = '';
        document.getElementById('all-teams').textContent = '';
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayTeams(data.teams);
        }
        catch (err) {
            displayErrorNotice();
            // console.log(err);
        }
    }
});
// display error notice
const displayErrorNotice = (errorMessage = 'Something went wrong.Please Try again later.') => {
    document.getElementById('error').innerHTML = `
		<h5 class="text-danger my-4">${errorMessage}</h5>
	`;
}

// display teams
const displayTeams = teams => {
    console.log(teams);
    const teamsContainer = document.getElementById('all-teams');
    teams.forEach(team => {
        console.log(team);
        const singleTeamDiv = document.createElement('div');
        singleTeamDiv.classList.add('team');
        singleTeamDiv.innerHTML = `
           <h2>${team.strLeague}</h2>
	       <img src="${team.strTeamBadge}">
           <h4 class="mb-4">${team.strCountry}</h4>
			`;
        teamsContainer.appendChild(singleTeamDiv);
    });
}

