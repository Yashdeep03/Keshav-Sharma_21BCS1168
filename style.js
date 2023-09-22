const colorInput = document.querySelector("#color-input");
const addColorBtn = document.querySelector("#add-color");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors")) || [];

const copyColor = (elem) => {
    elem.innerText = "Copied";
    navigator.clipboard.writeText(elem.dataset.color);
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColor = () => {
    if (!pickedColors.length) return; 
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color};"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `).join("");
    document.querySelector(".picked-colors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showColor();

const addColor = () => {
    const color = colorInput.value;
    if (!pickedColors.includes(color)) {
        pickedColors.push(color);
        localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
        showColor();
    }
}

const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

addColorBtn.addEventListener("click", addColor);
clearAll.addEventListener("click", clearAllColors);