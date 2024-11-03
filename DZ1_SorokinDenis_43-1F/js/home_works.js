document.getElementById('gmail_button').addEventListener('click', function() {
    const gmailInput = document.getElementById('gmail_input').value;
    const gmailResult = document.getElementById('gmail_result');
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailRegex.test(gmailInput)) {
        gmailResult.textContent = "Правильный Gmail.";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Неправильны Gmail. Введите снова.";
        gmailResult.style.color = "red";
    }
});

function moveBlock(position = 0) {
    const parentBlock = document.querySelector('.parent_block');
    const childBlock = document.querySelector('.child_block');

    const parentWidth = parentBlock.offsetWidth;
    const childWidth = childBlock.offsetWidth;

    if (position + childWidth < parentWidth) {
        childBlock.style.left = `${position}px`;

        setTimeout(() => moveBlock(position + 5), 20);
    }
}

moveBlock();
