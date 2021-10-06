import Swiper from "https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js";

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
// 获取banner下的leftMenu数据
$.getJSON("../json/bannerleftMenu.json", function (data) {
    $(".left>ul>li").hover(
        function (ev) {
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
    $(".l_btm").html(templateInfo);
    //拼接logo
    let logo = data.logo;
    let templateLogo = "";
    logo.forEach((el) => {
        templateLogo += `<a href="javascript:;">
        <img src="${el}" alt="" />
    </a>`;
    });
    //拼接img
    let img = data.img;
    let templateImg = "";
    img.forEach((el) => {
        templateImg += ` <a href="javascript:;">
        <img src="${el}" alt="" />
    </a>`;
    });
    $(".r_img").html(templateImg);
}
