var button_size_s = document.querySelector('.product__option_size_s'),
    button_size_m = document.querySelector('.product__option_size_m'),
    button_size_l = document.querySelector('.product__option_size_l'),

    button_color_white = document.querySelector('.product__option_color_white'),
    button_color_green = document.querySelector('.product__option_color_green'),
    button_color_yellow = document.querySelector('.product__option_color_yellow'),

    img_color_white = document.querySelector('.product__image_color_white'),
    img_color_green = document.querySelector('.product__image_color_green'),
    img_color_yellow = document.querySelector('.product__image_color_yellow'),

    button_menu = document.querySelector('.nav-button'),

    nav_strip = document.querySelector('.nav-strip');

button_size_s.onclick = button_size_m.onclick = button_size_l.onclick = changeProductSize;
button_color_white.onclick = button_color_green.onclick = button_color_yellow.onclick = changeProductColor;
button_menu.onclick = toggleMenu;

function changeProductSize(event){
    var el = event.target;
    if(!el.classList.contains('product__option_selected')) {
        [button_size_s, button_size_m, button_size_l].forEach(function(el){
            el.classList.remove('product__option_selected');
        });
        el.classList.add('product__option_selected');
    }
}

function changeProductColor(event){
    var el = event.target;
    if(!el.classList.contains('product__option_selected')) {
        [button_color_white, button_color_green, button_color_yellow].forEach(function(el){
            el.classList.remove('product__option_selected');
        });
        el.classList.add('product__option_selected');

        [img_color_white, img_color_green, img_color_yellow].forEach(function(el){
            el.classList.remove('product__image_selected');
        });

        color_value = el.classList[1].substring(22);
        document.querySelector('.product__image_color_' + color_value).classList.add('product__image_selected')
    }
}

function toggleMenu(){
    nav_strip.classList.toggle('nav-strip_open');
}
