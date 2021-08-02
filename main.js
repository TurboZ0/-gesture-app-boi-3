prediction1="";
prediction2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_format: 90
});

camera= document.getElementById("camera");
Webcam.attach("#camera");

function  snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='image' src='"+data_uri+"'>";
    }) ;
   }

   console.log("ml5 version" ,ml5.version);

   classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-8lPza0le/model.json",modelloaded);
   function modelloaded() {
       console.log("Model has been loaded!");
   }

   function speak() {
    var synth_api=window.speechSynthesis;
    first_prediction="The first prediction could be "+prediction1;
    second_prediction="And the second prediction could be"+prediction2+"Am I right?";
    utter_word=new SpeechSynthesisUtterance(first_prediction+second_prediction);
    synth_api.speak(utter_word);

}

   function check() {
       document.getElementById("check").innerHTML="Identifyng..."
    random_image=document.getElementById("image");
    classifier.classify(random_image, gotResult);
}

   function gotResult(error,result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("gesture").innerHTML=result[0].label;
        document.getElementById("result_gesture").innerHTML=result[1].confidence.toFixed(4); 
        prediction1=result[0].label;
        prediction2=result[1].label;


        if (result[0].label=="Thumbs Up") {
            document.getElementById("result_gesture").innerHTML="&#128077";
        }
        if (result[0].label=="Thumbs Up") {
            document.getElementById("result_gesture").innerHTML="&#128075";
        }
        if (result[0].label=="Thumbs Down") {
            document.getElementById("result_gesture").innerHTML="&#128076";
        }
        if (result[0].label=="Ok, I understand") {
            document.getElementById("result_gesture").innerHTML="&#128533";
        }
        
        if (result[1].label=="Pointing Up") {
            document.getElementById("result_gesture1").innerHTML="&#128077";
        }
        if (result[1].label=="Thumbs Up") {
            document.getElementById("result_gesture1").innerHTML="&#128078";
        }
        if (result[1].label=="Thumbs Down") {
            document.getElementById("result_gesture1").innerHTML="&#128076";
        }
        if (result[1].label=="Ok, I understand") {
            document.getElementById("result_gesture1").innerHTML="&#128075";
        } 
    
    }
    }

