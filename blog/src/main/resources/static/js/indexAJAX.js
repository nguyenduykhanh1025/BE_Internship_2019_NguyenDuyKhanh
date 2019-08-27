// load data for index
document.addEventListener('DOMContentLoaded', function() {

    var indexPage = 1;
    if (sessionStorage.getItem("index_page") != null) {
        console.log('index page: ' + sessionStorage.getItem("index_page"));
        indexPage = sessionStorage.getItem("index_page");
    }
    // load option
    $.ajax({
        contentType: 'application/json',
        url: "/api/post/page/" + indexPage,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var elementToAddPost = document.getElementById("td-block");
            var dataHtml = "";
            data.forEach(function(element) {

                // get list tags
                var dataHtmlTags = "";
                element.tags.forEach(function(tag) {
                    var data = '<span class="badge badge-pill badge-dark" onClick="getListPost(this.id)" id = ' +
                        tag + '>' +
                        tag +
                        '</span>';
                    dataHtmlTags += data;
                });

                var data = '<div class="col-lg-6 td-block-span">' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><img src=' + '"' + element.imgLink + '"' + '></a>' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><h4 class="tittle">' + element.title.slice(0, 25) + '...</h4></a>' +
                    '<div class="post-date">' +
                    '<p class="entry-date updated td-module-date">' + element.datePublication + '</p>' +
                    '</div>' +
                    '<div class="tags">' +
                    dataHtmlTags +
                    '</div>' +
                    '<div class="content-sub">' +
                    element.content.slice(0, 130) +
                    '...</div>' +
                    '</div>';

                dataHtml += data;
            });
            elementToAddPost.innerHTML = dataHtml;


        },
        error: function(e) {
            console.log("error");
        }
    });

    // load index page
    $.ajax({
        contentType: 'application/json',
        url: "/api/post",
        type: "GET",
        dataType: 'json',
        success: function(data) {

            var elementHTML = document.getElementById('pagination');
            var dataHTML = '<li class="page-item"><a class="page-link">Previous</a></li>';
            dataHTML += '<li class="page-item"><a class="page-link active-page" onClick="getIndexPage(this.id)" id = index_' + 1 + '>1</a></li>';

            var lengthIndexPage = data.length / 4 % 2 == 0 ? data.length / 4 : data.length / 4 + 1;
            console.log(lengthIndexPage);
            for (var i = 2; i <= lengthIndexPage; ++i) {
                dataHTML += '<li class="page-item"><a class="page-link" onClick="getIndexPage(this.id)" id= index_' + i + '>' + i + '</a></li>';
            }
            dataHTML += ' <li class="page-item"><a class="page-link">Next</a></li>';

            elementHTML.innerHTML = dataHTML;

            // load index active page
            // remove active for index
            var elementIndexPage = document.getElementsByClassName('page-link');
            for (var i = 0; i < elementIndexPage.length; ++i) {
                elementIndexPage[i].classList.remove("active-page");
            }
            // add class for active haved click
            document.getElementById('index_' + indexPage).classList.add('active-page');
        },
        error: function(e) {
            console.log("error");
        }
    });
}, false);

// end load data for index

//load index page

//get list post follow name tag
function getListPost(nameTag) {
    // load option
    $.ajax({
        contentType: 'application/json',
        url: "/api/tag/" + nameTag,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var elementToAddPost = document.getElementById("td-block");
            var dataHtml = "";
            data.forEach(function(element) {

                // get list tags
                var dataHtmlTags = "";
                element.tags.forEach(function(tag) {
                    var data = '<span class="badge badge-pill badge-dark" onClick="getListPost(this.id)" id = ' +
                        tag + '>' +
                        tag +
                        '</span>';
                    dataHtmlTags += data;
                });

                var data = '<div class="col-lg-6 td-block-span">' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><img src=' + '"' + element.imgLink + '"' + '></a>' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><h4 class="tittle">' + element.title.slice(0, 25) + '...</h4></a>' +
                    '<div class="post-date">' +
                    '<p class="entry-date updated td-module-date">' + element.datePublication + '</p>' +
                    '</div>' +
                    '<div class="tags">' +
                    dataHtmlTags +
                    '</div>' +
                    '<div class="content-sub">' +
                    element.content.slice(0, 130) +
                    '...</div>' +
                    '</div>';

                dataHtml += data;
            });
            elementToAddPost.innerHTML = dataHtml;
        },
        error: function(e) {
            console.log("error");
        }
    });
};
// load goggle accout


// func logout
document.getElementById("btn-logout").addEventListener('click', function() {
    // logout in front
    localStorage.clear();
    document.getElementById('name-user').style.display = 'none';
    // if google login
    //    window.open('https://accounts.google.com/logout','_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none', '');
    // logout in bac
    $.ajax({
        contentType: 'application/json',
        url: "/api/user/logout",
        type: "GET",
        success: function() {
            alert('Đăng xuất thành công');
        },
        error: function(e) {
            console.log("error");
        }
    });
});

// get index page
// format index_1; index_2 get index = 1
function getIndexPage(indexPage) {
    var index = indexPage.split('_')[1];
    sessionStorage.setItem("index_page", index);
    $.ajax({
        contentType: 'application/json',
        url: "/api/post/page/" + index,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var elementToAddPost = document.getElementById("td-block");
            var dataHtml = "";
            data.forEach(function(element) {

                // get list tags
                var dataHtmlTags = "";
                element.tags.forEach(function(tag) {
                    var data = '<span class="badge badge-pill badge-dark" onClick="getListPost(this.id)" id = ' +
                        tag + '>' +
                        tag +
                        '</span>';
                    dataHtmlTags += data;
                });

                var data = '<div class="col-lg-6 td-block-span">' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><img src=' + '"' + element.imgLink + '"' + '></a>' +
                    '<a href="' + 'http://localhost:8082/page/detail/' + element.id + '"><h4 class="tittle">' + element.title.slice(0, 25) + '...</h4></a>' +
                    '<div class="post-date">' +
                    '<p class="entry-date updated td-module-date">' + element.datePublication + '</p>' +
                    '</div>' +
                    '<div class="tags">' +
                    dataHtmlTags +
                    '</div>' +
                    '<div class="content-sub">' +
                    element.content.slice(0, 130) +
                    '...</div>' +
                    '</div>';

                dataHtml += data;
            });
            elementToAddPost.innerHTML = dataHtml;

            // remove active for index
            var elementIndexPage = document.getElementsByClassName('page-link');

            for (var i = 0; i < elementIndexPage.length; ++i) {
                elementIndexPage[i].classList.remove("active-page");
            }
            // add class for active haved click
            document.getElementById(indexPage).classList.add('active-page');
        },
        error: function(e) {
            console.log("error");
        }
    });
}