var selectedPlayer = [];

const buttons = document.querySelectorAll('.selector');

buttons[0].addEventListener('click', () => {
    buttons[0].style.background = '#A8BFC9';
    buttons[0].style.color= '#1A2A33';

    buttons[1].style.background = '#1A2A33';
    buttons[1].style.color = '#A8BFC9';
    selectedPlayer.push(1);
})

buttons[1].addEventListener('click', () => {
    buttons[1].style.background = '#A8BFC9';
    buttons[1].style.color= '#1A2A33';

    buttons[0].style.background = '#1A2A33';
    buttons[0].style.color = '#A8BFC9';
    selectedPlayer.push(0);
    
})

const startGameWithCpu = document.querySelector(".first-button");
startGameWithCpu.addEventListener("click", () => {
    localStorage.setItem("selectedPlayer.pop()", JSON.stringify(selectedPlayer.pop()));
    window.open("index2.html", "_self");
});

