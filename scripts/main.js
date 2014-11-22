/*global $*/

$(document).ready(function(){
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

  $(".js-dd-trig").on("click", function() {
    var element = $(this).next(".js-dd");
    if (element.hasClass("open")) {
      element.hide().removeClass("open");
    } else {
      $(".js-dd").hide().removeClass("open");
      element.show().addClass("open");
    }
    return false;
  });

  $(".js-dd-pnt").find(".dropdown-list > li input").on("change", function() {
    var element = $(this).closest("li"),
      name = $(this).attr("name");
    element.parents(".js-dd-pnt").find(".js-dd-trig").find(".place-name").text(element.text());
    $(".js-dd").hide().removeClass("open");
  });

  $(document).on("click", function(element) {
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
  $(".btn-tab").on("click", function(element) {
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
  $(".example a").click(function(element) {
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


});


function userLogin() {
  var a = {};
  $("#msignin input").each(function() {
    if ($(this).val() === "") {
      return false;
    }
    a[$(this).attr("name")] = $(this).val();
  });
  $.post("/ajax?action=userLogin", a, function(b) {
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
  $("#searchForm select, #searchForm input:checked").each(function() {
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
    $.post("/ajax?action=addReview", {id: b,text: a}, function(e) {
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
      $.get(b, {ajax: 1}, function(c) {
        if (!a) {
          window.history.pushState(null, null, b);
        }
        $("#contentBox").html(c);
        if ($("#contentBox input, #contentBox select").length) {
          $("#contentBox input, #contentBox select").styler({selectSearch: false,singleSelectzIndex: 10});
        }
      });
    }
  } else {
    window.location = b;
  }
  return false;
}