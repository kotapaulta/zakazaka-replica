/*global $*/

$(document).ready(function () {
  'use strict';

  $('input, select').styler();

  var i = $(window).height(), a = $(window).width();
  if ($("input, select").length) {
    $("input, select").styler({
      selectSearch: true,
      singleSelectzIndex: 10,
      selectSmartPositioning: false
    });
  }
  if ($(".modalLink").length) {
    $(".modalLink").modal({
      trigger: ".modalLink",
      olay: ".overlay",
      modals: ".custom-modal",
      animationEffect: "fadeIn",
      animationSpeed: 400,
      moveModalSpeed: "slow",
      background: "2E2F2F",
      opacity: 0.7,
      openOnLoad: false,
      docClose: true,
      closeByEscape: true,
      moveOnScroll: true,
      resizeWindow: false,
      close: ".close-custom-modal, button.grey"
    });
  }

  $(".js-dd-trig").on("click", function () {
    var element = $(this).next(".js-dd");
    if (element.hasClass("open")) {
      element.hide().removeClass("open");
    } else {
      $(".js-dd").hide().removeClass("open");
      element.show().addClass("open");
    }
    return false;
  });

  $(".js-dd-pnt").find(".dropdown-list > li input").on("change", function () {
    var element = $(this).closest("li"),
      name = $(this).attr("name");
    element.parents(".js-dd-pnt").find(".js-dd-trig").find(".place-name").text(element.text());
    $(".js-dd").hide().removeClass("open");
  });

  $(document).on("click", function (element) {
    if ($(element.target).closest(".user-panel .open").length) {
      return;
    }
    $(".user-panel .open").hide().removeClass("open");
    element.stopPropagation();
    if ($(element.target).closest(".place .open").length) {
      return;
    }
    $(".place .open").hide().removeClass("open");
    element.stopPropagation();
    if ($(element.target).closest(".cart-panel .open").length) {
      return;
    }
    $(".cart-panel .open").hide().removeClass("open");
    $(".cart-bkm a").removeClass("active");
    element.stopPropagation();
  });

  /*  TABS  */
  $(".btn-tab").on("click", function (element) {
    element.preventDefault();
    $(this).closest(".btn-tabs").find(".btn-tab").removeClass("active");
    $(this).addClass("active")
      .siblings()
      .removeClass("active")
      .parents()
      .next(".tabs")
      .find(".tab")
      .removeClass("visible")
      .eq($(this).index())
      .addClass("visible")
      .siblings(".tab");
  });

  /*  EXAMPLE SELECT  */
  $(".example a").click(function (element) {
    element.preventDefault();
    $('.kitchens select [value="' + $(this).attr("data-value") + '"]').attr("selected", "selected");
    $(".kitchens select").trigger("change").trigger("refresh");
  });


  /*  CAROUSEL  */
  if ($(".carousel-stock").length) {
    $(".all-stock").bxSlider({
      mode: "horizontal",
      pagerSelector: ".cpager-1",
      pager: !$(".location-stock").length,
      useCSS: false,
      moveSlides: 1,
      minSlides: 4,
      maxSlides: 4,
      infiniteLoop: false,
      slideWidth: 220,
      slideMargin: 11,
      hideControlOnEnd: true,
      speed: 400
    });
  }


  /*  RESTAURANT CAROUSEL  */
  if ($(".restaurant-review").length) {
    $("#js-reviews-mini").bxSlider({pager: false, nextSelector: ".reviews-next", prevSelector: ".reviews-prev", randomStart: true, prevText: "", nextText: ""});
    $(".nav-items a.icon").on("click", function (l) {
      l.preventDefault();
      var k = !$(this).parent().hasClass("selected");
      $(this).closest(".nav-items").find("li.selected").each(function () {
        $(this).removeClass("selected");
        $(this).find("ul").slideUp(200);
      });
      if (k) {
        $(this).parent().addClass("selected");
        $(this).next().stop(true, true).slideToggle(200);
      }
    });
    if ($(".restaurant-menu").length) {
      $(".nav-items a:not(.icon)").on("click", function (l) {
        l.preventDefault();
        $(this).closest(".nav-items").find("li.selected").each(function () {
          $(this).removeClass("selected");
        });
        $(this).parent().addClass("selected");
        if ($(this).closest("ul").hasClass("nav-sub-items")) {
          $(this).closest("ul").closest("li").addClass("selected");
        } else {
          $(".nav-sub-items:visible").each(function () {
            $(this).slideUp(200);
          });
        }
        var k = $(this).attr("href");
        getUrl(k, false);
      });
    }
  }

});

function userLogin() {
  var a = {};
  $("#msignin input").each(function () {
    if ($(this).val() === "") {
      return false;
    }
    a[$(this).attr("name")] = $(this).val();
  });
  $.post("/ajax?action=userLogin", a, function (b) {
    if (b === "true") {
      location.reload();
    } else {
      if (b === "false") {
        b = "Произошла ошибка, <br> попробуйте повторить запрос.";
      }
      $(".authoriz a.signin").click();
      $("#msignin .registration").hide();
      $("#msignin .error").html(b);
      $("#msignin .error").slideDown();
    }
  });
  $("#mloader .modalLink").click();
  return false;
}

function restSearchForm(a) {
  return makeSearch("/restaurants", a);
}
function foodSearchForm(a) {
  return makeSearch("/food", a);
}
function makeSearch(c, f) {
  var d = $('#searchForm select[name="cuisine"]').val();
  if (d !== "") {
    c += "/" + d;
  }
  var g = $("#selectDistr input:checked").attr("data-code");
  if (g !== undefined) {
    c += (d === "" ? "/all/" : "/") + g;
  }
  var e = [];
  $("#searchForm select, #searchForm input:checked").each(function () {
    if ($(this).attr("name") === "cuisine" || $(this).attr("name") === "work") {
      return;
    }
    if ($(this).val() === "") {
      return;
    }
    e.push($(this).attr("name") + "=" + $(this).val());
  });
  var b = $('#searchForm input[name="work"]');
  if ($(b).length && !$(b).is(":checked")) {
    e.push("work=all");
  }
  if (e.length > 0) {
    c += "?" + e.join("&");
  }
  var $cuisineName = $("#cuisineName");

  if ($cuisineName.length) {
    var a = $('#searchForm select[name="cuisine"] option:selected').text();
    if (a === "-----") {
      $cuisineName.hide();
      $cuisineName.prev().hide();
    } else {
      $cuisineName.show();
      $cuisineName.prev().show();
      $cuisineName.text(a);
    }
  }
  if (f) {
    getUrl(c, false);
  } else {
    window.location = c;
  }
  return false;
}
function addReview(b) {
  var a = $("#mreview textarea").val();
  if (a !== "") {
    $("#mloader a").click();
    $.post("/ajax?action=addReview", {id: b, text: a}, function (e) {
      var c = $("#mreview").attr("data-link");
      if (c !== "") {
        window.location = c;
      } else {
        location.reload();
      }
    });
  }
  return false;
}

function decOfNum(a, b) {
  var cases = [2, 0, 1, 1, 1, 2];
  return b[(a % 100 > 4 && a % 100 < 20) ? 2 : cases[(a % 10 < 5) ? a % 10 : 5]];
}
function isHhistoryApiAvailable() {
  return !!(window.history && history.pushState);
}
function getUrl(b, a) {
  if (isHhistoryApiAvailable) {
    if (b !== window.location || a) {
      $.get(b, {ajax: 1}, function (c) {
        if (!a) {
          window.history.pushState(null, null, b);
        }
        $("#contentBox").html(c);
        if ($("#contentBox input, #contentBox select").length) {
          $("#contentBox input, #contentBox select").styler({selectSearch: false, singleSelectzIndex: 10});
        }
      });
    }
  } else {
    window.location = b;
  }
  return false;
}

function addToCart(d, b) {
  if (checkDistrict()) {
    var f = $(d).attr("data-id");
    $.get("/ajax?action=addToCart&id=" + f + "&type=" + b + "&r=" + Math.random(), function (g) {
      if (g !== "false") {
        var data = g.split(":");
        if (data.length > 1) {
          $("#cart-panel .cart-food span").text(data[0]);
          $("#cart-panel .cart-price span").text(data[1]);
        }
      }
    });
    $("#cart-panel").slideDown();
    var a = $(d).find("img").clone().addClass("move-img");
    $("body").append(a);
    var c = $(d).find("img").offset(), e = $("#cart-panel").find(".cart-link").offset();
    a.css({position: "absolute", top: c.top, left: c.left, opacity: 0.8, "border-radius": "0", "z-index": 1000});
    a.animate({left: e.left, top: e.top, opacity: 0, width: 50, height: 50, borderRadius: "50%"}, 500, function () {
      $(".move-img").remove();
    });
    if (b === "bonus") {
      $(".b-food-balls").slideUp();
      $("#cart-panel").attr("data-score", "1");
    }
  }
}

function checkDistrict() {
  return true;
}
function selectDistrict() {
  var a = parseInt($("#mdistrict select").val(), 10);
  $.cookie("zakaDistrict", a, {expires: 365, path: "/"});
  $("#mloader a").click();
  location.reload();
}
function orderForm(d, b) {
  if (checkDistrict()) {
    if (b === 1) {
      $("#morder .briefly").hide();
      $("#morder .extended").show();
      $('#morder input[name="street"]').prop("required", true);
      $('#morder input[name="home"]').prop("required", true);
      $('#morder input[name="address"]').prop("required", false);
    } else {
      $("#morder .briefly").show();
      $("#morder .extended").hide();
      $('#morder input[name="street"]').prop("required", false);
      $('#morder input[name="home"]').prop("required", false);
      $('#morder input[name="address"]').prop("required", true);
    }
    var a = parseInt($("#org" + d + " .total-price span").text(), 10);
    var c = Math.floor(a / 10);
    $("#form-summa").text(a + " " + decOfNum(a, ["рубль", "рубля", "рублей"]));
    $("#form-bonus").text(c + " " + decOfNum(c, ["балл", "балла", "баллов"]));
    $('#morder input[name="org"]').val(d);
    $("#order").click();
  }
}
