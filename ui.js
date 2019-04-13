class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    // display profile in ui
    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-2" style="width: 70%">
                <div class="row">
                    <div class="col md-3" style="padding-right:0">
                        <img class="img-fluid img-thumbnail mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4 mt-3">View Profile</a>
                    </div>
                    <div class="col md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Public Followers: ${user.followers}</span>
                        <span class="badge badge-info">Public Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Name:  ${user.name}</li>
                            <li class="list-group-item">Bio:  ${user.bio}</li>
                            <li class="list-group-item">Email:  ${user.email}</li>
                            <li class="list-group-item">Company:  ${user.company}</li>
                            <li class="list-group-item">Website/Blog:  <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                            <li class="list-group-item">Location:  ${user.location}</li>
                            <li class="list-group-item">Member Since:  ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
        return this.profile.innerHTML;
    }
    // show repos
    showRepos(repos) {
        let output = '';

        repos.forEach(function(repo) {
            output += `
            <div class="card card-body mb-2" style="width: 70%">
                <div class="row">
                    <div class="col-md-9">
                        <a href="${repo.html_url}" taget="_blank">${repo.name}</a>
                        <span class="badge badge-info">${repo.language}</span>
                        <div><p>Description: ${repo.description}</p></div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-2">
                        <div><span class="badge badge-primary float-right m-2">Stars: ${repo.stargazers_count}</span></div>
                        <div><span class="badge badge-secondary float-right m-2">Watchers: ${repo.watchers_count}</span></div>
                        <div><span class="badge badge-success float-right m-2">Forks: ${repos.forms_count}</span></div>
                    </div>
                </div>
            </div>
            `
        });

        // output repos
        document.getElementById('repos').innerHTML = output;
    };

// show alert message
    showAlert(message, className) {
        // clear any remaining alerts
        this.clearAlert();
        // create div
        const div = document.createElement('div');
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.searchContainer');
        // get search box
        const search = document.querySelector('.search');
        // insert alert
        container.insertBefore(div, search);

        // timeout after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    // clear profile
    clearProfile() {
        this.profile.innerHTML = '';
    }
}