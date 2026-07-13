// グローバル変数
let editingId = null;

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
        id: editingId,
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

    const method = editingId ? "PUT" : "POST";
    
    fetch("https://zqfps20hwg.execute-api.ap-northeast-1.amazonaws.com/bodylog", {

    method: method,

    headers: {
        "Content-Type": "application/json"
    },

    body: jsonData

})
.then(function(response) {

    console.log(response);

    loadBodyLogs();

    clearForm();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

})

.catch(function(error) {
    console.log(error);
});

});

async function loadBodyLogs() {

    const response = await fetch(
        "https://zqfps20hwg.execute-api.ap-northeast-1.amazonaws.com/bodylog"
    );

    const data = await response.json();

    console.log(data);

    // 日付を取得
    const labels = data.map(item => item.date);

    // 体重を取得
    const weights = data.map(item => Number(item.weight));

    const list = document.getElementById("bodylogList");

    list.innerHTML = "";

    for (const item of data) {

    const div = document.createElement("div");

    div.innerHTML = `
    <h3>${item.date}</h3>

    <p><strong>体重：</strong>${item.weight} kg</p>

    <p><strong>歩数：</strong>${item.steps} 歩</p>

    <p><strong>睡眠：</strong>${item.sleep}</p>

    <h4>朝食</h4>

    <ul>
    ${(item.breakfast || []).map(food => `<li>${food}</li>`).join("")}
    </ul>
    
    <hr>

    <h4>昼食</h4>

    <ul>
    ${(item.lunch || []).map(food => `<li>${food}</li>`).join("")}
    </ul>
    
    <hr>

    <h4>夕食</h4>

    <ul>
    ${(item.dinner || []).map(food => `<li>${food}</li>`).join("")}
    </ul>

    <hr>

    <h4>間食</h4>

    <ul>
    ${(item.snack || []).map(food => `<li>${food}</li>`).join("")}
    </ul>

    <hr>

    <h4>メモ</h4>

    <p>${item.memo || ""}</p>

    <button class="editButton">編集</button>

    <button class="deleteButton" data-id="${item.id}">削除</button>

    <hr>
    `;

    list.appendChild(div);

    const editButton = div.querySelector(".editButton");

    editButton.addEventListener("click", function () {

    editingId = item.id;

        // 基本情報
    document.getElementById("date").value = item.date;
    document.getElementById("weight").value = item.weight;
    document.getElementById("steps").value = item.steps;
    document.getElementById("sleep").value = item.sleep;

    // 朝食
    document.getElementById("breakfast1").value = item.breakfast[0];
    document.getElementById("breakfast2").value = item.breakfast[1];
    document.getElementById("breakfast3").value = item.breakfast[2];
    document.getElementById("breakfast4").value = item.breakfast[3];
    document.getElementById("breakfast5").value = item.breakfast[4];
    document.getElementById("breakfast6").value = item.breakfast[5];

    // 昼食
    document.getElementById("lunch1").value = item.lunch[0];
    document.getElementById("lunch2").value = item.lunch[1];
    document.getElementById("lunch3").value = item.lunch[2];
    document.getElementById("lunch4").value = item.lunch[3];
    document.getElementById("lunch5").value = item.lunch[4];
    document.getElementById("lunch6").value = item.lunch[5];

    // 夕食
    document.getElementById("dinner1").value = item.dinner[0];
    document.getElementById("dinner2").value = item.dinner[1];
    document.getElementById("dinner3").value = item.dinner[2];
    document.getElementById("dinner4").value = item.dinner[3];
    document.getElementById("dinner5").value = item.dinner[4];
    document.getElementById("dinner6").value = item.dinner[5];

    // 間食
    document.getElementById("snack1").value = item.snack[0];
    document.getElementById("snack2").value = item.snack[1];
    document.getElementById("snack3").value = item.snack[2];
    document.getElementById("snack4").value = item.snack[3];
    document.getElementById("snack5").value = item.snack[4];
    document.getElementById("snack6").value = item.snack[5];

    // メモ
    document.getElementById("memo").value = item.memo;
    
    // ボタン表示を変更
    saveButton.textContent = "更新";

});

    const deleteButton = div.querySelector(".deleteButton");

    deleteButton.addEventListener("click", async function () {

    const response = await fetch(
        "https://zqfps20hwg.execute-api.ap-northeast-1.amazonaws.com/bodylog",
        {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: item.id
            })
        }
    );

    console.log(response);

});

}

    const ctx = document.getElementById("weightChart");

    if (weightChart) {
        weightChart.destroy();
    }

    weightChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "体重 (kg)",
                data: weights,
                borderWidth: 2,
                tension: 0.3
            }]
        }
    });

}

loadBodyLogs();

function clearForm() {

    editingId = null;

    document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;
    document.getElementById("weight").value = "";
    document.getElementById("steps").value = "";
    document.getElementById("sleep").value = "";

    // 朝食
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`breakfast${i}`).value = "";
    }

    // 昼食
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`lunch${i}`).value = "";
    }

    // 夕食
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`dinner${i}`).value = "";
    }

    // 間食
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`snack${i}`).value = "";
    }

    document.getElementById("memo").value = "";

    // ボタン表示を戻す
saveButton.textContent = "保存";
}