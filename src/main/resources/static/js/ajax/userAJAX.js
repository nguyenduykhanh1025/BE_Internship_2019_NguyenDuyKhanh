// create blog
document.getElementById("btn-add-item").addEventListener('click', function() {
    document.getElementById("upload-blog").style.display = "block";
    document.getElementById("list-post").style.display = "none";
    document.getElementById('btn-up-blog').value = "add-post";
    document.getElementById('btn-up-blog').innerHTML = "Đăng bài viết";

    //load author for create book
    var dataHTMLAuthor = "";
    $.ajax({
        contentType: 'application/json',
        url: "/api/authors",
        type: "GET",
        success: function(data) {
            data.forEach(function(element) {
                dataHTMLAuthor += '<option value="2">' + element.name + '</option>';
            });
            document.getElementById('option-author').innerHTML = dataHTMLAuthor;
        },
        error: function(e) {
            console.log(e);
        }
    });

    // load categories for opption tag
    var dataHTMLCategories = "";
    $.ajax({
        contentType: 'application/json',
        url: "/api/category_books",
        type: "GET",
        success: function(data) {
            data.forEach(function(element) {
                dataHTMLCategories += '<option value="2">' + element.name + '</option>';
            });
            document.getElementById('option-tag').innerHTML = dataHTMLCategories;
        },
        error: function(e) {
            console.log(e);
        }
    });

});
document.addEventListener('DOMContentLoaded', function() {
    // set cookie ROLE
    $.ajax({
        contentType: 'application/json',
        url: "/api/roles",
        type: "GET",
        success: function(data) {
            setCookie("ROLE", data, 1);
        },
        error: function(e) {
            role = e;
        }
    });



    //load data for page
    $.ajax({
        headers: {
            "Authorization": localStorage.getItem('Authorization')
        },
        contentType: 'application/json',
        url: "/api/books/user",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var dataHTML = "";

            if (data.length == 0) {
                var elementListBook = document.getElementById("body-list-post-user");
                elementListBook.innerHTML = "<h2 style='color:#ababab'>No item were found....</h2>"
            } else {
                data.forEach(function(element) {
                    var dataHTMLTags = "";
                    element.categoriesDTOS.forEach(function(categories) {
                        var data = '<li><a href="#">' + categories.name + '</a></li>';
                        dataHTMLTags += data;
                    });

                    // get role of user
                    var btnElementEnable = "";
                    if (getCookie("ROLE").includes("ROLE_ADMIN")) {
                        if (!element.enable)
                            btnElementEnable = '<td class="col-lg-1 btn-enable-book"><button type="button" class="btn btn-warning" onClick="enableBook(this.id)" id=enable-' + element.id + '>Enable</button></td>';
                    }
                    var data = '<tr class="row" id="post-' + element.id + '">' +
                        '<td class="title-blog col-lg-1"><h6>' + element.title + '</h6></td>' +
                        '<td class="tag-blog col-lg-2">' +
                        '<div class="dropdown">' +
                        '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Categories' +
                        '<span class="caret"></span></button>' +
                        '<ul class="dropdown-menu" id="list-tags-user-post">' +
                        dataHTMLTags +
                        '</ul>' +
                        '</div>' +
                        '</td>' +
                        '<td class="img-blog col-lg-2"><img src="' + element.linkImage + '"></td>' +
                        '<td class="content-blog col-lg-3"><div style="max-height: 200px;overflow: scroll;" id="comment">' + element.description + '</div></td>' +
                        '<td class="col-lg-1 btn-delete-blog"><button type="button" class="btn btn-danger btn-delete-post" onClick="deleteBookFollowID(this.id)" id=' + element.id + '>Delete</button></td>' +
                        '<td class="col-lg-1 btn-update-blog"><button type="button" class="btn btn-primary" onClick="editBookFollowID(this.id)" id=' + element.id + '>Edit</button></td>' +
                        btnElementEnable +
                        '</tr>';

                    dataHTML += data;
                });
                document.getElementById("body-list-post-user").innerHTML = dataHTML;
            }
        },
        error: function(e) {

        }
    });

    // load check user if is admin
    $.ajax({
        url: "/api/roles/user",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (!data.includes("ROLE_ADMIN")) {
                document.getElementById('btn-check-user').style.display = 'none';
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
});


function deleteBookFollowID(id) {
    $('#exampleModal').modal('show');
    document.getElementById("btn-modal-ok").addEventListener('click', function() {
        $.ajax({
            headers: {
                "Authorization": localStorage.getItem('Authorization')
            },
            contentType: 'application/json',
            url: "/api/books/" + id,
            type: "DELETE",
            success: function() {
                document.getElementById("post-" + id).style.display = "none";
            },
            error: function(e) {
                console.log(e);
            }
        });
        $('#exampleModal').modal('hide');

    });

}

// add tag
document.getElementById('btn-add-tag').addEventListener('click', function function_name() {
    var optionTag = document.getElementById("option-tag");
    var tag = optionTag.options[optionTag.selectedIndex].text;
    // onClick="updatePostFollowID(this.id)" id=' + element.id
    var divListTagOpption = document.getElementById("list-tags-opption");
    var para = document.createElement("li");
    para.innerHTML = tag;
    para.className = "tags";
    para.addEventListener('dblclick', function(element) {
        this.remove();
    });
    divListTagOpption.appendChild(para);
});

// add tag new
document.getElementById('btn-add-tag-new').addEventListener('click', function function_name() {
    var strTagNews = document.getElementById("tag-news");

    if (strTagNews.value !== "") {
        var divListTagOpption = document.getElementById("list-tags-opption");
        var tag = document.getElementById("tag-news").value;
        var para = document.createElement("li");

        para.innerHTML = tag;
        para.className = "tags";
        para.addEventListener('dblclick', function(element) {
            this.remove();
        });
        divListTagOpption.appendChild(para);
    }
});


// add author
document.getElementById('btn-add-author').addEventListener('click', function function_name() {
    var optionTag = document.getElementById("option-author");
    var tag = optionTag.options[optionTag.selectedIndex].text;
    // onClick="updatePostFollowID(this.id)" id=' + element.id
    var divListTagOpption = document.getElementById("list-author-opption");
    var para = document.createElement("li");
    para.innerHTML = tag;
    para.className = "authors";
    para.addEventListener('dblclick', function(element) {
        this.remove();
    });
    divListTagOpption.appendChild(para);
});

// add tag new
document.getElementById('btn-add-author-new').addEventListener('click', function function_name() {
    var strTagNews = document.getElementById("author-news");

    if (strTagNews.value !== "") {
        var divListTagOpption = document.getElementById("list-author-opption");
        var tag = document.getElementById("author-news").value;
        var para = document.createElement("li");

        para.innerHTML = tag;
        para.className = "authors";
        para.addEventListener('dblclick', function(element) {
            this.remove();
        });
        divListTagOpption.appendChild(para);
    }
});



// create book or update book
document.getElementById('btn-up-blog').addEventListener('click', function() {

    clearContentUpBook();

    var strTitle = document.getElementById("title-blog").value;
    var strContent = editor.getData();
    var imgName = document.getElementById("link-img").value;

    // get categories name
    var listTag = document.getElementsByClassName("tags");
    var strListCategories = new Array();
    for (var i = 0; i < listTag.length; i++) {
        strListCategories.push(listTag[i].innerHTML);
    }

    // get author
    var listAuthor = document.getElementsByClassName("authors");
    var strListAuthor = new Array();
    for (var i = 0; i < listAuthor.length; i++) {
        strListAuthor.push(listAuthor[i].innerHTML);
    }

    var btnUpBlog = document.getElementById("btn-up-blog");

    // validate

    if (isBlankString(strTitle)) {
        document.getElementById('information-title-upload').textContent = '*this is not be blank';
        informationErrorLabel("Have error. Please check to information error!!!");
    } else if (isBlankString(strContent)) {
        document.getElementById('information-content-upload').textContent = '*this is not be blank';
        informationErrorLabel("Have error. Please check to information error");
    } else if (strListCategories.length == 0) {
        document.getElementById('information-categories-upload').textContent = '*not found item select';
        informationErrorLabel("Have error. Please check to information error");
    } else if (strListAuthor.length == 0) {
        document.getElementById('information-author-upload').textContent = '*not found item select';
        informationErrorLabel("Have error. Please check to information error");
    } else if (isBlankString(imgName)) {
        document.getElementById('information-link-image-upload').textContent = '*this is not be blank';
        informationErrorLabel("Have error. Please check to information error");
    } else {
        if (btnUpBlog.value === "add-post") {
            // data json
            var book = {
                "title": strTitle,
                "description": strContent,
                "nameCategories": strListCategories,
                "linkImage": imgName,
                "nameAuthor": strListAuthor
            };

            $.ajax({
                contentType: 'application/json',
                url: "/api/books",
                type: "POST",
                data: JSON.stringify(book),
                dataType: 'json',
                success: function(data) {
                    informationSuccessLabel('Bài viết đã được chuyển đến admin phê duyệt!!!');
                },
                error: function(e) {
                    console.log("dadyadyadyayd ");
                    console.log(e);
                    informationErrorLabel('Vui lòng nhập đúng các trường!!!');
                }
            });
        } else {
            var idBook = document.getElementById('btn-up-blog').value.split("-")[document.getElementById('btn-up-blog').value.split("-").length - 1];

            var book = {
                "id": idBook,
                "title": strTitle,
                "description": strContent,
                "nameCategories": strListCategories,
                "linkImage": imgName,
                "nameAuthor": strListAuthor
            };
            $.ajax({
                headers: {
                    "Authorization": localStorage.getItem('Authorization')
                },
                contentType: 'application/json',
                url: "/api/books",
                type: "PUT",
                data: JSON.stringify(book),
                dataType: 'json',
                success: function(data) {
                    informationSuccessLabel('Bài viết đã được chuyển đến admin phê duyệt');
                },
                error: function(e) {
                    informationErrorLabel('Vui lòng nhập đúng các trường');
                }
            });
        }

    }

});


// display list user when click btn check user
document.getElementById('btn-check-user').addEventListener('click', function() {
    //load data for page
    $.ajax({
        contentType: 'application/json',
        url: "/api/users/all",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var dataHTML = "";

            data.forEach(function(element) {
                // get role of user
                var btnElementEnable = "";
                if (element.enable) {
                    btnElementEnable = '<td class="col-lg-2 btn-disable-user" id=disable-user-' + element.id + '><button type="button" class="btn btn-warning" onClick="disableUser(this.id)" id=user-' + element.id + '>Disable</button></td>';
                } else {
                    btnElementEnable = '<td class="col-lg-2 btn-enable-user" id=enable-user-' + element.id + '><button type="button" class="btn btn-warning" onClick="enableUser(this.id)" id=user-' + element.id + '>Enable</button></td>';
                }
                var data = '<tr class="row" id="post-' + element.id + '">' +
                    '<td class="title-blog col-lg-3"><h6>' + element.email + '</h6></td>' +
                    '<td class="tag-blog col-lg-2">' +
                    element.firstName + " " + element.lastName +
                    '</td>' +
                    '<td class="img-blog col-lg-2"><img src="' + element.linkAvatar + '"></td>' +
                    '<td class="content-blog col-lg-3"><div style="max-height: 200px;overflow: scroll;" id="comment">' + element.description + '</div></td>' +
                    btnElementEnable +
                    '</tr>';

                dataHTML += data;
            });

            document.getElementById("body-list-post-user").innerHTML = dataHTML;
        },
        error: function(e) {

        }
    });
});

function enableBook(valueId) {
    var id = valueId.split("-")[valueId.split("-").length - 1];
    console.log(id);
    $.ajax({
        url: "/api/books/enable/" + id,
        type: "GET",
        success: function() {
            informationSuccessLabel('Bài viết đã được đăng!!!');
            document.getElementById(valueId).style.display = "none";
        },
        error: function(e) {
            informationErrorLabel('Vui lòng nhập đúng các trường!!!');
        }
    });
}

function editBookFollowID(id) {
    document.getElementById("upload-blog").style.display = "block";
    document.getElementById("list-post").style.display = "none";

    //load author for create book
    var dataHTMLAuthor = "";
    $.ajax({

        contentType: 'application/json',
        url: "/api/authors",
        type: "GET",
        success: function(data) {
            data.forEach(function(element) {
                dataHTMLAuthor += '<option value="2">' + element.name + '</option>';
            });
            document.getElementById('option-author').innerHTML = dataHTMLAuthor;
        },
        error: function(e) {
            console.log(e);
        }
    });

    // load categories for opption tag
    var dataHTMLCategories = "";
    $.ajax({
        contentType: 'application/json',
        url: "/api/category_books",
        type: "GET",
        success: function(data) {
            data.forEach(function(element) {
                dataHTMLCategories += '<option value="2">' + element.name + '</option>';
            });
            document.getElementById('option-tag').innerHTML = dataHTMLCategories;
        },
        error: function(e) {
            console.log(e);
        }
    });


    $.ajax({
        contentType: 'application/json',
        url: "/api/books/" + id,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            document.getElementById('title-blog').value = data.title;
            //document.getElementById('content-blog').innerHTML = data.content;
            editor.setData(data.description);
            document.getElementById('link-img').value = data.linkImage;
            document.getElementById('btn-up-blog').innerHTML = "Cập nhập bài viết";
            document.getElementById('btn-up-blog').value = "update-post-" + data.id;

            var divListTagOpption = document.getElementById("list-tags-opption");
            data.categoriesDTOS.forEach(function(element) {
                var para = document.createElement("li");
                para.innerHTML = element.name;
                para.className = "tags";
                para.addEventListener('dblclick', function(element) {
                    this.remove();
                });
                divListTagOpption.appendChild(para);
            });

            var divListAuthorOption = document.getElementById("list-author-opption");
            data.authorDTOS.forEach(function(element) {
                var para = document.createElement("li");
                para.innerHTML = element.name;
                para.className = "authors";
                para.addEventListener('dblclick', function(element) {
                    this.remove();
                });
                divListAuthorOption.appendChild(para);
            });
        },
        error: function(e) {
            console.log("that bai");
        }
    });
}

// disable user
function disableUser(valueId) {
    var id = valueId.split("-")[valueId.split("-").length - 1];
    $.ajax({
        url: "/api/users/disable/" + id,
        type: "PUT",
        success: function() {
            var elementDivOfUserDisable = document.getElementById("disable-" + valueId);
            elementDivOfUserDisable.innerHTML = '<td class="col-lg-2 btn-enable-user" id=enable-' + valueId + '><button type="button" class="btn btn-warning" onClick="enableUser(this.id)" id=' + valueId + '>Enable</button></td>';
            elementDivOfUserDisable.id = "enable-" + valueId;
        },
        error: function(e) {
            console.log(e);
        }
    });
}

// enable user
function enableUser(valueId) {
    var id = valueId.split("-")[valueId.split("-").length - 1];
    $.ajax({
        url: "/api/users/enable/" + id,
        type: "PUT",
        success: function() {
            // transfer disable
            var elementDivOfUserDisable = document.getElementById("enable-" + valueId);
            elementDivOfUserDisable.innerHTML = '<td class="col-lg-2 btn-disable-user" id=disable-' + valueId + '><button type="button" class="btn btn-warning" onClick="disableUser(this.id)" id=' + valueId + '>Disable</button></td>';
            elementDivOfUserDisable.id = "disable-" + valueId;
        },
        error: function(e) {
            console.log(e);
        }
    });

}

function clearContentUpBook() {
    document.getElementById('information-title-upload').textContent = '';
    document.getElementById('information-content-upload').textContent = '';
    document.getElementById('information-categories-upload').textContent = '';
    document.getElementById('information-author-upload').textContent = '';
    document.getElementById('information-link-image-upload').textContent = '';
}