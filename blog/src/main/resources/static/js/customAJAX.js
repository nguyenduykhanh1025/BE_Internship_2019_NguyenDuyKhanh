// envent for login
document.getElementById("btn-to-login").addEventListener('click', function() {
    var username = document.getElementById("usr").value;
    var password = document.getElementById("pwd").value;

    var regularQuery = /[^A-Za-z0-9]/;
    if (username.match(regularQuery) != null || password.match(regularQuery) != null) {
        console.log("do");
         document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                            '<strong>erorr!</strong>vui lòng nhập không có khoảng trống hoặc kí tự đặc biệt' +
                            '</div>';
    } else {
        var person = {
            "username": username,
            "password": password
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
                if(document.getElementById('check-box-remember').checked == true){
                                    document.cookie = "token_user=" + data.token;
                                }
                location.replace("/page/");
            },
            error: function(e) {
                 document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                                    '<strong>erorr!</strong>User is validated. please!!!' +
                                    '</div>';
            }
        });
    }
});
// end event for login