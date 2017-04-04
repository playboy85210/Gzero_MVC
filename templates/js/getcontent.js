$(document).ready(function (e) {
    var data = new Array();
    var name = new Array();
    var i = 1;
    var k = 0;
    for(;i<=5;i++){
        $("tr.wsite-multicol-tr:eq("+i+")").find("td").each(function (e) {
            $('#form').append('<input type="text" value="'+$(this).find("h2").text()+'" name="name[]" />');
            $('#form').append('<input type="text" value="'+$(this).find(".paragraph").text()+'" name="data[]" />');
            $('#form').append('<input type="text" value="http://dragonpearl.weebly.com'+$(this).find("img").attr("src")+'" name="img[]" />');
            }
        );
    }
    /*$(".wsite-multicol-col").each(function() {
     h2 += $(this).find("h2").text()+",";
     data += $(this).text()+",";
     });*/
    $("#submit").click(function (e) {
        $.ajax({
            type: 'POST',
            url: 'insertSql.php',
            data: {'data': data,'name':name},
            success: function (msg) {
                alert(msg);
            },
            error: function () {
                alert("error");
            }
        });
    });

});
