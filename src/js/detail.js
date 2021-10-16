import Swiper from "https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js";
import $ from "./library/jquery.js";
import cookie from "./library/cookie.js";
//footer header
$("footer").load("footer.html");
$(".shortcut").load("shortcut.html");
// product_intro img list create swiper
const imgListSwiper = new Swiper(".product_intro_imgs", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    disabledClass: "button-disabled",
    slidesPerView: 5,
});

//get Ajax
let id = location.search.split("=")[1];
$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: { id },
    dataType: "json",
})
    .then((res) => {
        let img = JSON.parse(res.img);
        // showImg 默认第一张
        $(".showImg img").attr("src", "../" + img[0].src);
        //店铺首图
        $(".store img").attr("src", "../" + res.shopHeaderImg);
        // imgList
        let imgListTemplate = ``;
        img.forEach(function (el, i) {
            if (i == 0) {
                imgListTemplate += `
            <div class="swiper-slide">
                <img src="../${el.src}" alt="${el.alt}" class="img_active" />
            </div>`;
            } else {
                imgListTemplate += `
            <div class="swiper-slide">
                <img src="../${el.src}" alt="${el.alt}" />
            </div>`;
            }
        });
        $(".imgs .swiper-wrapper").html(imgListTemplate);

        //product_intro showImg src=imgList src
        $(".product_intro_imgs .swiper-slide").mouseenter(function (el) {
            $(".showImg img").attr("src", el.target.src);
            $(el.target).addClass("img_active");
            $(this).siblings().children().removeClass("img_active");
        });
        //标题
        $(".itemInfo_top h2").html(res.title);
        //价格
        $(".p_price span").html(parseFloat(res.price).toFixed(2));
        //累计评价
        $(".sumAssessmentNum").html(res.cumulativeAssessment);
        //类型选择
        if (res.type) {
            let chooseColor = JSON.parse(res.type);
            let chooseColorTemplata = `<p class="title">选择颜色</p>`;
            chooseColor.forEach(function (el, i) {
                if (i == 0) {
                    chooseColorTemplata += `
                        <div  class="chooseColor_active">
                            <img src="../${el.src}" alt="" />
                            <p>${el.title}</p>
                        </div>
                    `;
                } else {
                    chooseColorTemplata += `
                        <div>
                            <img src="../${el.src}" alt="" />
                            <p>${el.title}</p>
                        </div>
                    `;
                }
            });

            $(".chooseColor").html(chooseColorTemplata);
            $(".chooseColor div").click(function () {
                $(this).addClass("chooseColor_active").siblings().removeClass("chooseColor_active");
            });
        }
        //分期
        let installmentTemplata = `
            <li>
                <a href="javascript:;">不分期</a>
                <p>无服务费</p>
            </li>
            <li>
                <a href="javascript:;">${(res.price / 3).toFixed(2)} x 3期</a>
                <p>无服务费</p>
            </li>
            <li>
                <a href="javascript:;">￥${(res.price / 6).toFixed(2)} x 6期</a>
                <p>无服务费</p>
            </li>
            <li>
                <a href="javascript:;">￥${(res.price / 12).toFixed(2)} x 12期</a>
                <p>无服务费</p>
            </li>
            <li>
                <a href="javascript:;">￥${(res.price / 24).toFixed(2)} x 24期</a>
                <p>含服务费：费率0.50%，￥${(res.price * 0.005).toFixed(2)}×24期</p>
            </li>
        `;
        $(".installment ul").html(installmentTemplata);
        //详情图片
        $(".ela_content").html(res.details);
        //网页标题
        $("head title").html(res.title);
        //店铺名称
        $(".aside .title>h3>span").html(res.shopName);
        $(".nav_right li:first a").html(res.shopName);
        //商品名称
        $(".nav_left li:last").html(res.title);
    })
    .catch((xhr) => {
        console.log(xhr.status);
    });

//product_intro showImg bigImg
$(".showImg").mousemove(function (ev) {
    //放大镜
    $(".magnifying").css("display", "block");
    let top = ev.pageY - $(this).offset().top - 117;
    let left = ev.pageX - $(this).offset().left - 117;
    if (top <= 0) top = 0;
    if (left <= 0) left = 0;
    if (top >= 117) top = 117;
    if (left >= 117) left = 117;
    $(".magnifying").css({ top: top, left: left });
    //展示大图
    let src = $(".showImg img")[0].src;
    let a = $(".showBigImg").css({
        display: "block",
        backgroundImage: "url(" + src + ")",
        backgroundPositionX: -left,
        backgroundPositionY: -top,
    });
});
$(".showImg").mouseleave(function () {
    $(".magnifying").css("display", "none");
    $(".showBigImg").css("display", "none");
});
//数量
(function () {
    $(".count input").val(1);
    $(".count input").on("change", function () {
        let num = parseInt(this.value);
        if (isNaN(num)) {
            this.value = 0;
        }
        if (num < 0) {
            this.value = 0;
        }
    });
    let num = parseInt($(".count input").val());
    $(".add").click(function (e) {
        num++;
        $(".count input").val(num);
        $(".subtract").css({ color: "#000", cursor: "pointer" });
    });
    $(".subtract").click(function () {
        if (num > 0) {
            num--;
            $(".count input").val(num);
            $(this).css({ color: "#000", cursor: "pointer" });
            if (num == 0) {
                $(this).css({ color: "#ccc", cursor: "not-allowed" });
            }
        }
    });
})();

//product_intro WatchAndSee create swiper
const WatchAndSeeSwiper = new Swiper(".WatchAndSee", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    direction: "vertical",
    noSwiping: true,
});
//加入购物车
$(".itemInfo_btm a").click(function () {
    let num = $(".count input").val();
    addShoppingCar(id, num);
});
$(".intoShop").click(function () {
    let num = $(".count input").val();
    addShoppingCar(id, num);
});
//加入购物车 cookie
function addShoppingCar(id, num) {
    let shop = cookie.get("shop");
    let product = { id, num };
    if (shop) {
        shop = JSON.parse(shop);
        if (shop.some((e) => e.id == id)) {
            let index = shop.findIndex((elm) => elm.id == id);
            shop[index].num = parseInt(shop[index].num) + parseInt(num);
        } else {
            shop.push(product);
        }
    } else {
        shop = [];
        shop.push(product);
    }

    cookie.set("shop", JSON.stringify(shop), 1);
}
// fix
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(".particulars").offset().top) {
        $(".particulars .top .title").addClass("fix");
        $(".elaborate .tab").addClass("fix");
        $(".fixTitle").css("display", "block");
    } else {
        $(".particulars .top .title").removeClass("fix");
        $(".elaborate .tab").removeClass("fix");
        $(".fixTitle").css("display", "none");
    }
});
//to top
$(".toTop").click(function () {
    $(window).scrollTop(0);
});
