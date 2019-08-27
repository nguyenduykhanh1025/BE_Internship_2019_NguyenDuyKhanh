document.getElementById("btn-add-item").addEventListener('click', function() {
    document.getElementById("upload-blog").style.display = "block";
    document.getElementById("list-post").style.display = "none";
    document.getElementById('btn-up-blog').value = "add-post";
    document.getElementById('btn-up-blog').innerHTML = "Đăng bài viết";
});

// custom for list data post
document.addEventListener('DOMContentLoaded', function() {
    // load list post
    $.ajax({
        contentType: 'application/json',
        url: "/api/post/user",
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var dataHTML = "";

            data.forEach(function(element) {
                var dataHTMLTags = "";
                element.tags.forEach(function(tag) {
                    var data = '<li><a href="#">' + tag + '</a></li>';
                    dataHTMLTags += data;
                });
                document.getElementById(dataHTMLTags);

                var data = '<tr class="row" id="post-' + element.id + '">' +
                    '<td class="title-blog col-lg-2"><h5>' + element.title + '</h5></td>' +
                    '<td class="tag-blog col-lg-2">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Tag' +
                    '<span class="caret"></span></button>' +
                    '<ul class="dropdown-menu" id="list-tags-user-post">' +
                    dataHTMLTags +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td class="img-blog col-lg-2"><img src="' + element.imgLink + '"></td>' +
                    '<td class="content-blog col-lg-4"><div style="max-height: 200px;overflow: scroll;" id="comment">' + element.content + '</div></td>' +
                    '<td class="col-lg-1 btn-delete-blog"><button type="button" class="btn btn-danger btn-delete-post" onClick="deletePostFolowID(this.id)" id=' + element.id + '>Delete</button></td>' +
                    '<td class="col-lg-1 btn-update-blog"><button type="button" class="btn btn-primary" onClick="updatePostFollowID(this.id)" id=' + element.id + '>repair</button></td>' +
                    '</tr>';

                dataHTML += data;
            });
            document.getElementById("body-list-post-user").innerHTML = dataHTML;


        },
        error: function(e) {
            console.log("error");
        }
    });
});

/////////////////////////////////////custom for upload user
// load data for page
document.addEventListener('DOMContentLoaded', function() {

    // load user name
    var btnUser = document.getElementById("btn-user-name");
    btnUser.innerHTML = getUserNameFromToken();

    // load option
    $.ajax({
        contentType: 'application/json',
        url: "/api/tag",
        type: "GET",
        dataType: 'json',
        success: function(data) {

            var elementOptionTag = document.getElementById("option-tag");
            var dataHTML = "";
            data.forEach(function(element) {
                dataHTML += '<option value="' + element.name + '">' + element.name + '</option>';
            });
            elementOptionTag.innerHTML = dataHTML;
        },
        error: function(e) {
            console.log("error");
        }
    });
});

// end load data for page
// upload new blog
document.getElementById("btn-up-blog").addEventListener('click', function() {

    // clear backgroud
    clearBackgroudForFormGroup();

    var btnUpBlog = document.getElementById("btn-up-blog");


    var strTitle = document.getElementById("title-blog").value;
    var strContent = editor.getData();
    var imgName = document.getElementById("link-img").value;

    // get tag name
    var listTag = document.getElementsByClassName("tags");
    var strListTag = new Array();
    for (var i = 0; i < listTag.length; i++) {
        strListTag.push(listTag[i].innerHTML);
    }

    // check for error
    var checkError = 0; // 0 : not erorr ; 1 : erorr
    if (strTitle === "") {
        informationErrorForFormGroup(0);
        checkError = 1;
    }
    if (strContent === "") {
        informationErrorForFormGroup(1);
        checkError = 1;
    }
    if (strListTag.length == 0) {
        informationErrorForFormGroup(4);
        checkError = 1;
    }
    if (imgName === "") {
        informationErrorForFormGroup(5);
        checkError = 1;
    }

    if (checkError == 0) {
        // is add new post
        if (btnUpBlog.value === "add-post") {
            // data json
            var post = {
                "title": strTitle,
                "content": strContent,
                "tags": strListTag,
                "imgLink": imgName
            };

            $.ajax({
                contentType: 'application/json',
                url: "/api/post/upload",
                type: "POST",
                data: JSON.stringify(post),
                dataType: 'json',
                success: function(data) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-success">' +
                        '<strong>Success!</strong>Bài viết đã được đăng' +
                        '</div>'
                },
                error: function(e) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                        '<strong>error!</strong> Vui lòng nhập đúng các trường' +
                        '</div>'
                }
            });
        }

        // is update post
        else {

            var idPost = btnUpBlog.value.split('-')[btnUpBlog.value.split('-').length - 1];
            // data json
            var post = {
                "title": strTitle,
                "content": strContent,
                "tags": strListTag,
                "imgLink": imgName,
                "id": idPost
            };

            $.ajax({
                contentType: 'application/json',
                url: "/api/post",
                type: "PUT",
                data: JSON.stringify(post),
                dataType: 'json',
                success: function(data) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-success">' +
                        '<strong>Success!</strong>Bài viết đã được đăng' +
                        '</div>'
                },
                error: function(e) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                        '<strong>error!</strong> Vui lòng nhập đúng các trường' +
                        '</div>'
                }
            });
        }
    } else {
        document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
            '<strong>error!</strong> Vui lòng nhập đúng các trường' +
            '</div>';
    }
});

// delete post
function deletePostFolowID(clicked_id) {
    if (confirm('SURE DELE?')) {
        // call ajax
        $.ajax({
            contentType: 'application/json',
            url: "/api/post/" + clicked_id,
            type: "DELETE",
            success: function() {
                document.getElementById("post-" + clicked_id).style.display = "none";
            },
            error: function(e) {
                console.log("that bai");
            }
        });

    } else {
        alert("ok ban");
    }

}

// update post

function updatePostFollowID(clicked_id) {

    document.getElementById("upload-blog").style.display = "block";
    document.getElementById("list-post").style.display = "none";
    $.ajax({
        contentType: 'application/json',
        url: "/api/post/" + clicked_id,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            document.getElementById('title-blog').value = data.title;
            //document.getElementById('content-blog').innerHTML = data.content;
            editor.setData(data.content);
            document.getElementById('link-img').value = data.imgLink;
            document.getElementById('btn-up-blog').innerHTML = "Cập nhập bài viết";
            document.getElementById('btn-up-blog').value = "update-post-" + data.id;

            var divListTagOpption = document.getElementById("list-tags-opption");
            data.tags.forEach(function(element) {
                var para = document.createElement("li");
                para.innerHTML = element;
                para.className = "tags";
                para.addEventListener('dblclick', function(element){
                                            this.remove();
                                         });
                divListTagOpption.appendChild(para);
            });
        },
        error: function(e) {
            console.log("that bai");
        }
    });
}

// add tag
var indexTag = 0;
document.getElementById('btn-add-tag').addEventListener('click', function function_name() {
    var optionTag = document.getElementById("option-tag");
    var tag = optionTag.options[optionTag.selectedIndex].text;
    // onClick="updatePostFollowID(this.id)" id=' + element.id
    var divListTagOpption = document.getElementById("list-tags-opption");
    var para = document.createElement("li");
    para.innerHTML = tag;
    para.className = "tags";
    para.addEventListener('dblclick', function(element){
       this.remove();
    });
    divListTagOpption.appendChild(para);
});

document.getElementById('btn-add-tag-new').addEventListener('click', function function_name() {
    var strTagNews = document.getElementById("tag-news");

    if (strTagNews.value !== "") {
        var divListTagOpption = document.getElementById("list-tags-opption");
        var tag = document.getElementById("tag-news").value;
        var para = document.createElement("li");

        para.innerHTML = tag;
        para.className = "tags";
         para.addEventListener('dblclick', function(element){
                       this.remove();
                    });
        divListTagOpption.appendChild(para);
    }
});

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

// color error for formgroup
function informationErrorForFormGroup(index) {
    var formGroup = document.getElementsByClassName("form-group");
    formGroup[index].style.background = '#e54b4d';
}

// clear color for formGroup
function clearBackgroudForFormGroup() {
    var formGroup = document.getElementsByClassName("form-group");
    for (var i = 0; i < formGroup.length; ++i) {
        formGroup[i].style.background = 'white';
    }
}
