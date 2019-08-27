document.addEventListener('DOMContentLoaded', function() {
    var url = window.location.href;
    var tagName = url.split("/")[url.split("/").length - 1];
    getListPost(tagName);
});

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