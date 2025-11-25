var loading = document.querySelector(".loader")
// console.log('연결됬니?')

window.addEventListener("load", vanish);

function vanish() {
    loading.classList.add("disppear");
}