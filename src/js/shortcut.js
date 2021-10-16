//shourcut
import $ from "./library/jquery.js";
$(".shortcut").click(function (ev) {
    console.log();
    if (ev.target.nodeName == "A") {
        let val = ev.target.innerHTML;
        $("#area").html(val);
        $(ev.target).addClass("active");
        $(ev.target).parent().siblings().children().removeClass("active");
    }
});
