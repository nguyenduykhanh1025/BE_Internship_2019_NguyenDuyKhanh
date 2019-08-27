document.getElementById('btn-content-login').addEventListener('click', function function_name() {
    document.getElementById('content-login').style.display = "block";
    document.getElementById('content-register').style.display = "none";

    document.getElementById('btn-content-login').style.color = '#ff4136';
    document.getElementById('btn-content-register').style.color = 'black';
});

document.getElementById('btn-content-register').addEventListener('click', function function_name() {
    document.getElementById('content-login').style.display = "none";
    document.getElementById('content-register').style.display = "block";

    document.getElementById('btn-content-login').style.color = 'black';
    document.getElementById('btn-content-register').style.color = '#ff4136';
});


document.getElementById('btn-register').addEventListener('click', function() {
    var username = document.getElementById('user-name').value;
    var password = document.getElementById('pass-word').value;
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var regularQuery = /[^A-Za-z0-9]/;
    if (username.match(regularQuery) != null || password.match(regularQuery) != null) {
        document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
            '<strong>erorr!</strong>Vui Lòng Không nhập kí tự đặc biệt ở trường username và password' +
            '</div>';
    } else {

        var register = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        };

        $.ajax({
            contentType: 'application/json',
            url: "/api/user/register",
            type: "POST",
            data: JSON.stringify(register),
            dataType: 'json',
            success: function(data) {
                var person = {
                    "username": data.username,
                    "password": data.password
                };
                $.ajax({
                    contentType: 'application/json',
                    url: "/api/auth",
                    type: "POST",
                    data: JSON.stringify(person),
                    dataType: 'json',
                    success: function(data) {
                        document.cookie = "access_token=" + data.token;
                        window.localStorage.setItem("Authorization", "Bearer " + data.token);
                        location.replace("/");
                    },
                    error: function(e) {
                        document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                            '<strong>erorr!</strong>User da ton tai' +
                            '</div>';
                    }
                });
            },
            error: function(e) {
                document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                    '<strong>erorr!</strong>Vui Lòng Không được để trống các trường' +
                    '</div>';
            }
        });
    }

});
// login with login with google
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // user email
    var person = {
        "username": profile.getEmail(),
        "password": profile.getEmail()
    };
        $.ajax({
                contentType: 'application/json',
                url: "/api/auth",
                type: "POST",
                data: JSON.stringify(person),
                dataType: 'json',
                success: function(data) {
                    document.cookie = "access_token=" + data.token;
                    window.localStorage.setItem("Authorization", "Bearer " + data.token);
                    location.replace("/page/");
                },
                error: function(e) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                        '<strong>erorr!</strong>User is validated. please!!!' +
                        '</div>';
                }
            });

}

// login with facebook
window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '820157585052368', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Check whether the user already logged in
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //display user data
            getFbUserData();
        }
    });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
        } else {
            document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
    // use last name + fb id
        console.log(response.last_name + response.id + " " + response.last_name + response.id);
        var person = {
                "username": response.last_name + response.id,
                "password": response.last_name + response.id
            };
            $.ajax({
                contentType: 'application/json',
                url: "/api/auth",
                type: "POST",
                data: JSON.stringify(person),
                dataType: 'json',
                success: function(data) {
                    document.cookie = "access_token=" + data.token;
                    window.localStorage.setItem("Authorization", "Bearer " + data.token);
                    location.replace("/page/");
                },
                error: function(e) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                        '<strong>erorr!</strong>User is validated. please!!!' +
                        '</div>';
                }
            });

    });
}


// register google
function onRegister(googleUser){
    var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        var register = {
                    "username": profile.getEmail(),
                    "password": profile.getEmail(),
                    "firstName": profile.getName(),
                    "lastName": profile.getName()
                };

                $.ajax({
                    contentType: 'application/json',
                    url: "/api/user/register",
                    type: "POST",
                    data: JSON.stringify(register),
                    dataType: 'json',
                    success: function(data) {
                        var person = {
                            "username": data.username,
                            "password": data.password
                        };
                        $.ajax({
                            contentType: 'application/json',
                            url: "/api/auth",
                            type: "POST",
                            data: JSON.stringify(person),
                            dataType: 'json',
                            success: function(data) {
                                document.cookie = "access_token=" + data.token;
                                window.localStorage.setItem("Authorization", "Bearer " + data.token);
                                location.replace("/");
                            },
                            error: function(e) {
                                document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                                    '<strong>erorr!</strong>User da ton tai' +
                                    '</div>';
                            }
                        });
                    },
                    error: function(e) {
                        document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                            '<strong>erorr!</strong>Vui Lòng Không được để trống các trường' +
                            '</div>';
                    }
                });
}