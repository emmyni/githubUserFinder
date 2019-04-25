// init Github
const github = new GitHub;

// init UI
const ui = new UI;

// Search input 
const searchUser = document.getElementById('searchUser');

let favUsers = [];
let index = 0;

function clickFav() {
    let userName = document.getElementById("searchUser").value;
    if (userName !== '' && favUsers.includes(userName) === false) {
        document.getElementById("fav").innerText = '';
        $('#fav-list').append(`<li class="list-group-item" style="border:0" id=${index}><span id="name-${index}" style="margin-right: 3rem">${userName}</span><span id="del-icon-${index}"><i class="far fa-window-close"></i></span></li>`);
        favUsers.push(userName);
        $(`#name-${index}`).click(function(){ view(userName)});

        let element = document.getElementById(index);

        $(`#del-icon-${index}`).click(function(){ 
            element.parentNode.removeChild(element);
            let arrIndex = favUsers.indexOf(userName);
            favUsers.splice(arrIndex, 1);

            if (favUsers.length === 0) {
                document.getElementById("fav").innerText = 'You currently have no favourite users.';
            }
        });

        index += 1;
        document.getElementById("message").innerText = `Successfully Added ${userName} to Favourites`;
        document.getElementById("message").style.color = "green";
    }
    else if (userName === ''){
        document.getElementById("message").innerText = `Please enter an username`;
        document.getElementById("message").style.color = "red";
    }
    else if (favUsers.includes(userName) === true) {
        document.getElementById("message").innerText = `${userName} is already in Favourites`;
        document.getElementById("message").style.color = "red";
    }
}

function view(userName) {
    document.getElementById("searchUser").value = userName;

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
    const userText = e.target.value;
    document.getElementById("message").innerText = '';

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
