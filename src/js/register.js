$(".next button").click(function () {
    location.hash = "#/reg";
});
$(".checkPhone").click(function () {
    let phone = $(".inputPhone").val();
    console.log(phone);
    $("#phone").val(phone);
});
// var a = false;
switch (location.hash) {
    case "#/reg":
        $(".inputPhone").css("display", "none");
        $(".inputInfoDiv").css("display", "block");
        let li = $(".tab ul").children()[2];
        $(li).addClass("active").siblings().removeClass("active");
        break;
    case "#/login":
        $(".inputPhone").css("display", "none");
        $(".inputInfo").css("display", "none");
        $(".each").css("display", "none");
        $(".inputLoginDiv").css("display", "block");
        let li2 = $(".tab ul").children()[4];
        $(li2).addClass("active").siblings().removeClass("active");
        break;
}
//判断两次密码是否相同
let ischeck = false;
function checkPwd() {
    let cpwd = $("#checkpwd input").val();
    let pwd = $("#password input").val();
    if (pwd == cpwd) {
        $(".hintCheckpwd").text(" ");
        if (pwd.length < 8) {
            $(".hintPassword").text("密码长度不足8位");
            $("#password i").css("background-position-x", "-17px");
            $("#password i").css("background-position-y", "-117px");
            return (ischeck = false);
        } else {
            $(".hintPassword").text(" ");
            $("#checkpwd i").css("background-position-x", "0px");
            $("#checkpwd i").css("background-position-y", "-117px");
            return (ischeck = true);
        }
    } else {
        $(".hintCheckpwd").text("两次密码不同");
        $("#checkpwd i").css("background-position-x", "-17px");
        $("#checkpwd i").css("background-position-y", "-117px");
        return (ischeck = false);
    }
}
//判断不为空
function isEmpty(thisValue, isHave) {
    if (thisValue != "") {
        return (isHave = true);
    } else {
        return (isHave = false);
    }
}
//判断用户名是否存在
let hasName = false;
$("#username input").on("input", function () {
    $.get("../../interface/regName.php", { username: this.value }, function (data) {
        let info = JSON.parse(data);
        console.log(info);
        if ($("#username input").val()) {
            $(".hintUsername").text(" ");
            info.has
                ? ((hasName = false),
                  $("#username i").css("background-position-x", "-17px"),
                  $("#username i").css("background-position-y", "-117px"),
                  $(".hintUsername").text("用户名已存在"))
                : ((hasName = true),
                  $("#username i").css("background-position-x", "0px"),
                  $("#username i").css("background-position-y", "-117px"));
        } else {
            $(".hintUsername").text("用户名不能为空");
            $("#username i").css("background-position-x", "-17px");
            hasName = false;
        }
        checkInpt();
    });
});
//密码
$("#password input").on("input", function () {
    let reg = [/\d+/, /[a-z]+/, /[A-Z]+/, /[^0-9A-Za-z]+/];
    if (this.value.length < 8) {
        $(".hintPassword").text("密码长度不足8位");
        $("#password i").css("background-position-x", "-17px");
        $("#password i").css("background-position-y", "-117px");
    } else {
        let check = reg.map((el) => el.test(this.value));
        let strong = check.reduce((prev, next) => prev + next);
        $(".hintPassword").text(" ");
        switch (strong) {
            case 1:
            case 2:
                $("#password i").css("background-position-x", "-17px");
                $("#password i").css("background-position-y", "-135px");
                break;
            case 3:
                $("#password i").css("background-position-x", "-35px");
                $("#password i").css("background-position-y", "-117px");
                break;
            case 4:
                $("#password i").css("background-position-x", "-35px");
                $("#password i").css("background-position-y", "-135px");
                break;
        }
    }
    checkPwd();
    checkInpt();
});
//确认密码
$("#checkpwd input").on("input", function () {
    checkPwd();
    checkInpt();
});
//电话
let isPhone = false;
$("#phone input").on("change", function () {
    let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (reg.test(this.value)) {
        isPhone = true;
        $(".hintPhone").text(" ");
        $("#phone i").css("background-position-x", "0px");
        $("#phone i").css("background-position-y", "-117px");
    } else {
        isPhone = false;
        $(".hintPhone").text("手机号格式错误");
        $("#phone i").css("background-position-x", "-17px");
        $("#phone i").css("background-position-y", "-117px");
    }
    checkInpt();
});
//邮箱
let isEmail = false;
$("#email input").on("change", function () {
    let reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.value)) {
        isEmail = true;
        $(".hintEmail").text(" ");
        $("#email i").css("background-position-x", "0px");
        $("#email i").css("background-position-y", "-117px");
    } else {
        isEmail = false;
        $(".hintEmail").text("邮箱格式错误");
        $("#email i").css("background-position-x", "-17px");
        $("#email i").css("background-position-y", "-117px");
    }
    checkInpt();
});
//更改提交按钮是否可用
function checkInpt() {
    if (ischeck && hasName && isEmail && isPhone) {
        $(".next").attr("disabled", false);
        console.log(1);
    } else {
        $(".next").attr("disabled", true);
        console.log(2);
    }
}
checkInpt();
