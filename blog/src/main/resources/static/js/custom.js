
// find user in token
function getUserNameFromToken() {
    var valueIsToken = window.localStorage.getItem("Authorization");
    if (valueIsToken != null) {
        var token = valueIsToken.split(" ")[1];
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return userName = JSON.parse(jsonPayload).sub;
    }
};

function displayUserName() {
    var nameUser = getUserNameFromToken();
    var emplementUserName = document.getElementById("name-user");
    if (nameUser == null) {
        emplementUserName.style.display = "none";
    } else {
        emplementUserName.style.display = "block";
        emplementUserName.innerHTML = nameUser.slice(0, 1);
    }
}

displayUserName();