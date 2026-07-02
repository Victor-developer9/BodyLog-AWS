// 今日の日付を自動入力
const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;


// 保存ボタンを取得
const saveButton = document.getElementById("saveButton");


// 保存ボタンが押された時の処理
saveButton.addEventListener("click", function () {

    // 基本情報
    const date = document.getElementById("date").value;
    const weight = document.getElementById("weight").value;
    const steps = document.getElementById("steps").value;
    const sleep = document.getElementById("sleep").value;


    // 朝食
    const breakfast = [
        document.getElementById("breakfast1").value,
        document.getElementById("breakfast2").value,
        document.getElementById("breakfast3").value,
        document.getElementById("breakfast4").value,
        document.getElementById("breakfast5").value,
        document.getElementById("breakfast6").value
    ];


    // 昼食
    const lunch = [
        document.getElementById("lunch1").value,
        document.getElementById("lunch2").value,
        document.getElementById("lunch3").value,
        document.getElementById("lunch4").value,
        document.getElementById("lunch5").value,
        document.getElementById("lunch6").value
    ];


    // 夕食
    const dinner = [
        document.getElementById("dinner1").value,
        document.getElementById("dinner2").value,
        document.getElementById("dinner3").value,
        document.getElementById("dinner4").value,
        document.getElementById("dinner5").value,
        document.getElementById("dinner6").value
    ];


    // 間食
    const snack = [
        document.getElementById("snack1").value,
        document.getElementById("snack2").value,
        document.getElementById("snack3").value,
        document.getElementById("snack4").value,
        document.getElementById("snack5").value,
        document.getElementById("snack6").value
    ];


    // メモ
    const memo = document.getElementById("memo").value;


    // BodyLogオブジェクト作成
    const bodyLog = {
        date: date,
        weight: weight,
        steps: steps,
        sleep: sleep,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snack: snack,
        memo: memo
    };


    // 確認用
    console.log(bodyLog);

    const jsonData = JSON.stringify(bodyLog);

    console.log(jsonData);

    fetch("https://zqfps20hwg.execute-api.ap-northeast-1.amazonaws.com/bodylog", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: jsonData

})
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.log(error);
});

});