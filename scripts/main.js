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
});


