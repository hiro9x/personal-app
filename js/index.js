$('.side-bar__item').click(function(){
    //remove class 'side-bar__item--active' cho tat ca class 'side-bar__item'
    $('.side-bar__item').removeClass('side-bar__item--active');
    //add class 'side-bar__item--active' khi click
    $(this).addClass('side-bar__item--active');

    let $indicator = $('.side-bar__indicator');
    //offset: lay toa do cua class 'side-bar__item'
    let previousOffset = $indicator.parent('.side-bar__item').offset();
    //offset: lay toa do cua class khi click vao
    let currentOffset = $(this).offset();
    //khoang cach tinh theo 'top' giua 2 class
    let distance = currentOffset.top - previousOffset.top;
    //transform css
    $indicator.css('transform','translateY('+ distance +'px)');
});
//Tạo hàm function 'switchButton'
$.fn.switchButton = function(){
    let $switchButtons = this
    let $switchButtonReplaced = $();

    $switchButtons.each(function(){
        let $switchButton = $('<div class="switch-button"></div>')
        let $input = $('<input type="hidden">').val($(this).val())
        let $label = $('<labe class="switch-button__label"></labe>').text('OFF')
        let $background = $('<span class="switch-button__background"></span>')
        let $indicator = $(' <span class="switch-button__indicator"></span>')

        $indicator.appendTo($background) //class indicator là con của class background
        
        $input.appendTo($switchButton)
        $label.appendTo($switchButton)
        $background.appendTo($switchButton)

        $(this).replaceWith($switchButton)
        $switchButtonReplaced = $switchButtonReplaced.add($switchButton)

        $switchButton.click(function(){
            let $input = $(this).children('input') //dẫn tới thẻ input con
            let $label = $(this).children('.switch-button__label') //dẫn tới class con

            let value = $input.val()

            if(value === 'true'){
                $label.text('OFF')
                $input.val('false')
            } else {
                $label.text('ON')
                $input.val('true')
            }

            $switchButton.trigger('change',$input.val())
        })
    })
    return $switchButtonReplaced
}

$.fn.switchCard = function(){
    let  $cards = this
    //chạy hàm function 'switchButton()' sau class '.switch-button'
    let $switchButton = $cards.find('.switch-button').switchButton() 
    $switchButton.on('change', function(e, value){
        let switchButton = this

        $cards.each(function(index, card){
            if(card.contains(switchButton)){
                let $card = $(card)
                if(value === 'true'){
                    $card.addClass('mcard--active')
                } else {
                    $card.removeClass('mcard--active')
                }
            }
        })

    })
}

//chạy hàm function 'switchCard' sau class '.mcard'
$('.mcard').switchCard()
//chạy hàm function 'switchButton' sau class '.switch-button'
$('.living-room-temperature .switch-button').switchButton()