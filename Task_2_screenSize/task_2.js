const button = document.querySelector("button");

button.onclick = () => {
    alert(`Размер экрана: ${window.screen.width} x ${window.screen.height}`);
}