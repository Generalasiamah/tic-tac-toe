const buttons = document.querySelectorAll('.selector');

buttons[0].addEventListener('click', () => {
    buttons[0].style.background = '#A8BFC9';
    buttons[0].style.color= '#1A2A33';

    buttons[1].style.background = '#1A2A33';
    buttons[1].style.color = '#A8BFC9'
})

buttons[1].addEventListener('click', () => {
    buttons[1].style.background = '#A8BFC9';
    buttons[1].style.color= '#1A2A33';

    buttons[0].style.background = '#1A2A33';
    buttons[0].style.color = '#A8BFC9'
})
