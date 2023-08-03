let score = 0;

let randomNumber = function (num) {
    return parseInt(Math.random() * num);
}

let fetching = async function () {

    // Wait during fetching data and coverting to json
    let API = await fetch("API.json");
    let data = await API.json();

    // Putting values on html file
    puttingValues(data);
};

let puttingValues = (data) => {

    // Create a random number between 0 to 50
    let random0to50 = randomNumber(50)
    // Create a random number between 0 to 3
    let random0to4 = randomNumber(4);

    // Selection a perticular whole queastion with all data
    let Q = data.results[random0to50]

    // Putting quation on html file
    document.getElementById("question_ht").innerHTML = Q.question;

    // Putting all choices on html file
    allOptions = Q.incorrect_answers;
    correctOption = Q.correct_answer
    allOptions.splice(random0to4, 0, correctOption);
    let areas = document.querySelectorAll(".choose")
    let i = 0;
    Array.from(areas).forEach((e) => {
        e.innerHTML = allOptions[i]
        i++
    })

    // Display hint if someone want
    hint(correctOption)

    // Validate option you select
    validate(random0to4);
}

let hint = (correct) => {
    document.getElementById("hint").addEventListener("click", (e) => {
        alert(correct);
    })
}

let validate = (index) => {

    document.getElementById("next").addEventListener("click", (e) => {

        // Making array of radio buttons
        let arrinp = []
        let input = document.querySelectorAll(".inp");
        Array.from(input).forEach(e => {
            arrinp.push(e.checked)
        })

        // We know index value is out right answer if radio button have true value of index option then it is right answer
        if (arrinp[index]) {
            score += 1
            location.reload()
        } else {
            alert("Wrong answer")
        }
    })
}

fetching();