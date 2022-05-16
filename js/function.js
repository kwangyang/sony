$(function(){

    const $gnb = $('#wrap > header > .container > nav > .gnb');
    const  $gnbmnu = $('.gnb>li');
    const $mnu_srv = $('.gnb>li>a');

    const $lnb = $gnb.find('.lnb');
    const $bg_lnb = $('.bg_lnb');

    let mnuIdx = null;

  
    $gnb.on('mouseenter', function(){
    // $gnbmnu.on('mouseenter', function(){

        $gnbmnu.hover(
            // mouseenter효과
            function(){
                  mnuIdx = $gnbmnu.index(this);
                  console.log(mnuIdx);

              // 활성화 css
              $gnbmnu.eq(mnuIdx).css({
                width: '220px',
                height: '500px',
                backgroundColor: 'rgba(32, 32, 32, 0.863)'
              });

              $gnbmnu.eq(mnuIdx).children('a').css({
                  color:"rgb(51, 83, 247)",
                borderBottom: "2px solid rgb(51, 83, 247)"
              }).fadeIn(100);

              $bg_lnb.stop().slideDown(50);//배경판 노출
              $lnb.stop().slideDown(50);//서브메뉴 노출   
            }
            ,
        
            // mouseleave효과
             function(){
                $gnbmnu.eq(mnuIdx).css({
                    width: '220px',
                    height: '500px',
                    backgroundColor: 'initial'
                  });

                $gnbmnu.eq(mnuIdx).children('a').css({
                    color:"white",
                    borderBottom: "none"
                  });
             }
             );           
    });
  
    // $gnb.on('mouseleave', function(){
    $gnb.on('mouseleave', function(){
        $lnb.stop().slideUp(50);
        $bg_lnb.stop().slideUp(50);
    });

   // ---------------------------------------------------
  
    $bg_lnb.on('mouseover', function(){
        $gnb.trigger('mouseover');
    });

    $bg_lnb.on('mouseout', function(){
        $gnb.trigger('mouseout');        
    });


   // --------------------------------------------------- ◆ section-visual slide ◆

  // const $indicator = $('.slides > .slides-pagination > li > a');
	const $slides = $('.slides > .slides-container > p');

	const $btnPrev = $('.prev');
	const $btnNext = $('.next');

  const $current = $('.slides>.progress>.current');
	const $bar = $('.slides>.progress>.bar');

	let intervalKey = null;

  let nowIdx = 0; //인디케이터를 기준으로 0~8
	// let nowIdx = Math.floor(Math.random()*5); //인디케이터를 기준으로 0~4 랜덤 추출

	//초기화 작업 
	$slides.eq(nowIdx).show();

	const fadeFn = function(){
		
		//슬라이드 처리
		$slides.eq(nowIdx).fadeIn(1000).siblings().fadeOut(1000);
	};

	//다음버튼에 대한 클릭이벤트 구문
	$btnNext.on('click', function(evt){
		evt.preventDefault();

    if (nowIdx < 4) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}

		$current.text('No.0' + (nowIdx + 1));

		$bar.width(0).stop().animate({
			width: 40
		}, 2000, function() {
		});

		fadeFn();//인디케이터 활성화, 슬라이드 처리 함수호출
		
	});

	//이전버튼에 대한 클릭이벤트 구문
	$btnPrev.on('click', function(evt){
		evt.preventDefault();
		
		// if(nowIdx>0){
		// 	nowIdx--;
		// }else{
		// 	nowIdx = $indicator.length-1;			
		// }

    if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = 4;
		}

		$current.text('No.0' + (nowIdx + 1));

		$bar.width(0).stop().animate({
			width: 40
		}, 2000, function() {
			//$bar.width(0);
		});

		fadeFn();//인디케이터 활성화, 슬라이드 처리 함수호출

	});

	// clearInterval(intervalKey);
	// intervalKey = setInterval(function() {
	// 	$btnNext.click();
	// }, 4000);

});


  // --------------------------------------------------------------------------

  $(function(){

// half-slide

  // 움직일 컨테이너 안에
  const $halfContainer = $('#half-slide > #slides > .screen > .right-container');
  // 다섯장의 슬라이드
  const $halfSlides = $halfContainer.children('li');

  const $display = $('#half-slide > #leftslide > .showbox > #display ');
  const $displaySlides = $display.children('li');


  // const $displaySlides = $('#half-slide > #leftslide > .showbox > #display > li');

  // --------------------------------------

  // next,prev 버튼
  const $halfNext = $(' #half-slide > #slides > a.next');

  // ----------------------------------------

  // 지금 class.on 가 붙은 최초로 보여지는 큰 거
  let halfnowIdx = 0;

  // 잠그기(실행되기전에 다른게 실행 못하게)
  let halflock = false;

  // ----------------------------------------

  $halfSlides.children('a').on('click', function(evt){
    evt.preventDefault();
  });
  
  // 다음버튼

  $halfNext.on('click', function(evt){
    evt.preventDefault();

    if(halflock===false){ //잠겨있지 않으면
      halflock = true; //잠근다
      
      // index 추출
    if(halfnowIdx < 3){
      halfnowIdx++;
    }else{
      halfnowIdx = 0;   
    }
    
    // // class on 다음 활성화된 애 한테
    // $halfSlides.removeClass('on').eq(halfnowIdx).addClass('on');
    
    // 컨테이너의 슬라이드 
    $halfContainer.stop().animate({
      left: 0
      
    }, 400, function(){
      $('#half-slide > #slides > .screen > .right-container > li').first().appendTo($halfContainer);

     // class on 다음 활성화된 애 한테
    $halfSlides.removeClass('on').eq(halfnowIdx).addClass('on');
      
        halflock = false; 
      });
      
      $displaySlides.removeClass('on').eq(halfnowIdx).addClass('on');
      
      $display.stop().animate({
        // left : -(100*halfnowIdx)+'%'
        left: -(100*halfnowIdx) + '%' * 4
      
    }, 400, function(){
      $('#half-slide > #leftslide > .showbox > #display > li').first().appendTo($display);
      $display.css({
        left : -(100*halfnowIdx)+'%'
      });

      halflock = false; 
    });
  }
});

// --------------------------------------------------------------------------

// 움직일 컨테이너 안에
const $itemContainer = $('#product > .bannerbg #frame-slide > .frame > .item-container');
// 다섯장의 슬라이드
const $itemSlides = $itemContainer.children('li');

// --------------------------------------

// next,prev 버튼
const $itemNext = $(' #product > .bannerbg > a.next');
const $itemPrev = $(' #product > .bannerbg > a.prev');

// ----------------------------------------

// 지금 class.on 가 붙은 최초로 보여지는 큰 거
let itemnowIdx = 0;

// 잠그기(실행되기전에 다른게 실행 못하게)
let itemlock = false;

// ----------------------------------------

// 다음버튼

$itemNext.on('click', function(evt){
  evt.preventDefault();

  if(itemlock===false){ //잠겨있지 않으면
    itemlock = true; //잠근다
    
    // index 추출
  if(itemnowIdx < 1){
    itemnowIdx++;
  }else{
    itemnowIdx = 0;   
  }
  
  // class on 다음 활성화된 애 한테
  $itemSlides.removeClass('on').eq(itemnowIdx).addClass('on');
  
  // 컨테이너의 슬라이드 
  $itemContainer.stop().animate({
    left: 0 
    
  },function(){

    $('#product > .bannerbg > #frame-slide > .frame > .item-container > li').first().appendTo($itemContainer);

    // $itemContainer.css({ left: -400 });
    
      itemlock = false; 
    });
  }
});


$itemPrev.on('click', function(evt){
  evt.preventDefault();

  if(itemlock===false){ //잠겨있지 않으면
    itemlock = true; //잠근다
    
    // index 추출
  if(itemnowIdx > 0){
    itemnowIdx--;
  }else{
    itemnowIdx = 1;   
  }
  
  // class on 다음 활성화된 애 한테
  $itemSlides.removeClass('on').eq(itemnowIdx).addClass('on');
  
  // 컨테이너의 슬라이드 
  $itemContainer.stop().animate({
    left: 0
    
  },function(){

    $('#product > .bannerbg > #frame-slide > .frame > .item-container > li').first().appendTo($itemContainer);
    
      itemlock = false; 
    });
  }
});



const $btnshow = $('button').first();
const $hide = $('.hide');

$btnshow.on('click', function(evt){
  // alert('000');
  evt.preventDefault();
  $hide.fadeToggle(100);
});

    
  });