$(document).ready(function(){
  $('.carousel__iner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="../img/left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../img/right.png"></button>',
      responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,              
              }
          },
          {
            breakpoint: 768,
            settings: {
              autoplay: true,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              autoplay: true,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
      ]
      
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e){
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };
  
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

    //Modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thx').fadeOut();
  });


  $('[data-modal=thx]').on('click', function(){
    $('.overlay, #order').fadeOut();
    $('.overlay, #thx').fadeIn();
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function(){
      $('#order .modal__descr ').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })

  })

  $('input[name=phone]').mask('+7(999) 999-99-99');

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url:"mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $(' #consultation, #order').fadeOut();
      $('.overlay, #thx').fadeIn('slow');
      $('form').trigger('rest');


    });
    return false;
  });

    //slow page up11

  $(window).scroll(function(){

    if ($(this).scrollTop()>1600) {
      $('.goup').fadeIn();
    } else{
      $('.goup').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

});