status="";
objects=[];
function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();

}
function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML ="Status :Detecting objects";
    input_id = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("model Loaded!");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if(status!= ""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000")
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_id){
                video.stop();
                objectDetector.detect(gotResult);
            document.getElementById("object_name").innerHTML = input_id + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input_id + "Found");
            synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_name").innerHTML= input_id +"not found";
            }
        }
    }
}
       function gotResult(error, results){
      if(error){
          console.log(error);

      }
      console.log(results);
      objects= results;
       }
