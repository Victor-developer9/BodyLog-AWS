const today = new Date();

const yyyy = today.getFullYear();

const mm = String(today.getMonth() + 1).padStart(2, "0");

const dd = String(today.getDate()).padStart(2, "0");

document.getElementById("date").value =
`${yyyy}-${mm}-${dd}`;

const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function () {

    const date = document.getElementById("date").value;
    const weight = document.getElementById("weight").value;
    const steps = document.getElementById("steps").value;
    const sleep = document.getElementById("sleep").value;

    console.log("日付：" + date);
    console.log("体重：" + weight);
    console.log("歩数：" + steps);
    console.log("睡眠：" + sleep);

});