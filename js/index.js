$(function(){
	$(".menu").click(function(){
//		alert(1);
		if($('.hidemenu').is(':hidden')){//如果当前隐藏
			$('.hidemenu').show();//那么就显示div
		}else{//否则
			$('.hidemenu').hide();//就隐藏div
		}
		$(".nav").animate({
		    right:'-10rem'
		  });
    })
	$(".close").click(function(){
		$('.hidemenu').hide();//隐藏div
		$(".nav").animate({
		    right:'3rem'
		  });
	})
	
    var list=$('.item')
    $(list[0]).addClass('first')
    $(list[1]).addClass('sec')
    $(list[2]).addClass('three')
    var clicked=function(){
    var flag=true
    var timer=null
    $('.prev_btn').click(function(){
        if(flag){
            flag=false
            if($('.sec').next().length==0){
                $(list[0]).removeClass('three').addClass('sec')
                $(list[1]).removeClass('first').addClass('three')
                $(list[2]).removeClass('sec').addClass('first')
            }else{   
                if($('.first').next().length==0){
                    $('.sec').removeClass('sec').removeClass('ready2').addClass('first').next().removeClass('three').addClass('sec')
                    $(list[2]).removeClass('first').addClass('three')
                }else{
                    $('.sec').removeClass('sec').removeClass('ready2').addClass('first').next().removeClass('three').addClass('sec')
                    .prev().prev().removeClass('first').addClass('three')
                }
            }
            $($('.sec').children().children()[0]).addClass('zindex')
            var img=$('.sec').next().children().children()[0]
            var order=$('.sec').next().siblings()
            if($('.sec').next().length==0){
                img=$(list[0]).children().children()[0]
                order=$(list[0]).siblings()
            }
            $(img).removeClass('zindex')
            for(var item of order){
                $($(item).children().children[0]).addClass('zindex')
            } 

            timer=setTimeout(() => {
                flag=true
            }, 500);

        }
    })
   
    $('.next_btn').click(function(){
        if(flag){
            flag=false
            $($('.sec').children().children()[0]).removeClass('zindex') 
            var sib=$('.sec').siblings()
            for(var item of sib){                    
                $($(item).children().children[0]).addClass('zindex')
                var one=$(item).children().children()[0] 
                $(one).addClass('zindex')
            }
            if($('.sec').prev().length==0){     
                $(list[0]).removeClass('sec').addClass('three')
                $(list[1]).removeClass('three').addClass('first')
                $(list[2]).removeClass('first').addClass('sec')
                
            }else{   
                if($('.three').prev().length==0){
                    $('.sec').removeClass('sec').removeClass('ready2').addClass('three').prev().removeClass('first').addClass('sec')
                    $(list[0]).removeClass('three').addClass('first')
                }else{ 
                    $('.sec').removeClass('sec').removeClass('ready2').addClass('three').prev().removeClass('first').addClass('sec')
                    .next().next().removeClass('three').addClass('first')
                }
            }
            timer=setTimeout(() => {
                flag=true
            }, 500);
        }
       
    })
    clearTimeout(timer)
}
clicked()   

})

