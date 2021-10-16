import Swiper from "https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js";
import $ from "./library/jquery.js";
import cookie from "./library/cookie.js";
//引入footer
$("footer").load("footer.html");
const guessSwiper = new Swiper(".guess-swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
    },
});
//fix
$(window).scroll(function () {
    if ($(".guess").offset().top - $(window).scrollTop() < $(window).height()) {
        $(".fixSum").addClass("relataiveSum");
    } else {
        $(".fixSum").removeClass("relataiveSum");
    }
});
//获取数据
let shop = cookie.get("shop");
if (shop) {
    // shop = Array.from(JSON.parse(shop));
    shop = JSON.parse(shop);
    let idList = shop.map((el) => el.id).join();
    let shopTemplate = ``;
    $.ajax({
        type: "get",
        url: "../../interface/shop.php",
        data: { idList },
        dataType: "json",
    })
        .then((res) => {
            res.forEach((el, i) => {
                let num = shop.find((eml) => eml.id === el.id).num;
                let type = "";
                if (el.type) {
                    type = JSON.parse(el.type)[0].title;
                }
                shopTemplate += `
                <div class="productItem">
                        <div class="p_title">
                            <input type="checkbox" name="item_all" id="item_all${i}" />
                            <label for="item_all${i}">${el.shopName}</label>
                            <i class="iconfont icon-jingdongkefu"></i>
                        </div>
                        <div class="p_body">
                            <div class="p_body_tips">
                                <span>换购</span>
                                <p class="trade">
                                    已满1件，可低价换购商品
                                    <a href="javascript:;"> 立即换购> </a>
                                </p>
                                <p class="tips_price">￥<span>${parseFloat(num * el.price).toFixed(2)}</span></p>
                            </div>
                            <div class="p_body_content">
                                <input type="checkbox" name="chouse" class="chouse" />
                                <img src="../${JSON.parse(el.img)[0].src}" alt="" />
                                <p class="pro_title">
                                    <span>京东超市</span>
                                    <a href="javascript:;">${el.title}</a>
                                </p>
                                <p class="pro_type">${type}</p>
                                <p class="pro_price">￥<span>${parseFloat(el.price).toFixed(2)}</span></p>
                                <p class="pro_number">
                                    <button class="pro_subtract" data-id=${el.id}>-</button>
                                    <input type="text" min="1" placeholder="1" value="${num}" data-id=${el.id} />
                                    <button class="pro_add" data-id=${el.id}>+</button>
                                </p>
                                <p class="pro_priceSum">￥<span>${parseFloat(num * el.price).toFixed(2)}</span></p>
                                <div class="buts">
                                    <p class="pro_del" data-id=${el.id}>删除</p>
                                    <p class="pro_flow">移入关注</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $(".productList").html(shopTemplate);
            let totalPrices = 0;
            let chouseNum = 0;
            //单个商品选择
            $(":checkbox:not(#allchouse,#s_allSum)").on("click", function (ev) {
                $("#allchouse").prop("checked", isAllCheck());
                $("#s_allSum").prop("checked", isAllCheck());
                if (this.className == "chouse") {
                    let thisPrice = parseFloat($(this).siblings(".pro_priceSum").children("span")[0].innerHTML);
                    if ($(this).prop("checked")) {
                        totalPrices += thisPrice;
                        chouseNum++;
                    } else {
                        totalPrices -= thisPrice;
                        chouseNum--;
                    }
                }
                $(".allPrice span").text(totalPrices.toFixed(2));
                $(".hoveChosen span").text(chouseNum);
            });
            //全选
            function Allchouse(that) {
                $("input[type='checkbox']").each(function (i, el) {
                    $(el).prop("checked", $(that).prop("checked"));
                });
                if ($(that).prop("checked")) {
                    totalPrices = 0;
                    chouseNum = 0;
                    $(".chouse:checked")
                        .siblings(".pro_priceSum")
                        .children("span")
                        .each((i, el) => {
                            totalPrices += parseFloat(el.innerHTML);
                            chouseNum++;
                        });
                } else {
                    totalPrices = 0;
                    chouseNum = 0;
                }
                $(".allPrice span").text(totalPrices.toFixed(2));
                $(".hoveChosen span").text(chouseNum);
            }
            $("#allchouse").click(function () {
                Allchouse(this);
            });
            $("#s_allSum").click(function () {
                Allchouse(this);
            });
            //删除
            $(".pro_del").click(function () {
                let res = shop.filter((el) => el.id != $(this).attr("data-id"));
                cookie.set("shop", JSON.stringify(res), 1);
                location.reload();
            });
            //加减
            function addSubtract(that, add) {
                let thisId = $(that).attr("data-id");
                let currentNum = shop.find((el) => el.id == thisId).num;
                let currentIndex = shop.findIndex((e) => e.id == thisId);
                if (add == -1 && currentNum == 1) {
                    currentNum == 1;
                } else {
                    currentNum += add;
                    shop[currentIndex].num = currentNum;
                    cookie.set("shop", JSON.stringify(shop), 1);
                    location.reload();
                }
            }
            //减
            $(".pro_subtract").click(function () {
                addSubtract(this, -1);
            });
            //加
            $(".pro_add").click(function () {
                addSubtract(this, 1);
            });
            //修改
            $(".pro_number input").change(function () {
                let thisId = $(this).attr("data-id");
                let currentIndex = shop.findIndex((e) => e.id == thisId);
                let currentNum = parseInt($(this).val());
                shop[currentIndex].num = currentNum;
                cookie.set("shop", JSON.stringify(shop), 1);
                location.reload();
            });
            //商品总数量
            $(".allProducts span").html(shop.length);
        })
        .catch((xhr) => {
            console.log(xhr.status);
        });
}

function isAllCheck() {
    let elms = Array.from($(":checkbox:not(#allchouse,#s_allSum)"));
    let result = elms.every((el) => $(el).prop("checked"));
    return result;
}

//店铺全选
// $(".productItem .p_title input").click(function (ev) {
//     console.log(1);
// });
