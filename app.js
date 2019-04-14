// init Github
const github = new GitHub;

// init UI
const ui = new UI;

// Search input 
const searchUser = document.getElementById('searchUser');

function clickFav() {
    let userName = document.getElementById("searchUser").value;
    if (userName !== '') {
        document.getElementById("fav").innerText = '';
        document.getElementById("fav").innerText = '';
        $('#fav-list').delegate('li','click', react);
        $('#fav-list').append(`<li>${userName}</li>`);
    }
}

function react() {
    document.getElementById("searchUser").value = $(this).text();
    let userText = document.getElementById("searchUser").value
    github.getUser(userText)
        .then(data => {
            if (data.profile.message === 'Not Found') {
                // show alert
                ui.showAlert('User not found', 'alert alert-danger');
            } else {
                // show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos)
            }
        })
}

// search input event listener
searchUser.addEventListener('keyup', (e) => {
    // get input text
    console.log(3)
    const userText = e.target.value;
    console.log(userText)

    if (userText !== ''){
    // make HTTP call
    github.getUser(userText)
        .then(data => {
            if (data.profile.message === 'Not Found') {
                // show alert
                ui.showAlert('User not found', 'alert alert-danger');
            } else {
                // show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos)
            }
        })
    } else {
        // clear profile
        ui.clearProfile();
    }
});
