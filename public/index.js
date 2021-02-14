let added = true;

//Intro Title Display
const date = new Date();
if(date.getHours() >= 12 && date.getHours() < 17){
	$("h1").text("Good Afternoon");
}

else if(date.getHours() >= 17){
	$("h1").text("Good Evening");
}

//Functions to add behaviour
function checkHeight(){
	if($(".task-card").length < 7 && !added){
		$("div.image-div").addClass("set-height");
		added = true
	}
	else if($(window).width() > 1028 && $(".task-card").length > 6 && added){
		$("div.image-div").removeClass("set-height");
		added = false;
	}
	if($(window).width() < 770)
		$("div.content-container").prepend("<br>");
}

function doneTasksPercentage(){
	let doneTasks = $(".my-tasks .green").length;
    let totalTasks = $(".task-card").length;	//total tasks
    let percentDone = Math.floor((doneTasks*100)/totalTasks);
    let width = "width :"+percentDone+"%";
    $("div.progress-bar").attr("style", width);
}

$("textarea.form-control").on('keyup paste', function () {
	let maxchars = 30;
    $(this).val($(this).val().substring(0, maxchars));
    let tlength = $(this).val().length;
    let remain = parseInt(tlength);
    $(".input-task p").text(remain+"/30");
});

//Day and date display
let options = {
	weekday : 'long',
	day : 'numeric',
	month : 'long'
};

const day = date.toLocaleDateString("en-US",options);
$("p.day-date").text(day);

//blur event
$(".add-task-btn").on("click", function(){
	$("div.image-div").addClass("blur-bg");
	$("div.content-container").addClass("blur-bg");
	$("div.make-progress").addClass("blur-bg");
	$("div.my-tasks").addClass("blur-bg");
	$("div.input-task").addClass("elementToFadeIn");	

	// Cancelling the task 
	$("button.cancel-btn").on("click", function(){
		$("div.input-task").removeClass("elementToFadeIn");
		$("div.make-progress").removeClass("blur-bg");
		$("div.my-tasks").removeClass("blur-bg");
		$("div.image-div").removeClass("blur-bg");
		$("div.content-container").removeClass("blur-bg");
	});
});

$("button.done").on("click", function(){
	let containerDiv = $(this).parent();
	let descriptionDiv = containerDiv.parent();
	containerDiv.slideUp("slow",function(){
		descriptionDiv.addClass("green");
    	containerDiv.remove();
    	doneTasksPercentage();
	});
});

$("button.trash").on("click", function(){
	let buttonDiv = $(this).parent();
	let descriptionDiv = buttonDiv.parent();
	let cardDiv = descriptionDiv.parent();
	let finDiv = cardDiv.parent();
	finDiv.fadeOut("slow",function(){
		finDiv.remove();
		checkHeight();
		doneTasksPercentage();
	});
});

checkHeight();