/*global $*/

$(document).ready(function(){
  'use strict';

  $('input, select').styler();

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


