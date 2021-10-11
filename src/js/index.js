import Swiper from "https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js";
$("#promoTop_close").click(function () {
    $(".promotional-top").css("display", "none");
    $(".leftNav").css("top", $(".seckill").offset().top);
});

$(window).scroll(function () {
    // top 搜索框位置
    if ($(".seckill").offset().top - $(document).scrollTop() <= 72) {
        $(".header").addClass("header_fix");
        $(".leftNav").addClass("leftNav_fix");
        $(".leftNav").removeAttr("style");
    } else {
        $(".header").removeClass("header_fix");
        $(".leftNav").removeClass("leftNav_fix");
        $(".leftNav").css("top", $(".seckill").offset().top);
    }

    //Recommend_tab 位置
    let recommend = document.getElementsByClassName("Recommend")[0];
    let rectopbound = recommend.getBoundingClientRect().top;
    if (rectopbound <= 0) {
        $(".Recommend_tab").addClass("recommend_fix");
        $(".leftNav").addClass("leftNav_fix_recommend");
    } else {
        $(".Recommend_tab").removeClass("recommend_fix");
        $(".leftNav").removeClass("leftNav_fix_recommend");
    }

    //letNav li left_active
    $(".leftNav li").each(function (i, ele) {
        if ($(ele).attr("data-title")) {
            let offsetId = "." + $(ele).attr("data-title");
            if ($(document).scrollTop() >= $(offsetId).offset().top - 72) {
                $(".leftNav li").eq(i).addClass("left_active").siblings().removeClass("left_active");
            }
        }
    });
});

//单击跳转
$(".leftNav li").click(function () {
    if ($(this).attr("data-title")) {
        let place = "." + $(this).attr("data-title");
        let scrolltop = $(place).offset().top - 72;
        $("html").animate({ scrollTop: scrolltop }, 300);
        $(this).addClass("left_active").siblings().removeClass("left_active");
    }
});
$(".toTop").click(function () {
    $("html").animate({ scrollTop: 0 }, 300);
});

//banner left nav menu
// 获取banner下的leftMenu数据
$.getJSON("../json/bannerleftMenu.json", function (data) {
    $(".left>ul>li").hover(
        function () {
            let id = this.id;
            leftMenu(data[id]);
        },
        function () {}
    );
});
//拼接数据
function leftMenu(data) {
    //拼接标题
    let template = "";
    let title = data.title;
    title.forEach((el) => {
        template += `<a href="javascript:;">${el}<i class="iconfont icon-you"></i></a>`;
    });
    $(".l_top").html(template);
    //拼接详情
    let info = data.info;
    let templateInfo = "";
    for (let i = 0; i < info.length; i++) {
        let dl = "";
        let dt = "";
        let dd = "<dd>";
        for (let j = 0; j < info[i].length; j++) {
            if (j == 0) {
                dt = `<dt><a href="javascript:;">${info[i][j]}<i class="iconfont icon-you"></i></a></dt>`;
            } else {
                dd += `<a href="javascript:;">${info[i][j]}</a>`;
            }
        }
        dl = `<dl>${dt}${dd}</dl>`;
        templateInfo += dl;
    }
    $(".banner .l_btm").html(templateInfo);

    //拼接logo
    let logo = data.logo;
    let templateLogo = "";
    logo.forEach((el) => {
        templateLogo += `<a href="javascript:;">
        <img src="${el}" alt="" />
    </a>`;
    });
    $(".banner .r_logo").html(templateLogo);
    //拼接img
    let img = data.img;
    let templateImg = "";
    img.forEach((el) => {
        templateImg += ` <a href="javascript:;">
        <img src="${el}" alt="" />
    </a>`;
    });
    $(".banner .r_img").html(templateImg);
}

//banner center swiper
const bigswiper = new Swiper(".swiper-bigImg", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
const smallswiper = new Swiper(".swiper-smallImg", {
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//banner right detail
//banner right li hover setyle
$("#telephone").mouseenter(mininavHover);
$("#ticket").mouseenter(mininavHover);
$("#hotel").mouseenter(mininavHover);
$("#game").mouseenter(mininavHover);
function mininavHover() {
    $(".mininav li[id]:not([id='game'])").css("margin-top", "-36px");
    $("#hotel .text").addClass("textHover");
    $(this).addClass("li_active").siblings().removeClass("li_active");
    $(".detail").addClass("showDetail");
    let d_id = "#d_" + this.id;
    $(d_id).css("display", "block").siblings("div").css("display", "none");
    //game
    if (this.id == "game") {
        $("#game").css("margin-top", "-55px");
    }
}

//banner right telephone once
$(".flow").mouseenter(function () {
    $(".prepaidRefillDiv").css("display", "none");
    $(".flowDiv").css("display", "block");
    $(this).addClass("title_active").siblings().removeClass("title_active");
});
$(".prepaidRefill").mouseenter(function () {
    $(".prepaidRefillDiv").css("display", "block");
    $(".flowDiv").css("display", "none");
    $(this).addClass("title_active").siblings().removeClass("title_active");
});
//banner right teltphone select
$(".faceValue").change(function () {
    let num = "";
    switch (this.value) {
        case "10元":
            num = "￥9.8-￥11.0";
            break;
        case "20元":
            num = "￥19.6-￥21.0";
            break;
        case "30元":
            num = "￥29.4-￥31.0";
            break;
        case "50元":
            num = "￥49.0-￥50.0";
            break;
        case "100元":
            num = "￥98.0-￥100.0";
            break;
        case "200元":
            num = "￥196.0-￥200.0";
            break;
        case "300元":
            num = "￥294.0-￥300.0";
            break;
        case "500元":
            num = "￥490.0-￥500.0";
            break;
    }
    $(".charge").text(num);
});

//banner right ticket
$("#d_ticket .title").mouseover(function (ev) {
    moverDiv(ev, this);
});
function moverDiv(ev, that) {
    let moveDiv = "." + $(that).siblings()[0].className;
    if (ev.target.className != "title") {
        let m_left = "0px";
        switch (ev.target.className) {
            case "domestic":
            case "inland":
            case "entertainment":
                m_left = "0px";
                break;
            case "international":
            case "promotion":
            case "timeCard":
                m_left = "-175px";
                break;
            case "preference":
            case "QQ":
                m_left = "-350px";
                break;
        }
        $(moveDiv).css("margin-left", m_left);
        $(ev.target).addClass("title_active").siblings().removeClass("title_active");
    }
}
//banner right d_ticket oneOrRound
$(".oneOrRound input").click(function () {
    let parentDiv = $(this).parent().parent();
    let arrivalTime = parentDiv[0].children[2].children[0].children[1];
    let departureTime = parentDiv[0].children[2].children[0].children[2];
    if (this.id == "oneway" || this.id == "oneway_int") {
        $(departureTime).css("display", "none");
        $(arrivalTime).css("width", "126px");
    } else if (this.id == "round" || this.id == "round_int") {
        $(departureTime).css("display", "block");
        $(arrivalTime).css("width", "63px");
    }
});
//banner right d_ticket city change
$("#d_ticket .city i").click(function () {
    let departure = $(".departure").val();
    let arrival = $(".arrival").val();
    $(".departure").val(arrival);
    $(".arrival").val(departure);
});

//banner right hotel
$("#d_hotel .title").mouseover(function (ev) {
    moverDiv(ev, this);
});

//banner right game
$("#d_game .title").mouseover(function (ev) {
    moverDiv(ev, this);
});
//banner right close
$(".mininav .close").click(function () {
    $(".mininav li").css("margin-top", "0px").removeClass("li_active");
    $(".detail").removeClass("showDetail");
    $(this).addClass("li_active");
    $("#hotel .text").removeClass("textHover");
});

//seckill countdown
setInterval(() => {
    let date = new Date();
    let session = date.getHours() % 2 ? date.getHours() - 1 : date.getHours();
    let hour = session == date.getHours() ? "01" : "00";
    let minute = 59 - date.getMinutes() >= 10 ? 59 - date.getMinutes() : "0" + (59 - date.getMinutes());
    let second = 59 - date.getSeconds() >= 10 ? 59 - date.getSeconds() : "0" + (59 - date.getSeconds());
    $(".seckill .session").text(session + ":00");
    $(".seckill .hour").text(hour);
    $(".seckill .minute").text(minute);
    $(".seckill .second").text(second);
}, 1000);

//seckill center swiper
$.getJSON("../json/seckillcenter.json", function (data) {
    let imgsrc = data.img;
    let p_title = data.title;
    let p_price = data.price;
    let seckill_slide = "";
    for (let i = 0; i < imgsrc.length; i++) {
        seckill_slide += `
        <div class="swiper-slide">
            <a href="javascript:;">
                <img src=${imgsrc[i]} alt="" />
                <p class="title">
                    ${p_title[i]}
                </p>
                <p class="price">${p_price[i]}</p>
            </a>
        </div>`;
    }
    $(".swiper-seckill .swiper-wrapper").html(seckill_slide);
    create_seckillswiper();
});
//seckill center  create seckillswiper
function create_seckillswiper() {
    const seckillswiper = new Swiper(".swiper-seckill", {
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

//special f1 Left choiceness
//获取数据
$.getJSON("../json/specialf1Left.json", function (data) {
    specialf1(data.choiceness);
    $(".f1_header li").mouseenter(function () {
        let id = this.id;
        $(this).children()[0].classList.add("f1header_active");
        let otherEl = $(this).siblings().children();
        for (let key in otherEl) {
            if (otherEl[key].className) {
                otherEl[key].classList.remove("f1header_active");
            }
        }
        specialf1(data[id]);
    });
});
//拼接数据
function specialf1(data) {
    let leftContent = "";
    if (data.minimum[0]) {
        leftContent = `<p class="sign">${data.minimum[0]}</p>`;
    }
    leftContent += `<img src="../img/${data.img[0]}" alt="" />
    <p class="headline">${data.title[0]}</p>
    <p class="price">￥<span>${data.price[0]}</span></p>
    <p class="soldMsg">${data.sales[0].slice(0, 2)} <span>${data.sales[0].slice(2, -1)}</span>${data.sales[0].slice(
        -1
    )}</p>`;
    $(".f1_left .f1_detail .left_content").html(leftContent);
    let rightContent = "";
    for (let i = 1; i < data.img.length; i++) {
        rightContent += ` <div class="f1r_item">
        <div class="item_img">
            <img src="../img/${data.img[i]}" alt="" />
            <p>${data.minimum[i]}</p>
        </div>
        <div class="item_detail">
            <p class="item_name">${data.title[i]}</p>
            <p class="item_ptice">￥ <span>${data.price[i]}</span></p>
            <p class="soldMsg">${data.sales[i].slice(0, 2)} <span>${data.sales[i].slice(2, -1)}</span>${data.sales[
            i
        ].slice(-1)}</p>
        </div>
    </div>`;
    }
    $(".f1_left .f1_detail .right_content").html(rightContent);
}

//special f2
const f2swiper = new Swiper(".swiper-f2List", {
    slidesPerView: 5,
    spaceBetween: 50,
    slidesPerGroup: 1,
    loop: true,
    freeMode: true,
    speed: 3000,
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
        draggable: true,
        dragSize: 99,
    },
});

//special f3
//special f3 one
const f3swiper = new Swiper(".swiper-f3List", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
//special f3 two
$.getJSON("../json/specialf3Left.json", (data) => {
    specialF3TwoHtml(data);
    $(".f3_two .det_tab li").mouseenter(function () {
        specialF3TwoHtml(data, this.id, this);
    });
});
function specialF3TwoHtml(data, thisId = "changePhone", that) {
    let det_item = ``;
    for (let i = 0; i < data[thisId].img.length; i++) {
        det_item += `
        <div class="det_item">
            <a href="javascript:;">
                <img src="../img/${data[thisId].img[i]}" alt="" />
                <div class="det_info">
                    <p class="det_infoName">
                    ${data[thisId].title[i]}
                    </p>
                    <p class="det_infoPrice"><span>￥</span>${data[thisId].price[i]}</p>
                </div>
            </a>
        </div>
        `;
    }
    $(".f3_two .det_content").html(det_item);
    $(that).attr("class", "f3_active").siblings().removeClass("f3_active");
}

//channels channls_item
$.getJSON("../json/channlsItem.json", (data) => {
    let channlsItem = "";
    for (let i = 0; i < data.title.length; i++) {
        channlsItem += `<div class="channls_item">
        <a href="javascript:;">
            <h3>${data.title[i]}<span>${data.subTitle[i]}</span></h3>
            <img src="../img/${data.leftImg[i]}" alt="" />
            <img src="../img/${data.RightImg[i]}" alt="" />
        </a>
    </div>`;
    }
    $(".channelsInner").append(channlsItem);
});

//Recommend
$.getJSON("../json/recommend.json", function (data) {
    recommendItem(data);
    $(".Recommend_tab li").click(function () {
        recommendItem(data, this.id);
        $(this).attr("class", "Recommend_active").siblings().removeClass("Recommend_active");
        $(document).scrollTop($(".Recommend").offset().top - 10);
    });
});
function recommendItem(data, thisId = "choiceness") {
    let reItem = ``;
    for (let i = 0; i < data[thisId].img.length; i++) {
        reItem += `<div class="Recommend_item">
            <img src="../img/${data[thisId].img[i]}" alt="" />
            <p class="title">${data[thisId].title[i]}</p>
            <p class="price">
                <span>￥</span>${data[thisId].price[i].slice(0, -2)}<span>.${data[thisId].price[i].slice(-2)}</span>
            </p>
            <div class="Recommend_item_hover">
                <i class="iconfont icon-31guanbi"></i>
                <div class="similarity_btn">
                    <button>
                        <i class="iconfont icon-yanjing"></i>
                        找相似
                    </button>
                </div>
            </div>
        </div>`;
    }
    $(".Recommend_info").html(reItem);
}
