document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
        button.classList.remove('active');
    });


    event.target.classList.add('active');

 
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'flex'; 
        } else if (item.classList.contains(category)) {
            item.style.display = 'flex'; 
        } else {
            item.style.display = 'none'; 
        }
    });


    applyUniformHeight();
}

function applyUniformHeight() {
    const items = document.querySelectorAll('.menu-item');
    let maxHeight = 0;


    items.forEach(item => {
        item.style.height = 'auto';
    });

    
    items.forEach(item => {
        if (item.style.display !== 'none') {
            const itemHeight = item.offsetHeight;
            if (itemHeight > maxHeight) {
                maxHeight = itemHeight;
            }
        }
    });


    items.forEach(item => {
        if (item.style.display !== 'none') {
            item.style.height = `${maxHeight}px`;
        }
    });
}


window.onload = function() {
    filterMenu('all');
    applyUniformHeight();
};


window.onresize = function() {
    applyUniformHeight();
};


window.addEventListener('scroll', function () {
    const aboutSection = document.querySelector('.about-us');
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (sectionPosition < screenPosition) {
        aboutSection.classList.add('show');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice, quantity: 1 };

 
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
       
        cart[existingProductIndex].quantity += 1;
    } else {
        
        cart.push(product);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to the cart!`);
}

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';


    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: €${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });


    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: €${total.toFixed(2)}`;
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); 
}


window.onload = function() {
    displayCart();
};
