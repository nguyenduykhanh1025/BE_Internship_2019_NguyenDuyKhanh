// get detail post follow id
document.addEventListener('DOMContentLoaded', function() {
    var url = window.location.href;
    var idItem = url.split("/")[url.split("/").length - 1];
    $.ajax({
        contentType: 'application/json',
        url: "/api/post/" + idItem,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            // get list tags
            var dataHtmlTags = "";
            data.tags.forEach(function(tag) {
                var dataTag = '<a id="tag-name" href="/page/tag/' + tag + '"><span class="badge badge-pill badge-dark">' +
                    tag +
                    '</span></a>';
                dataHtmlTags += dataTag;
            });
            // add detail post

            var elementDetail = document.getElementById("content-detail");
            var dataHTML = ' <div class="container">' +
                '<h1 class="tittle row">' + data.title + '</h1>' +
                '<div class="date-post row">' +
                '<p class="entry-date updated td-module-date" >' + data.datePublication + '</p>' +
                '</div>' +
                '<div class="name-user-blog row"><p>by </p><a href="#">'+ data.nameUser +'</a></div>'+
                '<div class="tags">' +
                dataHtmlTags +
                '</div>' +
                '<img src="' + data.imgLink + '" class="row">' +
                '<div class="row content-detail">' +
                data.content +
                '</div>' +
                '</div>';
            elementDetail.innerHTML = dataHTML;
            // end add detail post

            // add comment
            var elementComment = document.getElementById("content-main-comment");
            var dataHTMLComment = "";
            data.comments.forEach(function(element) {

                var dataFooterComment = "";
                if (element.user.username === getUserNameFromToken()) {
                    dataFooterComment = '<div class="comment-item-footer" id=comment-footer-' + element.id + '>' +
                        '<i class="fa fa-times-circle btn-delete-comment" onClick="deleteCommentFollowID(this.id)" id=' + element.id + '></i>' +
                        '<p class="repair" onClick="repairCommentFollowID(this.id)" id=repair-' + element.id + '>Repair</p>' +
                        '<p class="upComment" onClick="upCommentFollowID(this.id)" id=upComment-' + element.id + '>UpComment</p>' +
                        '</div>';
                }
                var content = element.content;
                var data = '<div class="comment-item" id=comment-' + element.id + '>' +
                    '<div class="comment-item-header">' +
                    '<a href="#"><p class="name-user-comment">' + element.user.username + '</p></a>' +
                    '<p class="date-comment">' +
                    '<time class="entry-date updated td-module-date">' + element.dateComment + '</time>' +
                    '</p>' +
                    '</div>' +
                    '<div class="comment-item-body">' +
                    '<input disabled class="content" type="text" id=input-comment-' + element.id + ' value="' + element.content + '">' +
                    '</div>' +
                    dataFooterComment +
                    '</div>';
                dataHTMLComment += data;
            });
            elementComment.innerHTML = dataHTMLComment;
        },
        error: function(e) {
            document.getElementById("user-validated").innerHTML = "user is validated. please!!!"
        }
    });
});
// end get post follow id


// add comment
document.getElementById("btn-comment").addEventListener('click', function() {
    var commentContent = document.getElementById("input-comment").value;

    var url = window.location.href;
    var idPost = url.split("/")[url.split("/").length - 1];
    var regularQuery = /[A-Za-z0-9_]/;
    if (commentContent.match(regularQuery) != null) {
        var comment = {
            "content": commentContent,
            "idPost": idPost
        };
        $.ajax({
            contentType: 'application/json',
            url: "/api/comment",
            type: "POST",
            data: JSON.stringify(comment),
            dataType: 'json',
            success: function(data) {
                var dataHTML = document.getElementById("content-main-comment").innerHTML;

                var dataFooterComment = '<div class="comment-item-footer" id=comment-footer-' + data.id + '>' +
                    '<i class="fa fa-times-circle btn-delete-comment" onClick="deleteCommentFollowID(this.id)" id=' + data.id + '></i>' +
                    '<p class="repair" onClick="repairCommentFollowID(this.id)" id=repair-' + data.id + '>Repair</p>' +
                    '<p class="upComment" onClick="upCommentFollowID(this.id)" id=upComment-' + data.id + '>UpComment</p>' +
                    '</div>';
                var datax = '<div class="comment-item" id=comment-' + data.id + '>' +
                    '<div class="comment-item-header">' +
                    '<a href="#"><p class="name-user-comment">' + data.user.username + '</p></a>' +
                    '<p class="date-comment">' +
                    '<time class="entry-date updated td-module-date">' + data.dateComment + '</time>' +
                    '</p>' +
                    '</div>' +
                    '<div class="comment-item-body">' +
                    '<input disabled class="content" type="text" id=input-comment-' + data.id + ' value="' + data.content + '">' +
                    '</div>' +
                    dataFooterComment +
                    '</div>';
                dataHTML += datax;
                document.getElementById("content-main-comment").innerHTML = dataHTML;
                document.getElementById("input-comment").value = "";
            },
            error: function(xhr, textStatus) {

                if (xhr.status == 403) {
                    document.getElementById("alert-infomation").innerHTML = '<div class="alert alert-danger">' +
                        '<strong>error!</strong> Ban Chua Dang Nhap' +
                        '</div>';
                }
            }
        });
    }

});

// event delete comment
function deleteCommentFollowID(id) {
    if (confirm('You want to delete comment???')) {
        $.ajax({
            contentType: 'application/json',
            url: "/api/comment/" + id,
            type: "DELETE",
            success: function() {
                var commentItem = document.getElementById('comment-' + id);
                commentItem.remove();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
}
// repair comment follow id
function repairCommentFollowID(idRepairComment) {

    var idComment = idRepairComment.split('-')[idRepairComment.split('-').length - 1];

    var inputComment = document.getElementById('input-comment-' + idComment);
    inputComment.disabled = false;

}

function upCommentFollowID(idRepairComment) {
    var idComment = idRepairComment.split('-')[idRepairComment.split('-').length - 1];

    var inputComment = document.getElementById('input-comment-' + idComment);
    var regularQuery = /[A-Za-z0-9_]/;
    if (inputComment.value.match(regularQuery) != null) {
        var url = window.location.href;
        var idPost = url.split("/")[url.split("/").length - 1];

        var comment = {
            "id": idComment,
            "idPost": idPost,
            "content": inputComment.value
        };

        $.ajax({
            contentType: 'application/json',
            url: "/api/comment/" + idComment,
            type: "PUT",
            data: JSON.stringify(comment),
            dataType: 'json',
            success: function(data) {
                inputComment.value = data.content;
                inputComment.disabled = true;
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
}
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


// func logout
document.getElementById("btn-logout").addEventListener('click', function() {
    // logout in front
    localStorage.clear();
    document.getElementById('name-user').style.display = 'none';
    console.log(document.getElementById('name-user'));
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