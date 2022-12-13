$(document).ready(function() {

    $('.slider').slick({
        speed: 2200
    });

    $('.whatwedo__accord_title').click(function(e) {
        if($('.whatwedo__accord_content').hasClass('one')) {
            $('.whatwedo__accord_title').not($(this)).removeClass('active');
            $('.whatwedo__accord_text').removeClass('active');
            $('.whatwedo__accord_text').not($(this).next()).slideUp(500);

        }
        $(this).toggleClass('active').next().slideToggle(500);
    });



});

window.addEventListener('DOMContentLoaded', () => {

    
    const forms = (s) => {
        const form = document.querySelectorAll('.footer__item_form'),
              wrapper = document.querySelector('.footer__message'),
              input = document.querySelectorAll('.footer__subscribe_input');
        message = {
            loading: "Loading...",
            success: "Thanks! We will keep in touch",
            failure: "Something going wrong..."
        };
        const clearInput = () => {
            input.forEach(item => {
                item.value = "";
            });
        };
        clearInput();

        const postData = async (url, data) => {
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
            return await res.text();
        };
        
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                font-family: 'RobotoCondensed', sans-serif;
                font-size: 1.5em;
                font-weight: 400;
                letter-spacing: 2px;
                color: #000;
                transform: translateY(-2em);

                `;
                
                wrapper.appendChild(statusMessage);
                statusMessage.textContent=message.loading;
                const formData = new FormData(item);
                postData('./server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent=message.success;
                })
                .catch(() => {
                    statusMessage.textContent=message.failure;
                })
                .finally(() => {
                    clearInput();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });                    
            });
        });
    };

    let modalState = {};
    forms(modalState);
});




