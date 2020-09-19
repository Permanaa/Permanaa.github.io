const base_url = 'https://api.football-data.org/v2/'

const status = response => {
    if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response)
    }
}

const json = response => {
    return response.json()
}

const error = error => {
    console.log(`Error : ${error}`);
}

const getTeams = () => {
    if ('caches' in window) {
        caches.match(`${base_url}competitions/2001/teams`, {
            headers: {
                "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
            }
        }).then(response => {
            if (response) {
                response.json().then(data => {
                    var teamsHTML = ''
                    data.teams.forEach(team => {
                        teamsHTML += `
                            <div class="card">
                                <a href="./team-detail.html?id=${team.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${team.crestUrl}" />
                                    </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate">${team.name}</span>
                                    <p>Address : ${team.address}</p>
                                </div>
                            </div>
                        `
                    })
                    document.getElementById("articles").innerHTML = teamsHTML
                })
            }
        })
    }

    fetch(`${base_url}competitions/2001/teams`, {
        headers: {
            "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
        }
    })
        .then(status)
        .then(json)
        .then(data => {
            var teamsHTML = ''
            data.teams.forEach(team => {
                teamsHTML += `
                    <div class="card">
                        <a href="./team-detail.html?id=${team.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${team.crestUrl}" />
                            </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title truncate">${team.name}</span>
                            <p>Address : ${team.address}</p>
                        </div>
                    </div>
                `
            })
            document.getElementById("articles").innerHTML = teamsHTML
        })
        .catch(error)
}

const getTeamById = () => {
    return new Promise((resolve, reject) => {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${base_url}teams/${idParam}`, {
                headers: {
                    "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
                }
            }).then(response => {
                if (response) {
                    response.json().then(data => {
                        var teamHTML = `
                            <div class="card">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${data.crestUrl}" />
                                </div>
                                <div class="card-content">
                                    <span class="card-title">${data.name}</span>
                                    <p>Address : ${data.address}</p>
                                    <p>Founded : ${data.founded}
                                    <p>Venue : ${data.venue}</p>
                                    <p>Email : ${data.email}</p>
                                    <p>Phone : ${data.phone}</p>
                                    <p>Website : ${data.website}</p>
                                </div>
                            </div>
                        `
                        document.getElementById("body-content").innerHTML = teamHTML;
                        resolve(data)
                    })
                }
            })
        }
    
        fetch(`${base_url}teams/${idParam}`, {
            headers: {
                "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            var teamHTML = `
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" />
                    </div>
                    <div class="card-content">
                        <span class="card-title">${data.name}</span>
                        <p>Address : ${data.address}</p>
                        <p>Founded : ${data.founded}
                        <p>Venue : ${data.venue}</p>
                        <p>Email : ${data.email}</p>
                        <p>Phone : ${data.phone}</p>
                        <p>Website : ${data.website}</p>
                    </div>
                </div>
            `
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data)
        })
    })
}

const getSavedTeams = () => {
    getAll().then(data => {
        var teamsHTML = ""
        data.forEach(team => {
            teamsHTML += `
                <div class="card">
                    <a href="./team-detail.html?id=${team.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.crestUrl}" />
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title truncate">${team.name}</span>
                        <p>Address : ${team.address}</p>
                    </div>
                </div>
            `
        })
        document.getElementById("body-content").innerHTML = teamsHTML
    })
}

const getSavedTeamById = () => {
    return new Promise((resolve, reject)=> {
        var urlParams = new URLSearchParams(window.location.search)
        var idParam = urlParams.get("id")
    
        getById(idParam).then(data => {
            var teamHTML = `
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" />
                    </div>
                    <div class="card-content">
                        <span class="card-title">${data.name}</span>
                        <p>Address : ${data.address}</p>
                        <p>Founded : ${data.founded}
                        <p>Venue : ${data.venue}</p>
                        <p>Email : ${data.email}</p>
                        <p>Phone : ${data.phone}</p>
                        <p>Website : ${data.website}</p>
                    </div>
                </div>
            `
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data)
        })
    })
}

const getEvents = () => {
    if ('caches' in window) {
        caches.match(`${base_url}competitions/2001/matches`, {
            headers: {
                "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
            }
        }).then(response => {
            if (response) {
                response.json().then(data => {
                    var eventsHTML = ''
                    data.matches.forEach(match => {
                        eventsHTML += `
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title truncate">${match.homeTeam.name} vs ${match.awayTeam.name}</span>
                                    <p>Date : ${match.utcDate}</p>
                                    <p>Home Team : ${match.homeTeam.name}</p>
                                    <p>Away Team : ${match.awayTeam.name}</p>
                                    <p>Status : ${match.status}</p>
                                    ${
                                        match.status === "FINISHED" ?
                                            `<p>Score :</p>
                                            <table class="centered">
                                                <tr>
                                                    <td>${match.homeTeam.name}</td>
                                                    <td>${match.awayTeam.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>${match.score.fullTime.homeTeam}</td>
                                                    <td>${match.score.fullTime.awayTeam}</td>
                                                </tr>
                                            </table>`
                                        : `<p></p>`
                                    }
                                </div>
                            </div>
                        `
                    })
                    document.getElementById("event").innerHTML = eventsHTML
                })
            }
        })
    }

    fetch(`${base_url}competitions/2001/matches`, {
        headers: {
            "X-Auth-Token": "6f0b7e8e39474dbaa0b6670e2c3961d4"
        }
    })
        .then(status)
        .then(json)
        .then(data => {
            var eventsHTML = ''
            data.matches.forEach(match => {
                eventsHTML += `
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title truncate">${match.homeTeam.name} vs ${match.awayTeam.name}</span>
                            <p>Date : ${match.utcDate}</p>
                            <p>Home Team : ${match.homeTeam.name}</p>
                            <p>Away Team : ${match.awayTeam.name}</p>
                            <p>Status : ${match.status}</p>
                            ${
                                match.status === "FINISHED" ?
                                    `<p>Score :</p>
                                    <table class="centered">
                                        <tr>
                                            <td>${match.homeTeam.name}</td>
                                            <td>${match.awayTeam.name}</td>
                                        </tr>
                                        <tr>
                                            <td>${match.score.fullTime.homeTeam}</td>
                                            <td>${match.score.fullTime.awayTeam}</td>
                                        </tr>
                                    </table>`
                                : `<p></p>`
                            }
                        </div>
                    </div>
                `
            })
            document.getElementById("event").innerHTML = eventsHTML
        })
        .catch(error)
}