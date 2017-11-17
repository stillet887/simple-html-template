const Dispatcher = document.getElementById('dispatcher');
const productImage = document.querySelector('.product__image');
const productPrice = document.querySelector('.product__price');
const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-strip');

class PropertySelector {
    constructor(el) {
        this.el = el;
        const options = el.querySelectorAll('.product__option');

        this.el.addEventListener('click', ev => {
            if(ev.target.classList.contains('product__option')) {
                options.forEach(option => {
                    option.classList.remove('product__option_checked');
                });

                ev.target.classList.add('product__option_checked');

                const type = ev.target.dataset['type'];
                const value = ev.target.dataset['value'];

                this.dispatchEvent(type, value);
            }
        });
    }

    dispatchEvent(type, value) {
        const event = new CustomEvent('property-selected', {
            detail: {
                type: type,
                value: value
            }
        });
        Dispatcher.dispatchEvent(event);
    }
}

new PropertySelector(document.querySelector('.product__colors'));
new PropertySelector(document.querySelector('.product__sizes'));

Dispatcher.addEventListener('property-selected', ev => {
    const data = ev.detail;

    if (data.type === 'color') {
        changePicture(data.value);
    }

    if (data.type === 'size') {
        changePrice(data.value);
    }
});

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('nav-strip_open');
});

function changePrice(size) {
    const prices = {
        s: 1500,
        m: 1600,
        l: 1700
    };
    productPrice.innerHTML = prices[size] + '&#8381;';
}

function changePicture(color) {
    productImage.src = 'img/tshirts/tshirt_' + color + '.jpg';
}
