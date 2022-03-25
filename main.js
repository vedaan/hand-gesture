prediction1=""
prediction2=""
Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});
Webcam.attach('#camera')
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capturedimage" src="'+data_uri+'"> '
    });

}
console.log("ml5 version-",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gJEDJ-S7q/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction1
    speak_data_2="The second prediction is "+prediction2
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("capturedimage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);

    }
    else {
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();
if (results[0].label=="thumbs up"){
    document.getElementById("resultemoji").innerHTML="👍"
}
if (results[0].label=="thumbs down"){
    document.getElementById("resultemoji").innerHTML="👎"
}
if (results[0].label=="victory"){
    document.getElementById("resultemoji").innerHTML="✌️"
}
if (results[1].label=="thumbs up"){
    document.getElementById("resultemoji2").innerHTML="👍"
}
if (results[1].label=="thumbs down"){
    document.getElementById("resultemoji2").innerHTML="👎"
}
if (results[1].label=="victory"){
    document.getElementById("resultemoji2").innerHTML="✌️"
}
}
}