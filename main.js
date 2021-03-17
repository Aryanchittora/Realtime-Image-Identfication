function preload() {
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gmjtnZgyB/model.json', loaded);
}

function loaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 300, 300);
    // For Realtime Identification, draw will load repetedly
    classifier.classify(video , gotresult);
}
function gotresult(error, result) {
    if (error) {
        console.error(error);
        window.alert("Error identifying Image, Try Reloading The Page");
    }
    else {
        console.log(result);
        document.getElementById("ans_object").innerHTML = result[0].label;
        document.getElementById("ans_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }
}