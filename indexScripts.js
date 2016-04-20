function chooseClassFunction(name){
	document.getElementById(name).classList.toggle("show");
}


function hideClassFunction(){

	var list = document.getElementsByClassName('dropdownContent');
	for(var i = 0; i < list.length; i++) {
		list[i].classList.toggle("show", false);
	}
}

function hideDivFunction(){
	var list = document.getElementsByClassName("dropdown-content");
	for(var i = 0; i < list.length; i++){
		list[i].classList.toggle("show", false);
	}
}

function chooseClassFunction(name){
	document.getElementById(name).classList.toggle("show");
}



var classesIn = sessionStorage.getItem("classes");
var clubsIn= sessionStorage.getItem("clubs");
var sportsIn= sessionStorage.getItem("sports");

//called when Generate button clicked
function checkBoxes(){

	classesIn = new Array();
	clubsIn = new Array();
	sportsIn = new Array();

	//creates colour of all input objects
	var inputs = document.getElementsByTagName("input");
	//will be colour of selected values

	//loop through all inputs
	for(var i=0; i < inputs.length; i++){

		//if input is a checkbox, sees if it is checked
		if(inputs[i].type == "checkbox"){

			//if checked adds to the appropriate colour
			if(inputs[i].checked){
				if (inputs[i].id === "class") {//'id' tells whether sport, club, or class
					classesIn.push(inputs[i].value);
				}
				if (inputs[i].id === "club") {//'id' tells whether sport, club, or class
					clubsIn.push(inputs[i].value);
					if(inputs[i].value=="Model United Nations") {
						clubsIn.push(Stupid[0]);
						clubsIn.push(Stupid[1]);
					}
				}
				if (inputs[i].id === "sport") {//'id' tells whether sport, club, or class
					sportsIn.push(inputs[i].value);
				}
				//adds value (which == name)
			}
		}
	}

	//sessionStorage adds values to global of the entire window, used to transfer information between pages
	sessionStorage.setItem('classes', classesIn);
	sessionStorage.setItem('clubs', clubsIn);
	sessionStorage.setItem('sports', sportsIn);
	//opens new window which runs intoTheShedoole on opening
	window.open("scheduleLayout.html", "_self");
}

function onSleepChange()
{
	toWake = document.getElementById("towake").value;
	var hour=Math.floor(toWake/60);
	var min=""+toWake%60;
	if(min<10)
		min="0"+min;
	document.getElementById("sleepdata").innerHTML = "Wake up at: "+hour+":"+min;
}


//function to move into the schedule grid
function intoTheShedoole() {
	var fileIn = {
		classes: sessionStorage.getItem("classes").split(","),//asign vars to permament stuff
		sports:  sessionStorage.getItem("sports").split(","),
		clubs:  sessionStorage.getItem("clubs").split(",")
	};//get this from
	if(fileIn.classes[0].length<=0)//if no data, make it say so
	{
		fileIn.classes = new Array();
	}

	if(fileIn.clubs[0].length<=0)
	{
		fileIn.clubs = new Array();
	}

	if(fileIn.sports[0].length<=0)
	{
		fileIn.sports = new Array();
	}

	for (var k = 0; k < fileIn.classes.length; k++) {
		for (var i = 0; i < Classes.length; i++) {
			if (Classes[i].name === fileIn.classes[k]) {
				fileIn.classes[k] = Classes[i];//String to object
			}
		}
	}
	for (var k = 0; k < fileIn.sports.length; k++) {
		for (var i = 0; i < Sports.length; i++) {
			if (Sports[i].name === fileIn.sports[k]) {
				fileIn.sports[k] = Sports[i];
			}
		}
	}
	for (var k = 0; k < fileIn.clubs.length; k++) {
		for (var i = 0; i < Clubs.length; i++) {
			if (Clubs[i].name === fileIn.clubs[k]) {
				fileIn.clubs[k] = Clubs[i];
			}
		}
	}
	funcy(fileIn);
}

function funcy(fileIn){
	//special for MUN
	var numY=17*4+2;//num hours*number of boxes per hours*hour +2

	colour = new Array(16);//colour stores colors of grid at locations
	for (var i = 0; i < colour.length; i++)
	{
		colour[i] = new Array(numY);
		for(var k=0;k<numY;k++)
		{
			colour[i][k]="#ffffff";//define colour
		}
	}
	for(var y=0; y<colour[0].length; y++)
	{
		colour[0][y]="#bbbbbb";//left column
	}
	for(var x=0; x<colour.length; x++)
	{
		colour[x][0]="#bbbbbb";//top row
	}
	/*
	 for(var x=1;x<13;x++)
	 {
	 if(x<6||x>7)
	 if (x % 2 == 0)
	 for (var y = 2; y < 30; y++) {
	 colour[x][y] = "#0c26ed";//Odd day
	 }
	 else
	 for (var y = 2; y < 30; y++) {
	 colour[x][y] = "#0091e0";//Even day
	 }
	 }
	 */
	function createCanvas(){
		// Declare canvas & properties
		var canvas  = document.createElement("canvas");
		// set canvas id and append canvas to body
		canvas.setAttribute("id","canvas");
		canvas.setAttribute("style","overflow:auto");
		document.getElementById("canvas123").appendChild(canvas);
	};
	function drawGrid(){

		// Get canvas and set context
		var c = document.getElementById("canvas");
		var ctx=canvas.getContext("2d");
		//resize grid to window


		//Draw grid

		var width=100;//c.width/8;
		var height=17.5;//canvas.height/numY;

		c.width =  1500;//window.innerWidth;
		c.height = numY*17.5;//window.innerHeight;

		var hwTime=0;
		for(i=0;i<fileIn.classes.length;i++)
		{
			hwTime+=fileIn.classes[i].time;//set up proper daily HW time
		}
		hwTime/=6;
		for(var x=0;x<15;x++)
		{
			var clubName;
			var sportName;

			var startHr=16;//HW
			var startMin=0;

			var startHrC=16;//clubs
			var startMinC=0;
			var endHrC=16;
			var endMinC=0;
			var doneC=false;

			var startHrS=16;//sports
			var startMinS=0;
			var endHrS=16;
			var endMinS=0;
			var doneS=false;

			var startHrCon=16;//conflict
			var startMinCon=0;
			var endHrCon=16;
			var endMinCon=0;

			for(i=0;i<fileIn.clubs.length;i++)
			{
				for (var xe = 1; xe < 7; xe++) {
					var day = "";
					switch (xe) {
						case 1:
							day="Mon"
							break;
						case 2:
							day = "Tue";
							break;
						case 3:
							day = "Wed";
							break;
						case 4:
							day = "Thu";
							break;
						case 5:
							day = "Fri";
							break;
						default:
							day = "Sat";
							break;
					}
					if ((x == xe || (x == (xe + 7) && !fileIn.clubs[i].weekly)) && fileIn.clubs[i].day.indexOf(day) != -1) {
						if (doneC) {
							startHrCon = Math.max(startHrC, fileIn.clubs[i].hourStart);
							startMinCon = Math.max(startMinC, fileIn.clubs[i].minStart);
							endHrCon = Math.min(endHrC, fileIn.clubs[i].hourEnd);
							endMinCon = Math.min(endMinC, fileIn.clubs[i].minEnd);
							if (startHrCon > endHrCon || (startHrCon == endHrCon && startMinCon >= endMinCon)) {
								doneC = true;
								clubName = fileIn.clubs[i].name;
								startHr = fileIn.clubs[i].hourEnd + 1;
								startMin = fileIn.clubs[i].minEnd;
								startHrC = fileIn.clubs[i].hourStart;
								startMinC = fileIn.clubs[i].minStart;
								endHrC = fileIn.clubs[i].hourEnd;
								endMinC = fileIn.clubs[i].minEnd;
							}
						}
						else {
							doneC = true;
							clubName = fileIn.clubs[i].name;
							startHr = fileIn.clubs[i].hourEnd + 1;
							startMin = fileIn.clubs[i].minEnd;
							startHrC = fileIn.clubs[i].hourStart;
							startMinC = fileIn.clubs[i].minStart;
							endHrC = fileIn.clubs[i].hourEnd;
							endMinC = fileIn.clubs[i].minEnd;
						}
					}
				}
			}
			for(var i=0;i<fileIn.sports.length;i++)
			{
				if((x==1||x==8)&&fileIn.sports[i].hourEnd[0]>0)//monday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[0]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[0]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[0]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[0]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[0]+1;
						startMin=fileIn.sports[i].minEnd[0];
						startHrS=fileIn.sports[i].hourStart[0];
						startMinS=fileIn.sports[i].minStart[0];
						endHrS=fileIn.sports[i].hourEnd[0];
						endMinS=fileIn.sports[i].minEnd[0];
					}
				}
				if((x==2||x==9)&&fileIn.sports[i].hourEnd[1]>0)//tuesday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[1]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[1]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[1]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[1]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[1]+1;
						startMin=fileIn.sports[i].minEnd[1];
						startHrS=fileIn.sports[i].hourStart[1];
						startMinS=fileIn.sports[i].minStart[1];
						endHrS=fileIn.sports[i].hourEnd[1];
						endMinS=fileIn.sports[i].minEnd[1];
					}
				}
				if((x==3||x==10)&&fileIn.sports[i].hourEnd[2]>0)//wednesday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[2]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[2]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[2]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[2]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[2]+1;
						startMin=fileIn.sports[i].minEnd[2];
						startHrS=fileIn.sports[i].hourStart[2];
						startMinS=fileIn.sports[i].minStart[2];
						endHrS=fileIn.sports[i].hourEnd[2];
						endMinS=fileIn.sports[i].minEnd[2];
					}
				}
				if((x==4||x==11)&&fileIn.sports[i].hourEnd[3]>0)//thursday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[3]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[3]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[3]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[3]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[3]+1;
						startMin=fileIn.sports[i].minEnd[3];
						startHrS=fileIn.sports[i].hourStart[3];
						startMinS=fileIn.sports[i].minStart[3];
						endHrS=fileIn.sports[i].hourEnd[3];
						endMinS=fileIn.sports[i].minEnd[3];
					}
				}
				if((x==5||x==12)&&fileIn.sports[i].hourEnd[4]>0)//friday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[4]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[4]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[4]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[4]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[4]+1;
						startMin=fileIn.sports[i].minEnd[4];
						startHrS=fileIn.sports[i].hourStart[4];
						startMinS=fileIn.sports[i].minStart[4];
						endHrS=fileIn.sports[i].hourEnd[4];
						endMinS=fileIn.sports[i].minEnd[4];
					}
				}
				if((x==6||x==13)&&fileIn.sports[i].hourEnd[5]>0)//saturday
				{
					if(doneS)
					{
						startHrCon=Math.max(startHrS,fileIn.sports[i].hourStart[5]);
						startMinCon=Math.max(startMinS,fileIn.sports[i].minStart[5]);
						endHrCon=Math.min(endHrS,fileIn.sports[i].hourEnd[5]);
						endMinCon=Math.min(endMinS,fileIn.sports[i].minEnd[5]);
					}
					else {
						doneS=true;
						sportName=fileIn.sports[i].name;
						startHr=fileIn.sports[i].hourEnd[5]+1;
						startMin=fileIn.sports[i].minEnd[5];
						startHrS=fileIn.sports[i].hourStart[5];
						startMinS=fileIn.sports[i].minStart[5];
						endHrS=fileIn.sports[i].hourEnd[5];
						endMinS=fileIn.sports[i].minEnd[5];
					}
				}
			}
			var startMinTol=startMin+60*startHr;
			var endMinTol=startMinTol+hwTime;
			var endMin=endMinTol%60;
			var endHr=parseInt(endMinTol/60);//Club/sport time
			var hour=6;
			var min=30;
			var printed = [false,false,false];//{HW,clubs,Sports}
			for(var y=0;y<numY;y++)
			{
				ctx.fillStyle=colour[x][y];
				ctx.fillRect(x*width,y*height,width,height);
				ctx.strokeRect(x*width,y*height,width,height);
				var content=null;//content of text
				if((x>0&&x<6)||(x>7&&x<13))
				{
					if ((hour >= 8 && hour <= 14)||(hour == 15 && min == 0))
					{

						if (x % 2 == 0)
							colour[x][y] = "#0c26ed";//even day
						else
							colour[x][y] = "#0091e0";//odd day
						if (hour == 8 && min == 0) {
							content="School Day";
						}
					}
				}
				if(y==0&&(x==1||x==8))
				{
					colour[x][y]="#bbbbbb";
					content="Monday";
				}
				if(y==0&&(x==2||x==9))
				{
					colour[x][y]="#bbbbbb";
					content="Tuesday";
				}
				if(y==0&&(x==3||x==10))
				{
					colour[x][y]="#bbbbbb";
					content="Wednesday";
				}
				if(y==0&&(x==4||x==11))
				{
					colour[x][y]="#bbbbbb";
					content="Thursday";
				}
				if(y==0&&(x==5||x==12))
				{
					colour[x][y]="#bbbbbb";
					content="Friday";
				}
				if(y==0&&(x==6||x==13))
				{
					colour[x][y]="#bbbbbb";
					content="Saturday";
				}
				if(y==0&&(x==7||x==14))
				{
					colour[x][y]="#bbbbbb";
					content="Sunday";
				}
				if(hour>=startHr&&hour<=endHr&&((x>0&&x<7)||(x>7&&x<14)))
				{
					if(!(hour==startHr&&min<=startMin)&&!(hour==endHr&&(min)>endMin))
					{
						colour[x][y]='#9944ff';//HW
						if(!printed[0]) {
							content = "Homework";
							printed[0] = true;
						}
					}
				}
				if(hour>=startHrC&&hour<=endHrC&&((x>0&&x<6)||(x>7&&x<13)))
				{
					if(!(hour==startHrC&&(min)<=startMinC)&&!(hour==endHrC&&(min)>endMinC))
					{
						colour[x][y]='#00ff00';//Clubs
						if(!printed[1])
						{
							content = clubName;
							printed[1] = true;
						}
					}
				}
				if(hour>=startHrS&&hour<=endHrS&&((x>0&&x<7)||(x>7&&x<14)))
				{
					if(!(hour==startHrS&&min<=startMinS)&&!(hour==endHrS&&min>endMinS))
					{
						if((hour>=startHrC&&hour<=endHrC&&((x>0&&x<6)||(x>7&&x<13)))&&!(hour == startHrC && (min) <= startMinC) && !(hour == endHrC && (min) > endMinC))
						{
							colour[x][y]='#ff0000';//Conflict!
							content="Confict!!";
						}
						else {
							colour[x][y]='#ffff00';//Sports
							if(!printed[2])
							{
								content = sportName;
								printed[2] = true;
							}
						}
					}
				}
				if(hour>=startHrCon&&hour<=endHrCon&&((x>0&&x<6)||(x>7&&x<13)))
				{
					if(!(hour==startHrCon&&(min)<=startMinCon)&&!(hour==endHrCon&&(min)>endMinCon))
					{
						colour[x][y]='#ff0000';//Conflict!
						content="Confict!!";
					}
				}
				ctx.fillStyle=colour[x][y];
				ctx.fillRect(x*width,y*height,width,height);
				if(content!=null)
				{
					ctx.fillStyle = "#000000";
					ctx.fillText(content, x * width + 1, y * height + (height * 0.85));
				}
				if(y>0) {
					ctx.fillStyle = "#000000";
					ctx.font = "15px sans-serif";
					//makes 9:0 into 9:00
					var add = "";
					if (min < 10)
						add = "0";
					if (x == 0) {
						if (hour > 12)
							ctx.fillText(hour - 12 + ":" + min + add + " PM", x * width, y * height + (height * 0.9));
						else
							ctx.fillText(hour + ":" + min + add + " AM", x * width, y * height + (height * 0.9));
					}
					min += 15;
					if (min >= 60) {
						hour++;
						min = 0;
					}
				}
			}
		}

		var container= document.getElementById("canvas123");
		container.appendChild(canvas);


	};

	function onLoad(){
		createCanvas();
		drawGrid();
	}



	onLoad();

}

//**CLASSES**
var Classes = new Array();//Database for all the available classes name, time
//ENGLISH
/*done*/
Classes.push({header: "English", name:"English 9", time: 90});//English 9
Classes.push({header: "English", name:"English 9HN", time: 150});//English 9HN
Classes.push({header: "English", name:"English 9 (LDTeam)", time: 75});//English 9 (LDTeam)
Classes.push({header: "English", name:"English 9 (SCLD)", time: 0});//English 9 (SCLD)
Classes.push({header: "English", name:"English 9 (CSS)", time: 30});//English 9 (CSS)
Classes.push({header: "English", name:"English 9 (SCHI)", time: 90});//English 9 (SCHI)
Classes.push({header: "English", name:"English 9 (SCSPED)", time: 30});//English 9 (SCSPED)
Classes.push({header: "English", name:"Creative Writing (Fall/Spring)", time: 15});//Creative Writing (Fall/Spring)
Classes.push({header: "English", name:"Developmental Reading", time: 0});//Developmental Reading
Classes.push({header: "English", name:"Journalism I", time: 35});//Journalism I
Classes.push({header: "English", name:"Photojournalism I", time: 35});//Photojournalism I
Classes.push({header: "English", name:"Film Study (F/S)", time: 15});//Film Study (F/S)
Classes.push({header: "English", name:"Literacy LAB 1", time: 0});//Literacy LAB 1
Classes.push({header: "English", name:"Debate (Fall)", time: 0});//Debate (Fall)
Classes.push({header: "English", name:"Forensics (Spring)", time: 0});//Forensics (Spring)

//ENGLISH FOR SPEAKERS OF OTHER LANGUAGES (ESOL)
/*done*/
Classes.push({header: "English", name:"ESOL Level 2/3 Beg/Developing", time: 60});//ESOL Level 2/3 Beg/Developing
Classes.push({header: "English", name:"", time: 60});//Default Class Thingy I Guess
Classes.push({header: "English", name:"ESOL Level 3 Developing", time: 60});//ESOL Level 3 Developing
Classes.push({header: "English", name:"ESOL Level 4 Expanding", time: 60});//ESOL Level 4 Expanding
Classes.push({header: "English", name:"English 9 Transitional (ESOL)", time: 60});//English 9 Transitional (ESOL)
Classes.push({header: "English", name:"Individualized Math", time: 60});//Individualized Math
Classes.push({header: "English", name:"Strategies for Success ESOL", time: 60});//Strategies for Success ESOL

//SCIENCE
/*done*/
Classes.push({header: "Science", name:"Biology 1", time: 38});//Biology 1
Classes.push({header: "Science", name:"Biology 1 HN", time: 60});//Biology 1 HN
Classes.push({header: "Science", name:"Biology 1 (LD Team)", time: 38});//Biology 1 (LD Team)
Classes.push({header: "Science", name:"Biology (SCLD)", time: 50});//Biology (SCLD)
Classes.push({header: "Science", name:"Biology (CSS)", time: 50});//Biology (CSS)
Classes.push({header: "Science", name:"Biology (SCHI)", time: 50});//Biology (SCHI)
Classes.push({header: "Science", name:"Biology (SCSPED)", time: 50});//Biology (SCSPED)
Classes.push({header: "Science", name:"Biology (ESOL Team)", time: 50});//Biology (ESOL Team)

//SOCIAL STUDIES
/*done*/
Classes.push({header: "Social Studies", name:"World History & Geography 1", time: 180});//World History & Geography 1
Classes.push({header: "Social Studies", name:"World History & Geography 1 (HN (stand alone)", time: 380});//World History & Geography 1 (HN (stand alone)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (LDTeam)", time: 180});//World History & Geography 1 (LDTeam)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (SCLD)", time: 75});//World History & Geography 1 (SCLD)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (CSS)", time: 60});//World History & Geography 1 (CSS)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (SCHI)", time: 0});//World History & Geography 1 (SCHI)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (SCSPED)", time: 0});//World History & Geography 1 (SCSPED)
Classes.push({header: "Social Studies", name:"World History & Geography 1 (ESOL Team)", time: 0});//World History & Geography 1 (ESOL Team)
Classes.push({header: "Social Studies", name:"World History & Geography 2", time: 120});//World History & Geography 2
Classes.push({header: "Social Studies", name:"World History & Geography 2 HN", time: 180});//World History & Geography 2 HN

//MATHEMATICS
/*done*/
Classes.push({header: "Mathematics", name:"Algebra 1", time: 90});//Algebra 1
Classes.push({header: "Mathematics", name:"Algebra 1 HN", time: 90});//Algebra 1 HN
Classes.push({header: "Mathematics", name:"Algebra 1 (LD Team)", time: 90});//Algebra 1 (LD Team)
Classes.push({header: "Mathematics", name:"Algebra 1 (SCLD)", time: 90});//Algebra 1 (SCLD)
Classes.push({header: "Mathematics", name:"Algebra 1 (CSS)", time: 120});//Algebra 1 (CSS)
Classes.push({header: "Mathematics", name:"Algebra 1 (SCHI)", time: 120});//Algebra 1 (SCHI)
Classes.push({header: "Mathematics", name:"Algebra 2", time: 90});//Algebra 2
Classes.push({header: "Mathematics", name:"Algebra 2 HN", time: 90});//Algebra 2 HN
Classes.push({header: "Mathematics", name:"Geometry", time: 100});//Geometry
Classes.push({header: "Mathematics", name:"Geometry HN", time: 45});//Geometry HN
Classes.push({header: "Mathematics", name:"Geometry (LDTeam)", time: 100});//Geometry (LDTeam)
Classes.push({header: "Mathematics", name:"Geometry (SCLD)", time: 100});//Geometry (SCLD)
Classes.push({header: "Mathematics", name:"Geometry (CSS)", time: 75});//Geometry (CSS)
Classes.push({header: "Mathematics", name:"Geometry (SCHI)", time: 0});//Geometry (SCHI)
Classes.push({header: "Mathematics", name:"Geometry/Pt 1 (SCHI)", time: 0});//Geometry/Pt 1 (SCHI)
Classes.push({header: "Mathematics", name:"Computer Science", time: 45});//Computer Science

//WORLD LANGUAGES
/*done*/
Classes.push({header: "World Languages", name:"French 1", time: 50});//French 1
Classes.push({header: "World Languages", name:"French 2", time: 50});//French 2
Classes.push({header: "World Languages", name:"French 3", time: 60});//French 3
Classes.push({header: "World Languages", name:"German 1", time: 50});//German 1
Classes.push({header: "World Languages", name:"German 2", time: 50});//German 2
Classes.push({header: "World Languages", name:"German 3", time: 60});//German 3
Classes.push({header: "World Languages", name:"Latin 1", time: 30});//Latin 1
Classes.push({header: "World Languages", name:"Latin 2", time: 60});//Latin 2
Classes.push({header: "World Languages", name:"Latin 3", time: 75});//Latin 3
Classes.push({header: "World Languages", name:"Spanish 1", time: 50});//Spanish 1
Classes.push({header: "World Languages", name:"Spanish 2", time: 60});//Spanish 2
Classes.push({header: "World Languages", name:"Spanish 3", time: 75});//Spanish 3
Classes.push({header: "World Languages", name:"American Sign Language 1", time: 50});//American Sign Language 1
Classes.push({header: "World Languages", name:"American Sign Language 2", time: 50});//American Sign Language 2
Classes.push({header: "World Languages", name:"Italian 1", time: 20});//Italian 1
Classes.push({header: "World Languages", name:"Italian 2", time: 20});//Italian 2

//HEALTH AND PHYSICAL EDUCATION
/*done*/
Classes.push({header: "Health and Physical Education", name:"HPE 9 ", time: 10});//HPE 9
Classes.push({header: "Health and Physical Education", name:"Adapted PE (9/10)", time: 0});//Adapted PE (9/10)
Classes.push({header: "Health and Physical Education", name:"Sports Medicine", time: 20});//Sports Medicine

//STUDENT RESOURCES
/*INCOMPLETE*/
//Classes.push({header: "Student Resources", name:"Developmental Reading (SCLD)", time: 0});//Developmental Reading (SCLD)
//Classes.push({header: "Student Resources", name:"Developmental Reading (SCSPED)", time: 0});//Developmental Reading (SCSPED)
Classes.push({header: "Student Resources", name:"Developmental Reading (CSS)", time: 0});//Developmental Reading (CSS)
//Classes.push({header: "Student Resources", name:"Developmental Reading (SCHI)", time: 0});//Developmental Reading (SCHI)
//Classes.push({header: "Student Resources", name:"Literacy LAB 1 (SCHI)", time: 0});//Literacy LAB 1 (SCHI)
//Classes.push({header: "Student Resources", name:"Literacy LAB 2 (SCLD)", time: 0});//Literacy LAB 2 (SCLD)
Classes.push({header: "Student Resources", name:"Algebra 1 Part 1 (SCLD)", time: 60});//Algebra 1 Part 1 (SCLD)
Classes.push({header: "Student Resources", name:"Algebra 1 Part 1 (CSS)", time: 40});//Algebra 1 Part 1 (CSS)
//Classes.push({header: "Student Resources", name:"Algebra 1 Part 1 (SCHI)", time: 0});//Algebra 1 Part 1 (SCHI)
//Classes.push({header: "Student Resources", name:"Geometry/Part 1 (SCHI)", time: 10});//Geometry/Part 1 (SCHI)
//Classes.push({header: "Student Resources", name:"Individualized Math (SCLD)", time: 0});//Individualized Math (SCLD)
Classes.push({header: "Student Resources", name:"Individualized Math (CSS)", time: 15});//Individualized Math (CSS)
//Classes.push({header: "Student Resources", name:"Individualized Math (SCHI)", time: 0});//Individualized Math (SCHI)
//Classes.push({header: "Student Resources", name:"Individualized Math (SCSPED)", time: 0});//Individualized Math (SCSPED)
//Classes.push({header: "Student Resources", name:"Economics & Personal Finance (SCSPED)", time: 0});//Economics & Personal Finance (SCSPED)
//Classes.push({header: "Student Resources", name:"Strategies for Success (SCLD)", time: 0});//Strategies for Success (SCLD)
//Classes.push({header: "Student Resources", name:"Strategies for Success (SCHI)", time: 0});//Strategies for Success (SCHI)
//Classes.push({header: "Student Resources", name:"Personal Development (SCSPED)", time: 0});//Personal Development (SCSPED)
Classes.push({header: "Student Resources", name:"Personal Development (CEDSS)", time: 0});//Personal Development (CEDSS)
//Classes.push({header: "Student Resources", name:"Personal Development (SCHI)", time: 0});//Personal Development (SCHI)
//Classes.push({header: "Student Resources", name:"Career Prep (1 pd)", time: 0});//Career Prep (1 pd)
//Classes.push({header: "Student Resources", name:"Career Prep (2 pds)", time: 0});//Career Prep (2 pds)
//Classes.push({header: "Student Resources", name:"Foundations of Science (SCSPED)", time: 0});//Foundations of Science (SCSPED)
//Classes.push({header: "Student Resources", name:"Foundations of Science (SCHI)", time: 0});//Foundations of Science (SCHI)
//Classes.push({header: "Student Resources", name:"Foundations of English (SCSPED)", time: 0});//Foundations of English (SCSPED)
//Classes.push({header: "Student Resources", name:"Foundations of English (SCHI)", time: 0});//Foundations of English (SCHI)
//Classes.push({header: "Student Resources", name:"American Sign Language 1 (SCHI)", time: 0});//American Sign Language 1 (SCHI)
//Classes.push({header: "Student Resources", name:"American Sign Language 2 (SCHI)", time: 0});//American Sign Language 2 (SCHI)
//Classes.push({header: "Student Resources", name:"American Sign Language 3 (SCHI)", time: 0});//American Sign Language 3 (SCHI)
//Classes.push({header: "Student Resources", name:"Foundations of World History/Geo (SCSPED)", time: 0});//Foundations of World History/Geo (SCSPED)
//Classes.push({header: "Student Resources", name:"Foundations of World History/ Geo (SCHI)", time: 0});//Foundations of World History/ Geo (SCHI)
//Classes.push({header: "Student Resources", name:"Life Skills (SCHI)", time: 0});//Life Skills (SCHI)
//Classes.push({header: "Student Resources", name:"Independent Living Skills", time: 0});//Independent Living Skills
//Classes.push({header: "Student Resources", name:"Studio Art & Design 1 (SCSPED)", time: 0});//Studio Art & Design 1 (SCSPED)
Classes.push({header: "Student Resources", name:"Studio Art & Design 1 (CSS)", time: 0});//Studio Art & Design 1 (CSS)
//Classes.push({header: "Student Resources", name:"Studio Art & Design 1 (SCHI)", time: 0});//Studio Art & Design 1 (SCHI)
//Classes.push({header: "Student Resources", name:"Theatre Arts 1 (SCHI)", time: 0});//Theatre Arts 1 (SCHI)
Classes.push({header: "Student Resources", name:"Music Sampler (SPED)", time: 0});//Music Sampler (SPED)

//FINE ARTS: VISUAL ARTS
/*done*/
Classes.push({header: "Fine and Visual Arts", name:"Studio Art & Design 1", time: 0});//Studio Art & Design 1
Classes.push({header: "Fine and Visual Arts", name:"Computer Graphics 1", time: 0});//Computer Graphics 1
Classes.push({header: "Fine and Visual Arts", name:"Photography 1", time: 25});//Photography 1
Classes.push({header: "Fine and Visual Arts", name:"3-D Studio Art 1", time: 0});//3-D Studio Art 1

//FINE ARTS: PERFORMING ARTS
/*INCOMPLETE*/
Classes.push({header: "Fine and Performing Arts", name:"Theatre Arts 1", time: 5});//Theatre Arts 1
Classes.push({header: "Fine and Performing Arts", name:"Technical Theatre 1", time: 5});//Technical Theatre 1
Classes.push({header: "Fine and Performing Arts", name:"Intermediate Band (Audition)", time: 100});//Intermediate Band (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Advanced Symphonic Band (Audition)", time: 100});//Advanced Symphonic Band (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Percussion Ensemble (Audition)", time: 100});//Percussion Ensemble (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Intermediate Orchestra (Audition)", time: 100});//Intermediate Orchestra (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Advanced Orchestra (Audition)", time: 120});//Advanced Orchestra (Audition)
//Classes.push({header: "Fine and Performing Arts", name:"Chamber Ensemble (Audition)", time:0});//Chamber Ensemble (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Guitar 1", time: 0});//Guitar 1
Classes.push({header: "Fine and Performing Arts", name:"Guitar 2 (Audition)", time: 0});//Guitar 2 (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Guitar 3 (Audition)", time: 0});//Guitar 3 (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Intermediate Women's Chorus (Audition)", time: 15});//Intermediate Women's Chorus (Audition)
Classes.push({header: "Fine and Performing Arts", name:"Women's Chorus", time: 15});//Women's Chorus
Classes.push({header: "Fine and Performing Arts", name:"Men's Chorus", time: 15});//Men's Chorus
Classes.push({header: "Fine and Performing Arts", name:"Music Theory", time: 150});//Music Theory
Classes.push({header: "Fine and Performing Arts", name:"Music Sampler 1 (SPED)", time: 0});//Music Sampler 1 (SPED)

//BUISNESS/INFORMATION TECH & MARKETING
/*incomplete*/
/*wrong data for test reasons*/Classes.push({header: "Business/Information Tech & Marketing", name:"Information Systems", time: 20});//Information Systems
//Classes.push({header: "Business/Information Tech & Marketing", name:"Principles of Business and Marketing", time: 0});//Principles of Business and Marketing
//Classes.push({header: "Business/Information Tech & Marketing", name:"Programming", time: 0});//Programming

//TECHNOLOGY AND ENGINEERING
/*done*/
Classes.push({header: "Technology and Engineering", name:"Design & Technology", time: 0});//Design & Technology
Classes.push({header: "Technology and Engineering", name:"Electronics 1", time: 0});//Electronics 1
Classes.push({header: "Technology and Engineering", name:"Basic Technical Drawing", time: 25});//Basic Technical Drawing

//FAMILY & CONSUMER SCIENCES
/*done*/
Classes.push({header: "Family & Consumer Sciences", name:"Gourmet & International Foods (full year)", time: 0});//Gourmet & International Foods (full year)

//**SPORTS**
/*MILITARY TIME*/
var Sports = new Array();//Databse for all available sports name, hourStart, minStart, time
Sports.push({name: "Baseball", hourStart: [15, 16, 15, 15, 16, 9, 0], minStart: [ 30, 30, 30, 30, 30, 0, 0], hourEnd: [18, 21, 18, 18, 21, 11, 0], minEnd: [0, 0, 0, 0, 0, 30, 0]});//Baseball
Sports.push({name: "Basketball (Boys)", hourStart: [15, 15, 15, 15, 15, 8, 0], minStart: [30, 15, 30, 30, 15, 0, 0], hourEnd: [17, 18, 17, 17, 18, 10, 0], minEnd: [30, 15, 30, 30, 15, 0, 0]});//Basketball (Boys)
Sports.push({name: "Basketball (Girls)", hourStart: [17, 15, 17, 17, 15, 8, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [19, 17, 19, 19, 17, 10, 0], minEnd: [30, 30, 30, 30, 30, 0, 0]});//Basketball (Girls)
//Sports.push({name: "Cheerleading", hourStart: [0,0,0,0,0,0,3], minStart: [0,0,0,0,0,0,3], hourEnd: [0,0,0,0,0,0,3], minEnd: [0,0,0,0,0,0,3]});//Cheerleading
Sports.push({name: "Cross Country", hourStart: [15, 15, 15, 15, 15, 8, 0], minStart: [20, 20, 30, 20, 20, 0, 0], hourEnd: [17, 17, 19, 17, 17, 14, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Cross Country
//Sports.push({name: "Crew", hourStart: [0,0,0,0,0,0,5], minStart: [0,0,0,0,0,0,6], hourEnd: [0,0,0,0,0,0,5], minEnd: [0,0,0,0,0,0,5]});//Crew
Sports.push({name: "Field Hockey", hourStart: [19, 19, 18, 15, 18, 0, 0], minStart: [0, 0, 0, 30, 0, 0, 0], hourEnd: [21, 21, 21, 17, 21, 0, 0], minEnd: [0, 0, 30, 30, 30, 0, 0]});//Field Hockey
Sports.push({name: "Varsity Football", hourStart: [16, 16, 16, 16, 15, 9, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [18, 18, 18, 17, 22, 11, 0], minEnd: [30, 30, 30, 30, 0, 0, 0]});//Varsity Football
Sports.push({name: "JV Football", hourStart: [16, 16, 16, 17, 15, 9, 0], minStart: [0, 0, 0, 30, 0, 0, 0], hourEnd: [18, 18, 18, 19, 17, 11, 0], minEnd: [30, 30, 30, 30, 0, 0, 0]});//Swim/Dive
//Sports.push({name: "Swim/Dive", hourStart: [0,0,0,0,0,0,9], minStart: [0,0,0,0,0,0,9], hourEnd: [0,0,0,0,0,0,9], minEnd: [0,0,0,0,0,0,9]});//Golf (Boys)
//Sports.push({name: "Golf (Boys)", hourStart: [0,0,0,0,0,0,10], minStart: [0,0,0,0,0,0,10], hourEnd: [0,0,0,0,0,0,10], minEnd: [0,0,0,0,0,0,10]});//Golf (Girls)
//Sports.push({name: "Golf (Girls)", hourStart: [0,0,0,0,0,0,11], minStart: [0,0,0,0,0,0,11], hourEnd: [0,0,0,0,0,0,11], minEnd: [0,0,0,0,0,0,11]});//Gymnastics
//Sports.push({name: "Gymnastics", hourStart: [0,0,0,0,0,0,12], minStart: [0,0,0,0,0,0,12], hourEnd: [0,0,0,0,0,0,12], minEnd: [0,0,0,0,0,0,12]});//Indoor Track
//Sports.push({name: "Indoor Track", hourStart: [0,0,0,0,0,0,13], minStart: [0,0,0,0,0,0,13], hourEnd: [0,0,0,0,0,0,13], minEnd: [0,0,0,0,0,0,13]});//Lacrosse (Boys)
Sports.push({name: "Lacrosse (Boys)", hourStart: [16, 19, 16, 19, 16, 8, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [18, 21, 18, 21, 18, 10, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Lacrosse (Girls)
//Sports.push({name: "Lacrosse (Girls)", hourStart: [0,0,0,0,0,0,15], minStart: [0,0,0,0,0,0,15], hourEnd: [0,0,0,0,0,0,15], minEnd: [0,0,0,0,0,0,15]});//Outdoor Track
Sports.push({name: "Outdoor Track", hourStart: [15, 15, 15, 15, 15, 9, 0], minStart: [15, 15, 15, 15, 15, 0, 0], hourEnd: [17, 17, 17, 17, 17, 17, 0], minEnd: [30, 30, 30, 30, 30, 0, 0]});//Precisionettes
Sports.push({name: "Precisionettes", hourStart: [15, 16, 0, 15, 0, 0, 0], minStart: [30, 30, 0, 30, 0, 0, 0], hourEnd: [18, 19, 0, 18, 0, 0, 0], minEnd: [0, 30, 0, 0, 0, 0, 0]});//Rifle
Sports.push({name: "Rifle", hourStart: [0, 0, 0, 17, 0, 0, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [0, 0, 0, 21, 0, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Soccer (Boys)
//Sports.push({name: "Soccer (Boys)", hourStart: [0,0,0,0,0,0,19], minStart: [0,0,0,0,0,0,19], hourEnd: [0,0,0,0,0,0,19], minEnd: [0,0,0,0,0,0,19]});//Soccer (Girls)
//Sports.push({name: "Soccer (Girls)", hourStart: [0,0,0,0,0,0,20], minStart: [0,0,0,0,0,0,20], hourEnd: [0,0,0,0,0,0,20], minEnd: [0,0,0,0,0,0,20]});//Softball
Sports.push({name: "Softball", hourStart: [15, 16, 15, 15, 16, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [18, 21, 18, 18, 21, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Swim/Dive
//Sports.push({name: "Swim/Dive", hourStart: [0,0,0,0,0,0,22], minStart: [0,0,0,0,0,0,22], hourEnd: [0,0,0,0,0,0,22], minEnd: [0,0,0,0,0,0,22]});//Tennis (Boys)
Sports.push({name: "Tennis (Boys)", hourStart: [16, 15, 16, 15, 16, 0, 0], minStart: [0, 30, 0, 30, 0, 0, 0], hourEnd: [17, 18, 17, 18, 17, 0, 0], minEnd: [15, 45, 15, 45, 15, 0, 0]});//Tennis (Girls)
Sports.push({name: "Tennis (Girls)", hourStart: [15, 15, 15, 15, 15, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [17, 18, 17, 18, 17, 0, 0], minEnd: [0, 45, 0, 45, 0, 0, 0]});//Volleyball
Sports.push({name: "Volleyball", hourStart: [15, 15, 15, 15, 15, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [21, 21, 21, 21, 21, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Varsity Wrestling
//Sports.push({name: "Varsity Wrestling", hourStart: [0,0,0,0,0,0,26], minStart: [0,0,0,0,0,0,26], hourEnd: [0,0,0,0,0,0,26], minEnd: [0,0,0,0,0,0,26]});//Varsity Wrestling
//Sports.push({name: "JV Wrestling", hourStart: [0,0,0,0,0,0,27], minStart: [0,0,0,0,0,0,27], hourEnd: [0,0,0,0,0,0,27], minEnd: [0,0,0,0,0,0,27]});//JV Wrestling

//**CLUBS**
var Clubs = new Array();
/*MILITARY TIME*/
//Clubs.insert({name:"String", hourStart:int, minStart:int, time:int, day:"String", weekly:boolean});
/*1*/Clubs.push({name: "Anime Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Anime Club
//*0*/Clubs.push({name: "Astronomy Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Astronomy Club
//*0*/Clubs.push({name: "Athletic Training Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Athletic Training Club
//*0*/Clubs.push({name: "Band", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Band
/*1*/Clubs.push({name: "Catholic Club", hourStart: 19, minStart: 30, hourEnd: 20, minEnd: 0, day: "Thu", weekly: true});//Catholic Club
//*0*/Clubs.push({name: "Cavalcade (Newspaper)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Cavalcade (Newspaper)
//*0*/Clubs.push({name: "Cavalier (Yearbook)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Cavalier (Yearbook)
/*1*/Clubs.push({name: "Chess Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Mon", weekly: false});//Chess Club
//*0*/Clubs.push({name: "Chorus", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Chorus
//*0*/Clubs.push({name: "Class of 2016", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2016
//*0*/Clubs.push({name: "Class of 2017", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2017
//*0*/Clubs.push({name: "Class of 2018", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2018
//*0*/Clubs.push({name: "Class of 2019", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2019
//*0*/Clubs.push({name: "Color Guard", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Color Guard
/*1*/Clubs.push({name: "Computer Science", hourStart: 16, minStart: 0, hourEnd: 17, minEnd: 0, day: "Thu", weekly: true});//Computer Science
/*1*/Clubs.push({name: "Deaf Academic Bowl", hourStart: 15, minStart: 10, hourEnd: 17, minEnd: 0, day: "Wed", weekly: true});//Deaf Academic Bowl
//*0*/Clubs.push({name: "DECA", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//DECA
//*0*/Clubs.push({name: "DECA Officers", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//DECA Officers
/*1*/Clubs.push({name: "Doctor Who Fan Club", hourStart: 15, minStart: 15, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Doctor Who Fan Club
/*1*/Clubs.push({name: "Engineering Club/ACE Mentoring", hourStart: 16, minStart: 30, hourEnd: 18, minEnd: 0, day: "Wed", weekly: false});//Engineering Club/ACE Mentoring
//*0*/Clubs.push({name: "Environment Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Environment Club
//*0*/Clubs.push({name: "Family, Career and Community Leaders of America (FCCLA)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Family, Career and Community Leaders of America (FCCLA)
//*0*/Clubs.push({name: "Fellowship of Christian Athletes", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Fellowship of Christian Athletes
/*1*/Clubs.push({name: "French Club", hourStart: 15, minStart: 15, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//French Club
//*0*/Clubs.push({name: "French Honor Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//French Honor Society
/*1*/Clubs.push({name: "Gay-Straight Alliance (GSA)", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Gay-Straight Alliance (GSA)
/*1*/Clubs.push({name: "German Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//German Club
/*1*/Clubs.push({name: "German Honor Society", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//German Honor Society
/*1*/Clubs.push({name: "Go Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Go Club
//*0*/Clubs.push({name: "Habitat for Humanity", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Habitat for Humanity
/*1*/Clubs.push({name: "Hip Hop Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Tue", weekly: true});//Hip Hop Club
/*1*/Clubs.push({name: "Improv Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 15, day: "Tue", weekly: true});//Improv Club
//*0*/Clubs.push({name: "International Thespian Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//International Thespian Society
/*1*/Clubs.push({name: "IT Girls", hourStart: 15, minStart: 0, hourEnd: 18, minEnd: 0, day: "Tue", weekly: false});//IT Girls
//*0*/Clubs.push({name: "Key Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Key Club
//*0*/Clubs.push({name: "KFC (Kosher Food Club)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//KFC (Kosher Food Club)
/*1*/Clubs.push({name: "Latin Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Thu", weekly: true});//Latin Club
/*1*/Clubs.push({name: "Latin Honor Society", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Mon", weekly: false});//Latin Honor Society
//*0*/Clubs.push({name: "Leadership", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Leadership
//*0*/Clubs.push({name: "Math Honor Society  (Mu Alpha Theta)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Math Honor Society  (Mu Alpha Theta)
/*1*/Clubs.push({name: "Math Team (JV)", hourStart: 15, minStart: 10, hourEnd: 15, minEnd: 40, day: "Wed", weekly: false});//Math Team (JV)
/*1*/Clubs.push({name: "Math Team (Varsity)", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Wed", weekly: false});//Math Team (Varsity)
/*1*/Clubs.push({name: "Model United Nations", hourStart: 15, minStart: 30, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Model United Nations
/*1*/Clubs.push({name: "National Art Honor Society", hourStart: 15, minStart: 30, hourEnd: 17, minEnd: 0, day: "Mon", weekly: false});//National Art Honor Society
/*1*/Clubs.push({name: "National English Honor Society", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Tue", weekly: false});//National English Honor Society
//*0*/Clubs.push({name: "National Honor Society", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Thu", weekly: false});//National Honor Society
/*1*/Clubs.push({name: "Operation Patriot", hourStart: 15, minStart: 5, hourEnd: 15, minEnd: 30, day: "Wed", weekly: false});//Operation Patriot
//*0*/Clubs.push({name: "Orchestra", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Orchestra
//*0*/Clubs.push({name: "Page (Literary/Art Magazine)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Page (Literary/Art Magazine)
/*1*/Clubs.push({name: "Photography Club ", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Photography Club
/*1*/Clubs.push({name: "Poetry Club ", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Mon", weekly: false});//Poetry Club
//*1*/Clubs.push({name: "Relay for Life", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Relay for Life
/*1*/Clubs.push({name: "Robotics Club", hourStart: 15, minStart: 0, hourEnd: 18, minEnd: 0, day: "Tue, Thu", weekly: true});//Robotics Club
/*1*/Clubs.push({name: "Scholastic Quiz Bowl /It's Academic", hourStart: 15, minStart: 10, hourEnd: 15, minEnd: 50, day: "Tue, Thu", weekly: true});//Scholastic Quiz Bowl /It's Academic
//*0*/Clubs.push({name: "Science Olympiad", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Science Olympiad
/*1*/Clubs.push({name: "Science National Honor Society", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Thu", weekly: false});//Science National Honor Society
/*1*/Clubs.push({name: "Speech, Debate, & Forensics ", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Thu", weekly: true});//Speech, Debate, & Forensics
/*1*/Clubs.push({name: "Spanish Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Spanish Club
/*1*/Clubs.push({name: "Spanish National Honor Society", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Spanish National Honor Society
//*0*/Clubs.push({name: "Student Advisory Council (SAC)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Student Advisory Council (SAC)
//*0*/Clubs.push({name: "Student Government Association (SGA)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Student Government Association (SGA)
//*0*/Clubs.push({name: "Students Against Destructive Decisions (SADD)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Students Against Destructive Decisions (SADD)
/*1*/Clubs.push({name: "Student 2 Student (Ambassadors) ", hourStart: 15, minStart: 30, hourEnd: 16, minEnd: 30, day: "Mon", weekly: false});//Student 2 Student (Ambassadors)
/*1*/Clubs.push({name: "Technology Student Association (TSA)", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 10, day: "Wed", weekly: false});//Technology Student Association (TSA)
//*0*/Clubs.push({name: "Tri M Music Honor Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Tri M Music Honor Society
//*0*/Clubs.push({name: "Woodson Buddies", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Woodson Buddies
//*0*/Clubs.push({name: "Young Hearts", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Young Hearts
//*0*/Clubs.push({name: "Young Republicans", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Young Republicans
//Extra Clubs and thingys
var Stupid=new Array();
/*1*/Stupid.push({name: "Model United Nations Sat", hourStart: 9, minStart: 0, hourEnd:17, minEnd: 0, day: "Sat", weekly: false});//Model United Nations
/*1*/Stupid.push({name: "Model United Nations Fri", hourStart: 16, minStart: 30, hourEnd: 21, minEnd: 0, day: "Fri", weekly: false});//Model United Nations
/*1*/Stupid.push({name: "Relay for Life Smoothie", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 30, day: "Fri", weekly: true});//Relay for Life



