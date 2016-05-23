function chooseClassFunction(name){
	document.getElementById(name).classList.toggle("show", true);
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
var season="fall";//0=fall 1=winter 2=spring

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
	fileIn = {
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
	funcy();
}
var fileIn;
function funcy(){
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

	onLoad();

}
function createCanvas(){
	// Declare canvas & properties
	var canvas  = document.createElement("canvas");
	// set canvas id and append canvas to body
	canvas.setAttribute("id","canvas");
	canvas.setAttribute("style","overflow:auto");
	document.getElementById("canvas123").appendChild(canvas);
};
function drawGrid(){
	var numY=17*4+2;//num hours*number of boxes per hours*hour +2
	// Get canvas and set context
	var c = document.getElementById("canvas");
	var ctx=c.getContext("2d");
	//resize grid to window

	var fileIn2=JSON.parse(JSON.stringify(fileIn));

	for (var k = 0; k < fileIn2.sports.length; k++) {
		if (season != fileIn2.sports[k].header) {
			fileIn2.sports.splice(k,1);
			k--;
		}
	}

	for (var i = 0; i < colour.length; i++)
	{
		for(var k=0;k<colour[0].length;k++)
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
	//Draw grid

	var width=100;//c.width/8;
	var height=17.5;//canvas.height/numY;

	c.width =  1500;//window.innerWidth;
	c.height = numY*17.5;//window.innerHeight;

	var hwTime=0;
	for(i=0;i<fileIn2.classes.length;i++)
	{
		hwTime+=fileIn2.classes[i].time;//set up proper daily HW time
	}
	hwTime/=6;
	for(var x=0;x<15;x++)
	{
		var clubName=["clubName"];
		var sportName=["sportName"];

		var startHr=16;//HW
		var startMin=0;

		var startHrC=[16];//clubs
		var startMinC=[0];
		var endHrC=[16];
		var endMinC=[0];
		var cDex=0;

		var startHrS=[16];//sports
		var startMinS=[0];
		var endHrS=[16];
		var endMinS=[0];
		var sDex=0;

		var startHrCon=[16];//conflict
		var startMinCon=[0];
		var endHrCon=[16];
		var endMinCon=[0];
		var conDex=0;

		for(i=0;i<fileIn2.clubs.length;i++)
		{
			var xe=x%7;
			var day = "";
			switch (xe) {
				case 1:
					day="Mon";
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
				case 6:
					day = "Sat";
					break;
				default:
					break;
			}
			if ((x == xe || (x == (xe + 7) && !fileIn2.clubs[i].weekly)) && fileIn2.clubs[i].day.indexOf(day) != -1) {
				if (cDex>0) {
					startHrCon[conDex] = Math.max(startHrC, fileIn2.clubs[i].hourStart);
					startMinCon[conDex] = Math.max(startMinC, fileIn2.clubs[i].minStart);
					endHrCon = Math.min(endHrC, fileIn2.clubs[i].hourEnd);
					endMinCon = Math.min(endMinC, fileIn2.clubs[i].minEnd);
					if (startHrCon > endHrCon || (startHrCon == endHrCon && startMinCon >= endMinCon)) {
						clubName[cDex] = fileIn2.clubs[i].name;
						startHr = Math.max(fileIn2.clubs[i].hourEnd + 1,startHr);
						if(startHr==fileIn2.clubs[i].hourEnd + 1)
							startMin = fileIn2.clubs[i].minEnd;
						startHrC[cDex] = fileIn2.clubs[i].hourStart;
						startMinC[cDex] = fileIn2.clubs[i].minStart;
						endHrC[cDex] = fileIn2.clubs[i].hourEnd;
						endMinC[cDex] = fileIn2.clubs[i].minEnd;
						cDex++;
					}
					else
					{
						conDex++;
					}
				}
				else {
					clubName[cDex] = fileIn2.clubs[i].name;
					startHr= fileIn2.clubs[i].hourEnd + 1;
					startMin= fileIn2.clubs[i].minEnd;
					startHrC[cDex] = fileIn2.clubs[i].hourStart;
					startMinC[cDex] = fileIn2.clubs[i].minStart;
					endHrC[cDex] = fileIn2.clubs[i].hourEnd;
					endMinC[cDex] = fileIn2.clubs[i].minEnd;
					cDex++;
				}
			}
		}
		for(var i=0;i<fileIn2.sports.length;i++) {
			for (xe = 0; xe < 7; xe++)
			{
				if ((x == (xe+1) || x == (xe+8)) && fileIn2.sports[i].hourEnd[xe] > 0)//monday
				{
					if (sDex > 0) {
						startHrCon[conDex] = Math.max(startHrC, fileIn2.sports[i].hourStart[xe]);
						startMinCon[conDex] = Math.max(startMinC, fileIn2.sports[i].minStart[xe]);
						endHrCon[conDex] = Math.min(endHrC, fileIn2.sports[i].hourEnd[xe]);
						endMinCon[conDex] = Math.min(endMinC, fileIn2.sports[i].minEnd[xe]);
						if (startHrCon > endHrCon || (startHrCon == endHrCon && startMinCon >= endMinCon)) {
							sportName[sDex] = fileIn2.sports[i].name;
							startHr = Math.max(fileIn2.sports[i].hourEnd[xe] + 1, startHr);
							if (startHr == fileIn2.sports[i].hourEnd[xe] + 1)
								startMin = fileIn2.sports[i].minEnd[xe];
							startHrS[sDex] = fileIn2.sports[i].hourStart[xe];
							startMinS[sDex] = fileIn2.sports[i].minStart[xe];
							endHrS[sDex] = fileIn2.sports[i].hourEnd[xe];
							endMinS[sDex] = fileIn2.sports[i].minEnd[xe];
							sDex++;
						}
						else {
							conDex++;
						}
					}
					else {
						sportName[sDex] = fileIn2.sports[i].name;
						startHr = fileIn2.sports[i].hourEnd[xe] + 1;
						startMin = fileIn2.sports[i].minEnd[xe];
						startHrS[sDex] = fileIn2.sports[i].hourStart[xe];
						startMinS[sDex] = fileIn2.sports[i].minStart[xe];
						endHrS[sDex] = fileIn2.sports[i].hourEnd[xe];
						endMinS[sDex] = fileIn2.sports[i].minEnd[xe];
						sDex++;
					}
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
			for(var k=0;k<cDex;k++) //go through all clubz
			{
				if (hour >= startHrC[k] && hour <= endHrC[k] && ((x > 0 && x < 6) || (x > 7 && x < 13))) {
					if (!(hour == startHrC[k] && (min) <= startMinC[k]) && !(hour == endHrC[k] && (min) > endMinC[k])) {
						colour[x][y] = '#00ff00';//Clubs
						if (!printed[1]) {
							content = clubName[k];
							printed[1] = true;
						}
					}
				}
			}
			for(k=0;k<sDex;k++) //go through all clubz
			{
				if (hour >= startHrS[k] && hour <= endHrS[k] && ((x > 0 && x < 7) || (x > 7 && x < 14)))
				{
					if (!(hour == startHrS[k] && min <= startMinS[k]) && !(hour == endHrS[k] && min > endMinS[k])) {
						if ((hour >= startHrC[k] && hour <= endHrC[k] && ((x > 0 && x < 6) || (x > 7 && x < 13))) && !(hour == startHrC[k] && (min) <= startMinC[k]) && !(hour == endHrC[k] && (min) > endMinC[k])) {
							colour[x][y] = '#ff0000';//Conflict!
							content = "Confict!!";
						}
						else {
							colour[x][y] = '#ffff00';//Sports
							if (!printed[2]) {
								content = sportName[k];
								printed[2] = true;
							}
						}
					}
				}
			}
			for(k=0;k<sDex;k++) //go through all conflictz
			{
				if (hour >= startHrCon[k] && hour <= endHrCon[k] && ((x > 0 && x < 6) || (x > 7 && x < 13))) {
					if (!(hour == startHrCon[k]&& (min) <= startMinCon[k]) && !(hour == endHrCon[k] && (min) > endMinCon[k])) {
						colour[x][y] = '#ff0000';//Conflict!
						content = "Confict!!";
					}
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
			if(x==0&&y==0) {
				ctx.fillStyle = "#000000";
				ctx.font = "15px sans-serif";
				ctx.fillText(season, x * width, y * height + (height * 0.9));
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
function changeSeason()
{
	if(season=="fall")
		season="winter";
	else
	if(season=="winter")
		season="spring";
	else
		season="fall";
	drawGrid();
}

//**CLASSES**
var Classes = new Array();//Database for all the available classes name, time
//ENGLISH
/*done*/
var i=0;
Classes[i++]=({header: "English", name:"English 9", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 90});//English 9
Classes[i++]=({header: "English", name:"English 9HN", courseDescription: "This course deepens and advances the curriculum of English 9. This course isn’t just about reading more novels or completing more work. It dives deeper into the content and skills of the curriculum at a faster pace and appeals to students who are self-starters. ", time: 150});//English 9HN
Classes[i++]=({header: "English", name:"English 9 (LDTeam)", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 75});//English 9 (LDTeam)
Classes[i++]=({header: "English", name:"English 9 (SCLD)", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 0});//English 9 (SCLD)
Classes[i++]=({header: "English", name:"English 9 (CSS)", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 30});//English 9 (CSS)
Classes[i++]=({header: "English", name:"English 9 (SCHI)", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 90});//English 9 (SCHI)
Classes[i++]=({header: "English", name:"English 9 (SCSPED)", courseDescription: "Students read and analyze a variety of literary and nonfiction texts, exploring the characteristics of different forms and the techniques authors use to achieve their intended purpose. Language study extends students’ vocabulary through learning about connotations, denotations, word origins, and structures.", time: 30});//English 9 (SCSPED)
Classes[i++]=({header: "English", name:"Creative Writing (Fall/Spring)", courseDescription: "This course provides students an opportunity for additional writing instruction beyond the standard English program. Experimentation with many forms of writing is encouraged, with an emphasis on poetry, short stories, plays, and all forms of descriptive writing.", time: 15});//Creative Writing (Fall/Spring)
Classes[i++]=({header: "English", name:"Developmental Reading", courseDescription: "This course is designed to provide direct, explicit and intensive reading instruction to students who are reading two or more years below grade level", time: 0});//Developmental Reading
Classes[i++]=({header: "English", name:"Journalism I", courseDescription: "In Journalism 1 students learn the history and language of journalism; develop communication skills in writing, designing and editing for a variety of media; understand news and the process of publication; and become more critical readers and viewers of mass media.", time: 35});//Journalism I
Classes[i++]=({header: "English", name:"Photojournalism I", courseDescription: "In Photojournalism 1, students learn the principles of interviewing, copywriting, photography, layout, and design. Students will use publishing software to create pages for the school's yearbook. This course requires some after school time. This course requires an application and approval by instructor.", time: 35});//Photojournalism I
Classes[i++]=({header: "English", name:"Film Study (F/S)", courseDescription: "This course involves the study of classic and award-winning films. Students critique both the artistic and technical merits of the films. Students will produce short films each semester.", time: 15});//Film Study (F/S)
Classes[i++]=({header: "English", name:"Literacy LAB 1", courseDescription: "Literacy LAB (Literacy Access Bridge) 1 provides students who are reading below expected proficiency with direct instruction of content area reading and writing skills.", time: 0});//Literacy LAB 1
Classes[i++]=({header: "English", name:"Debate (Fall)", courseDescription: "Students will research the current topics and write cases both affirming and negating the resolutions. Students will also take part in regular in-class mock debates. This class can be used as preparation time for participation in the Woodson Debate team. Participation in at least one evening or Saturday debate event is required.", time: 0});//Debate (Fall)
Classes[i++]=({header: "English", name:"Forensics (Spring)", courseDescription: "Students will be familiarized with some of the major forensic events, including Original Oratory, Dramatic Interpretation, Impromptu speaking, and Extemporaneous speaking. This class can be used as prep time for participation in the WTW Forensics (Speech) team. Participation in at least one evening or Saturday event is required.", time: 0});//Forensics (Spring)

//ENGLISH FOR SPEAKERS OF OTHER LANGUAGES (ESOL)
/*done*/
Classes[i++]=({header: "English", name:"ESOL Level 2/3 Beg/Developing", courseDescription: "Students engage in listening, speaking, reading and writing English through an integrated language arts and content curriculum.", time: 60});//ESOL Level 2/3 Beg/Developing
//Classes[i++]=({header: "English", name:"", courseDescription: "nothing", time: 60});//Default Class Thingy I Guess
Classes[i++]=({header: "English", name:"ESOL Level 3 Developing", courseDescription: "Students engage in listening, speaking, reading and writing English through an integrated language arts and content curriculum.", time: 60});//ESOL Level 3 Developing
Classes[i++]=({header: "English", name:"ESOL Level 4 Expanding", courseDescription: "This course is taken concurrently with Transitional English 9 or English 9. ESOL and English teachers work together to provide a comprehensive program based on the FCPS English 9 POS", time: 60});//ESOL Level 4 Expanding
Classes[i++]=({header: "English", name:"English 9 Transitional (ESOL)", courseDescription: "Transitional English 9 is intended to be taken concurrently with English for Speakers of other Languages (ESOL) Level 4 to serve as a transition from ESOL to the mainstream English program", time: 60});//English 9 Transitional (ESOL)
Classes[i++]=({header: "English", name:"Individualized Math", courseDescription: "The purpose of this course is to provide instruction of foundational mathematics skills to special education students who are functioning more than two years below grade level in mathematics.", time: 60});//Individualized Math
Classes[i++]=({header: "English", name:"Strategies for Success ESOL", courseDescription: "This elective course is designed to provide support English Learners in core curricular areas and to provide direct instruction in specific learning strategies, study skills, time management, organization, and self-advocacy skills to develop the habits necessary for academic success.", time: 60});//Strategies for Success ESOL

//SCIENCE
/*done*/
Classes[i++]=({header: "Science", name:"Biology 1", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 38});//Biology 1
Classes[i++]=({header: "Science", name:"Biology 1 HN", courseDescription: "In comparison to Biology 1, students will investigate some topics at a deeper level including biotechnology, health and environmental issues. Students will be involved in an externally-moderated experimental/research project, either independently or in teams.", time: 60});//Biology 1 HN
Classes[i++]=({header: "Science", name:"Biology 1 (LD Team)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 38});//Biology 1 (LD Team)
Classes[i++]=({header: "Science", name:"Biology (SCLD)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 50});//Biology (SCLD)
Classes[i++]=({header: "Science", name:"Biology (CSS)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 50});//Biology (CSS)
Classes[i++]=({header: "Science", name:"Biology (SCHI)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 50});//Biology (SCHI)
Classes[i++]=({header: "Science", name:"Biology (SCSPED)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 50});//Biology (SCSPED)
Classes[i++]=({header: "Science", name:"Biology (ESOL Team)", courseDescription: "Students engage in scientific inquiry through lab work as they explore biological processes. All class and laboratory activities focus on life processes that occur within organisms. Major topics of study include molecular biology, cells, genetics, organisms, evolution and ecology. Parents have the option of withdrawing their child from any or all topics included in the state-mandated Family Life Education portion.", time: 50});//Biology (ESOL Team)

//SOCIAL STUDIES
/*done*/
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 180});//World History & Geography 1
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (HN (stand alone)", courseDescription: "In comparison to World History and Geography 1, students will investigate some topics at a deeper level. Students are encouraged to think independently while developing group process skills.", time: 380});//World History & Geography 1 (HN (stand alone)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (LDTeam)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 180});//World History & Geography 1 (LDTeam)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (SCLD)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 75});//World History & Geography 1 (SCLD)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (CSS)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 60});//World History & Geography 1 (CSS)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (SCHI)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 0});//World History & Geography 1 (SCHI)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (SCSPED)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 0});//World History & Geography 1 (SCSPED)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 1 (ESOL Team)", courseDescription: "This is the first of a two-year, chronologically and thematically organized study of world history and geography. In this first year, students study the world from ancient times to 1500 CE. The course highlights relationships between the geography and history of Europe, Africa, Asia, and Latin America.", time: 0});//World History & Geography 1 (ESOL Team)
Classes[i++]=({header: "Social Studies", name:"World History & Geography 2", courseDescription: "Students study the world from 1500 CE through the present. The course weaves together the skills and content of both history and geography so that students may learn how both affect the world around them.", time: 120});//World History & Geography 2
Classes[i++]=({header: "Social Studies", name:"World History & Geography 2 HN", courseDescription: "Students study the world from 1500 CE through the present. Students continue to examine the relationship among social, economic, and geopolitical developments across time and place", time: 180});//World History & Geography 2 HN

//MATHEMATICS
/*done*/
Classes[i++]=({header: "Mathematics", name:"Algebra 1", courseDescription: "Topics include linear equations and inequalities, systems of linear equations, relations, functions, polynomials, and statistics. Emphasis is placed on making connections in algebra to geometry and statistics.", time: 90});//Algebra 1
Classes[i++]=({header: "Mathematics", name:"Algebra 1 HN", courseDescription: "This class goes beyond the scope of Algebra I. Students are expected to master algebraic mechanics and understand the underlying theory, as well as apply the concepts to real-world situations. Emphasis is placed on algebraic connections to arithmetic, geometry, and statistics. ", time: 90});//Algebra 1 HN
Classes[i++]=({header: "Mathematics", name:"Algebra 1 (LD Team)", courseDescription: "Topics include linear equations and inequalities, systems of linear equations, relations, functions, polynomials, and statistics. Emphasis is placed on making connections in algebra to geometry and statistics.", time: 90});//Algebra 1 (LD Team)
Classes[i++]=({header: "Mathematics", name:"Algebra 1 (SCLD)", courseDescription: "Topics include linear equations and inequalities, systems of linear equations, relations, functions, polynomials, and statistics. Emphasis is placed on making connections in algebra to geometry and statistics.", time: 90});//Algebra 1 (SCLD)
Classes[i++]=({header: "Mathematics", name:"Algebra 1 (CSS)", courseDescription: "Topics include linear equations and inequalities, systems of linear equations, relations, functions, polynomials, and statistics. Emphasis is placed on making connections in algebra to geometry and statistics.", time: 120});//Algebra 1 (CSS)
Classes[i++]=({header: "Mathematics", name:"Algebra 1 (SCHI)", courseDescription: "Topics include linear equations and inequalities, systems of linear equations, relations, functions, polynomials, and statistics. Emphasis is placed on making connections in algebra to geometry and statistics.", time: 120});//Algebra 1 (SCHI)
Classes[i++]=({header: "Mathematics", name:"Algebra 2", courseDescription: "Topics include function, polynomials, rational expressions, complex numbers, exponential and logarithmic equations, arithmetic and geometric sequences and series, and data analysis. ", time: 90});//Algebra 2
Classes[i++]=({header: "Mathematics", name:"Algebra 2 HN", courseDescription: "Students are expected to not only master algebraic mechanics but also to understand the underlying theory and to apply concepts to real-world situations in a meaningful way. Additional topics include matrices, infinite geometric sequences and series, permutations and combinations, and selected topics in discrete math. Emphasis is on modeling, logic, and interpretation of related graphs. ", time: 90});//Algebra 2 HN
Classes[i++]=({header: "Mathematics", name:"Geometry", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 100});//Geometry
Classes[i++]=({header: "Mathematics", name:"Geometry HN", courseDescription: "Goes beyond the scope of Geometry. Heavily uses proofs to verify theorems. Students investigate non-Euclidean geometries and formal logic.", time: 45});//Geometry HN
Classes[i++]=({header: "Mathematics", name:"Geometry (LDTeam)", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 100});//Geometry (LDTeam)
Classes[i++]=({header: "Mathematics", name:"Geometry (SCLD)", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 100});//Geometry (SCLD)
Classes[i++]=({header: "Mathematics", name:"Geometry (CSS)", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 75});//Geometry (CSS)
Classes[i++]=({header: "Mathematics", name:"Geometry (SCHI)", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 0});//Geometry (SCHI)
Classes[i++]=({header: "Mathematics", name:"Geometry/Pt 1 (SCHI)", courseDescription: "This course emphasizes two- and three-dimensional reasoning skills, coordinate and transformational geometry, and the use of geometric models to solve problems. ", time: 0});//Geometry/Pt 1 (SCHI)
Classes[i++]=({header: "Mathematics", name:"Computer Science", courseDescription: "Students learn how to code in Java, developing their skills in defining, writing, and running programs on a computer. Students will work with both mathematical and non-mathematical problems. ", time: 45});//Computer Science

//WORLD LANGUAGES
/*done*/
Classes[i++]=({header: "World Languages", name:"French 1", courseDescription: "Students will learn to use simple sentence structures and basic language structures to discuss about Personal and Family Life, School Life, Social Life, and Community Life. They will develop their listening, speaking, reading, and writing skills.", time: 50});//French 1
Classes[i++]=({header: "World Languages", name:"French 2", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to function in real-life situations using more complex sentences and language structures. They will real material on familiar topics and produce short writing samples. ", time: 50});//French 2
Classes[i++]=({header: "World Languages", name:"French 3", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to use more complex language structures on more abstract concepts. The themes of the class include Rights and Responsibilities, Future Plans and Choices, Teen Culture, Environment, and Humanities.", time: 60});//French 3
Classes[i++]=({header: "World Languages", name:"German 1", courseDescription: "Students will learn to use simple sentence structures and basic language structures to discuss about Personal and Family Life, School Life, Social Life, and Community Life. They will develop their listening, speaking, reading, and writing skills.", time: 50});//German 1
Classes[i++]=({header: "World Languages", name:"German 2", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to function in real-life situations using more complex sentences and language structures. They will real material on familiar topics and produce short writing samples. ", time: 50});//German 2
Classes[i++]=({header: "World Languages", name:"German 3", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to use more complex language structures on more abstract concepts. The themes of the class include Rights and Responsibilities, Future Plans and Choices, Teen Culture, Environment, and Humanities.", time: 60});//German 3
Classes[i++]=({header: "World Languages", name:"Latin 1", courseDescription: "Students learn basic language structure and pronunciation in order to read simple Latin passages. The relationship of English to Latin is emphasized in vocabulary, word derivation, and meanings of prefixes and suffixes. Students also learn about the geography, history, government, and culture of the Roman Empire. ", time: 30});//Latin 1
Classes[i++]=({header: "World Languages", name:"Latin 2", courseDescription: "Students learn more vocabulary, more complex language structures and syntax so that they are able to read more challenging passages in Latin. Students continue to study Roman life and Rome’s contribution to our civilization. ", time: 60});//Latin 2
Classes[i++]=({header: "World Languages", name:"Latin 3", courseDescription: "Students develop and refine their reading skills, learn additional vocabulary, and learn more complex language structures and syntax. Through translation and interpretation, students gain a greater understanding of the foundation of Western government and civilization.", time: 75});//Latin 3
Classes[i++]=({header: "World Languages", name:"Spanish 1", courseDescription: "Students will learn to use simple sentence structures and basic language structures to discuss about Personal and Family Life, School Life, Social Life, and Community Life. They will develop their listening, speaking, reading, and writing skills.", time: 50});//Spanish 1
Classes[i++]=({header: "World Languages", name:"Spanish 2", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to function in real-life situations using more complex sentences and language structures. They will real material on familiar topics and produce short writing samples. ", time: 60});//Spanish 2
Classes[i++]=({header: "World Languages", name:"Spanish 3", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to use more complex language structures on more abstract concepts. The themes of the class include Rights and Responsibilities, Future Plans and Choices, Teen Culture, Environment, and Humanities.", time: 75});//Spanish 3
Classes[i++]=({header: "World Languages", name:"American Sign Language 1", courseDescription: "Students develop the ability to communicate about Personal and Family Life, School Life, Social Life, and Community Life using simple sentences containing basic language structure. This course counts towards the world languages course for the Advanced Studies Diploma.", time: 50});//American Sign Language 1
Classes[i++]=({header: "World Languages", name:"American Sign Language 2", courseDescription: "Students learn to function in real-life situations using more complex language structures and a wider range of vocabulary. Explore themes of Home Life, Student Life, Leisure Time, and Vacation and Travel. ", time: 50});//American Sign Language 2
Classes[i++]=({header: "World Languages", name:"Italian 1", courseDescription: "Students will learn to use simple sentence structures and basic language structures to discuss about Personal and Family Life, School Life, Social Life, and Community Life. They will develop their listening, speaking, reading, and writing skills.", time: 20});//Italian 1
Classes[i++]=({header: "World Languages", name:"Italian 2", courseDescription: "Students continue to develop their skills in listening, speaking, reading, and writing, while learning how to function in real-life situations using more complex sentences and language structures. They will real material on familiar topics and produce short writing samples. ", time: 20});//Italian 2

//HEALTH AND PHYSICAL EDUCATION
/*done*/
Classes[i++]=({header: "Health and Physical Education", name:"HPE 9 ", courseDescription: "Students gain knowledge and skills in a variety of individual, dual, and team sports/activities to develop competencies to promote an active lifestyle.", time: 10});//HPE 9
Classes[i++]=({header: "Health and Physical Education", name:"Adapted PE (9/10)", courseDescription: "The adapted physical education elective course builds on the knowledge and skills acquired in 9th and 10th grade and is designed for students who have IEPs indicating adapted physical education services in a special education setting", time: 0});//Adapted PE (9/10)
Classes[i++]=({header: "Health and Physical Education", name:"Sports Medicine", courseDescription: "Students will study and apply concepts related to medical professions, anatomy and physiology of skeletal and muscular systems, kinesiology, types of injuries, injury prevention and nutrition.", time: 20});//Sports Medicine

//STUDENT RESOURCES
/*INCOMPLETE*/
//Classes[i++]=({header: "Student Resources", name:"Developmental Reading (SCLD)", courseDescription: "This course is designed to provide direct, explicit and intensive reading instruction to students who are reading two or more years below grade level. Basic objectives of this reading course are focused on closing the gap between the students’ present level of performance and the level of performance needed to successfully access the general curriculum.", time: 0});//Developmental Reading (SCLD)
//Classes[i++]=({header: "Student Resources", name:"Developmental Reading (SCSPED)", courseDescription: "This course is designed to provide direct, explicit and intensive reading instruction to students who are reading two or more years below grade level. Basic objectives of this reading course are focused on closing the gap between the students’ present level of performance and the level of performance needed to successfully access the general curriculum.", time: 0});//Developmental Reading (SCSPED)
Classes[i++]=({header: "Student Resources", name:"Developmental Reading (CSS)", courseDescription: "This course is designed to provide direct, explicit and intensive reading instruction to students who are reading two or more years below grade level. Basic objectives of this reading course are focused on closing the gap between the students’ present level of performance and the level of performance needed to successfully access the general curriculum.", time: 0});//Developmental Reading (CSS)
//Classes[i++]=({header: "Student Resources", name:"Developmental Reading (SCHI)", courseDescription: "This course is designed to provide direct, explicit and intensive reading instruction to students who are reading two or more years below grade level. Basic objectives of this reading course are focused on closing the gap between the students’ present level of performance and the level of performance needed to successfully access the general curriculum.", time: 0});//Developmental Reading (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Literacy LAB 1 (SCHI)", courseDescription: "course emphasizes the reading comprehension skills necessary for understanding the content of mathematics, science, social studies, and English, and the communication skills appropriate across disciplines.  ", time: 0});//Literacy LAB 1 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Literacy LAB 2 (SCLD)", courseDescription: " For 10th graders only", time: 0});//Literacy LAB 2 (SCLD)
Classes[i++]=({header: "Student Resources", name:"Algebra 1 Part 1 (SCLD)", courseDescription: " This course extends students' knowledge and understanding of the real number system and its properties through the study of variables, expressions, equations, inequalities, and analysis of data derived from real-world phenomena. Emphasis is placed on making connections in algebra to geometry and statistics. Calculator and computer technologies will be used as tools wherever appropriate.", time: 60});//Algebra 1 Part 1 (SCLD)
Classes[i++]=({header: "Student Resources", name:"Algebra 1 Part 1 (CSS)", courseDescription: " This course extends students' knowledge and understanding of the real number system and its properties through the study of variables, expressions, equations, inequalities, and analysis of data derived from real-world phenomena. Emphasis is placed on making connections in algebra to geometry and statistics. Calculator and computer technologies will be used as tools wherever appropriate.", time: 40});//Algebra 1 Part 1 (CSS)
//Classes[i++]=({header: "Student Resources", name:"Algebra 1 Part 1 (SCHI)", courseDescription: " This course extends students' knowledge and understanding of the real number system and its properties through the study of variables, expressions, equations, inequalities, and analysis of data derived from real-world phenomena. Emphasis is placed on making connections in algebra to geometry and statistics. Calculator and computer technologies will be used as tools wherever appropriate.", time: 0});//Algebra 1 Part 1 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Geometry/Part 1 (SCHI)", courseDescription: "The first part of Geometry. ", time: 10});//Geometry/Part 1 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Individualized Math (SCLD)", courseDescription: " The course is designed for WIDA ELP Level 1 & 2 students with gaps in mathematics to support the development of the mathematics and language skills necessary for success in Algebra 1. Problem solving, communication, concept representation, and connections among mathematical ideas are presented in a hands-on learning environment. ", time: 0});//Individualized Math (SCLD)
Classes[i++]=({header: "Student Resources", name:"Individualized Math (CSS)", courseDescription: " The course is designed for WIDA ELP Level 1 & 2 students with gaps in mathematics to support the development of the mathematics and language skills necessary for success in Algebra 1. Problem solving, communication, concept representation, and connections among mathematical ideas are presented in a hands-on learning environment. ", time: 15});//Individualized Math (CSS)
//Classes[i++]=({header: "Student Resources", name:"Individualized Math (SCHI)", courseDescription: " The course is designed for WIDA ELP Level 1 & 2 students with gaps in mathematics to support the development of the mathematics and language skills necessary for success in Algebra 1. Problem solving, communication, concept representation, and connections among mathematical ideas are presented in a hands-on learning environment. ", time: 0});//Individualized Math (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Individualized Math (SCSPED)", courseDescription: " The course is designed for WIDA ELP Level 1 & 2 students with gaps in mathematics to support the development of the mathematics and language skills necessary for success in Algebra 1. Problem solving, communication, concept representation, and connections among mathematical ideas are presented in a hands-on learning environment. ", time: 0});//Individualized Math (SCSPED)
//Classes[i++]=({header: "Student Resources", name:"Economics & Personal Finance (SCSPED)", courseDescription: "Instruction in economics and personal finance prepares students to function effectively as consumers, savers, investors, entrepreneurs, and active citizens. students learn how economies and markets operate and how the United States' economy is interconnected with the global economy. On a personal level, students learn that their own human capital (knowledge and skills) is their most valuable resource.", time: 0});//Economics & Personal Finance (SCSPED)
//Classes[i++]=({header: "Student Resources", name:"Strategies for Success (SCLD)", courseDescription: "This elective course is designed to provide support English Learners in core curricular areas and to provide direct instruction in specific learning strategies, study skills, time management, organization, and self-advocacy skills to develop the habits necessary for academic success. In addition, this course will teach strategies to enhance English language development in the four language domains of reading, writing, listening and speaking ", time: 0});//Strategies for Success (SCLD)
//Classes[i++]=({header: "Student Resources", name:"Strategies for Success (SCHI)", courseDescription: "This elective course is designed to provide support English Learners in core curricular areas and to provide direct instruction in specific learning strategies, study skills, time management, organization, and self-advocacy skills to develop the habits necessary for academic success. In addition, this course will teach strategies to enhance English language development in the four language domains of reading, writing, listening and speaking ", time: 0});//Strategies for Success (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Personal Development (SCSPED)", courseDescription: " This course is designed to provide instruction to enhance personal development and interpersonal skills for students with disabilities. In addition, this course will provide social and/or emotional support in order to progress in the general education curriculum.  The areas of instruction for this course include peer relations, self-management, academic skills, compliance skills, and assertion skills", time: 0});//Personal Development (SCSPED)
Classes[i++]=({header: "Student Resources", name:"Personal Development (CEDSS)", courseDescription: " This course is designed to provide instruction to enhance personal development and interpersonal skills for students with disabilities. In addition, this course will provide social and/or emotional support in order to progress in the general education curriculum.  The areas of instruction for this course include peer relations, self-management, academic skills, compliance skills, and assertion skills", time: 0});//Personal Development (CEDSS)
//Classes[i++]=({header: "Student Resources", name:"Personal Development (SCHI)", courseDescription: " This course is designed to provide instruction to enhance personal development and interpersonal skills for students with disabilities. In addition, this course will provide social and/or emotional support in order to progress in the general education curriculum.  The areas of instruction for this course include peer relations, self-management, academic skills, compliance skills, and assertion skills", time: 0});//Personal Development (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Career Prep (1 pd)", courseDescription: "This is an adapted curriculum elective geared to students needing intensive support. Instruction is very concrete with extensive physical modeling and assistance. The course will identify work-related abilities, provide training and work skills, and prepare students for post-secondary participation in community-based worksites.", time: 0});//Career Prep (1 pd)
//Classes[i++]=({header: "Student Resources", name:"Career Prep (2 pds)", courseDescription: "This is an adapted curriculum elective geared to students needing intensive support. Instruction is very concrete with extensive physical modeling and assistance. The course will identify work-related abilities, provide training and work skills, and prepare students for post-secondary participation in community-based worksites.", time: 0});//Career Prep (2 pds)
//Classes[i++]=({header: "Student Resources", name:"Foundations of Science (SCSPED)", courseDescription: "This course is designed to support instruction in the science content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students. ", time: 0});//Foundations of Science (SCSPED)
//Classes[i++]=({header: "Student Resources", name:"Foundations of Science (SCHI)", courseDescription: "This course is designed to support instruction in the science content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students. ", time: 0});//Foundations of Science (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Foundations of English (SCSPED)", courseDescription: "This course is designed to support instruction in the English content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students. ", time: 0});//Foundations of English (SCSPED)
//Classes[i++]=({header: "Student Resources", name:"Foundations of English (SCHI)", courseDescription: "This course is designed to support instruction in the English content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students. ", time: 0});//Foundations of English (SCHI)
//Classes[i++]=({header: "Student Resources", name:"American Sign Language 1 (SCHI)", courseDescription: "Students develop the ability to communicate about themselves and their immediate environment using simple sentences containing basic language structures. This communication is evidenced in signing, receiving signs and non-manual gestures, and reading. Students begin to explore and study the themes of Personal and Family Life, School Life, Social Life, and Community Life. ", time: 0});//American Sign Language 1 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"American Sign Language 2 (SCHI)", courseDescription: "Students continue to develop proficiency in American Sign Language. They learn to function in real-life situations using more complex language structures and a wider range of vocabulary. Students continue to explore as they study the themes of Home Life, Student Life, Leisure Time, and Vacation and Travel. ", time: 0});//American Sign Language 2 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"American Sign Language 3 (SCHI)", courseDescription: "Students continue to develop and refine their proficiency in American Sign Language. They communicate using more complex language structures on a variety of topics, moving from concrete to more abstract concepts. Students gain a deeper understanding of the world around them while studying Rights and Responsibilities, Future Plans and Choices, Teen Culture, Environment, and Humanities. ", time: 0});//American Sign Language 3 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Foundations of World History/Geo (SCSPED)", courseDescription: "Foundations of World History/Geography is a one-credit elective course designed to support in the World History content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students.", time: 0});//Foundations of World History/Geo (SCSPED)
//Classes[i++]=({header: "Student Resources", name:"Foundations of World History/ Geo (SCHI)", courseDescription: "Foundations of World History/Geography is a one-credit elective course designed to support in the World History content area; does not require SOL testing. Instruction is individualized based on needs identified in the IEP to help students gain a basic content vocabulary, knowledge and skills and designed to be taught at the learning pace of the individual students.", time: 0});//Foundations of World History/ Geo (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Life Skills (SCHI)", courseDescription: "This comprehensive individualized program is designed to prepare students for a style of living that will require a minimum of dependence on family. The course is geared to meet the needs of the students as they prepare to enter employment and emphasizes developing interpersonal skills, following directions, working independently, completing a task, and developing self-advocacy and other community living skills.", time: 0});//Life Skills (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Independent Living Skills", courseDescription: "This course, offered at Davis and Pulley Centers and STEP, is designed to teach students with disabilities skills for independent living.", time: 0});//Independent Living Skills
//Classes[i++]=({header: "Student Resources", name:"Studio Art & Design 1 (SCSPED)", courseDescription: "Explore a variety of exciting opportunities and materials to inform the artmaking process. Learn to think conceptually and realize potential as a creative and critical thinker in order to meet the challenges of 21st century living. Explore personal interests while developing skills in the areas of drawing, painting, printmaking, ceramics, sculpture, and digital media. ", time: 0});//Studio Art & Design 1 (SCSPED)
Classes[i++]=({header: "Student Resources", name:"Studio Art & Design 1 (CSS)", courseDescription: "Explore a variety of exciting opportunities and materials to inform the artmaking process. Learn to think conceptually and realize potential as a creative and critical thinker in order to meet the challenges of 21st century living. Explore personal interests while developing skills in the areas of drawing, painting, printmaking, ceramics, sculpture, and digital media. ", time: 0});//Studio Art & Design 1 (CSS)
//Classes[i++]=({header: "Student Resources", name:"Studio Art & Design 1 (SCHI)", courseDescription: "Explore a variety of exciting opportunities and materials to inform the artmaking process. Learn to think conceptually and realize potential as a creative and critical thinker in order to meet the challenges of 21st century living. Explore personal interests while developing skills in the areas of drawing, painting, printmaking, ceramics, sculpture, and digital media. ", time: 0});//Studio Art & Design 1 (SCHI)
//Classes[i++]=({header: "Student Resources", name:"Theatre Arts 1 (SCHI)", courseDescription: "Theatre Arts 1 provides students with a survey of the theatre arts, allowing student’s opportunities to experience and appreciate dramatic literature, and participate in the creative processes of performance and production. This course emphasizes skill development and provides theatrical opportunities that enable students to determine personal areas of interest. ", time: 0});//Theatre Arts 1 (SCHI)
Classes[i++]=({header: "Student Resources", name:"Music Sampler (SPED)", courseDescription: "Students are provided the opportunity to sample a variety of musical experiences in a non-performing music class. Course content includes beginning guitar and class piano experience, as well as various modules designed to assist students in developing music reading and composing skills. ", time: 0});//Music Sampler (SPED)

//FINE ARTS: VISUAL ARTS
/*done*/
Classes[i++]=({header: "Fine and Visual Arts", name:"Studio Art & Design 1", courseDescription: "Explore personal interests while developing skills in the areas of drawing, painting, printmaking, ceramics, sculpture, and digital media. Course content includes art production, art appreciation, and studies in visual culture.", time: 0});//Studio Art & Design 1
Classes[i++]=({header: "Fine and Visual Arts", name:"Computer Graphics 1", courseDescription: "Create personally expressive, original artworks using technology. Develop expertise in the use of computers, scanners, and digital cameras for artmaking. Students will use Adobe Photoshop, Adobe Illustrator, Bryce 3D, and Adobe Flash.", time: 0});//Computer Graphics 1
Classes[i++]=({header: "Fine and Visual Arts", name:"Photography 1", courseDescription: "Explore and practice black and white photographic processes and digital photographic processes to produce meaningful photographs that express ideas about experiences and observations of the world.", time: 25});//Photography 1
Classes[i++]=({header: "Fine and Visual Arts", name:"3-D Studio Art 1", courseDescription: "Develop skills and techniques in the use of materials and equipment to create 3D artworks that may include sculpture, ceramics, architecture, and other 3D forms.", time: 0});//3-D Studio Art 1

//FINE ARTS: PERFORMING ARTS
/*INCOMPLETE*/
Classes[i++]=({header: "Fine and Performing Arts", name:"Theatre Arts 1", courseDescription: "Provides students with a survey of the theatre arts, emphasizes skill development, and provides theatrical opportunities that enable students to determine personal areas of interest.", time: 5});//Theatre Arts 1
Classes[i++]=({header: "Fine and Performing Arts", name:"Technical Theatre 1", courseDescription: "Students explore various areas of technical theatre such as lighting, costumes, sound, scenery, makeup, properties, and theatre management. An analysis of dramatic literature leads students to an understanding of the design and production process.", time: 5});//Technical Theatre 1
Classes[i++]=({header: "Fine and Performing Arts", name:"Intermediate Band (Audition)", courseDescription: "Students continue developing as individual musicians and as members of a musical group. Emphasis is placed on the development of intermediate level technical and ensemble skills necessary for performance. Marching band techniques and performances may be included.", time: 100});//Intermediate Band (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Advanced Symphonic Band (Audition)", courseDescription: "Students in this course form the representative performing band for the school. Emphasis is placed on the sequential development of advanced technical skills and on the study of related literature. Based on successful completion of sequential concepts for each level, students will continue as specified in course level.", time: 100});//Advanced Symphonic Band (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Percussion Ensemble (Audition)", courseDescription: "Participation in marching band may be required for wind and/or percussion students. The percussion ensemble class is designed to meet specific needs of percussionists. Content includes study of the appropriate ensemble literature, and rehearsal and performance techniques from the various areas of musical composition.", time: 100});//Percussion Ensemble (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Intermediate Orchestra (Audition)", courseDescription: "Students continue developing as individual musicians and as members of a musical group. Emphasis is placed on the development of intermediate level technical and ensemble skills necessary for performance. Students must meet both the school day and outside of the school day participation requirements.", time: 100});//Intermediate Orchestra (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Advanced Orchestra (Audition)", courseDescription: "Students continue developing as individual musicians and as members of a musical group. Emphasis is placed on the development of advanced level technical and ensemble skills necessary for performance. Students must meet both the school day and outside of the school day participation requirements", time: 120});//Advanced Orchestra (Audition)
//Classes[i++]=({header: "Fine and Performing Arts", name:"Chamber Ensemble (Audition)", courseDescription: "In this class the students will learn skills relating to Chamber Ensemble. By audition only.", time:0});//Chamber Ensemble (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Guitar 1", courseDescription: "Students learn the fundamentals of guitar. Guitar instruction emphasizes basic technique, reading, progressions, and music theory. Instructional literature is selected from classical and contemporary repertoire.", time: 0});//Guitar 1
Classes[i++]=({header: "Fine and Performing Arts", name:"Guitar 2 (Audition)", courseDescription: "Students continue to develop skills on the guitar. Guitar instruction emphasizes intermediate technique, reading, progressions, and music theory. Instructional literature is selected from classical and contemporary repertoire.", time: 0});//Guitar 2 (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Guitar 3 (Audition)", courseDescription: "Students continue to develop skills on the guitar even further. Guitar instruction emphasizes intermediate technique, reading, progressions, and music theory. Instructional literature is selected from classical and contemporary repertoire.", time: 0});//Guitar 3 (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Intermediate Women's Chorus (Audition)", courseDescription: "Intermediate level women's chorus will provide for the continued study of correct vocal production, sight-singing and development of musicianship through the study of appropriate choral literature. Based on successful completion of sequential concepts for each level, students will continue as specified in course level.", time: 15});//Intermediate Women's Chorus (Audition)
Classes[i++]=({header: "Fine and Performing Arts", name:"Women's Chorus", courseDescription: "Students will participate in a chorus of women's voices. Emphasis is placed upon correct vocal performance techniques and sight-singing through the study of appropriate choral literature. Based on successful completion of sequential concepts for each level, students will continue as specified in course level.", time: 15});//Women's Chorus
Classes[i++]=({header: "Fine and Performing Arts", name:"Men's Chorus", courseDescription: "Students will participate in a chorus of men's voices. Emphasis is placed upon correct vocal performance techniques and sight-singing through the study of appropriate choral literature. Based on successful completion of sequential concepts for each level, students will continue as specified in course level.", time: 15});//Men's Chorus
Classes[i++]=({header: "Fine and Performing Arts", name:"Music Theory", courseDescription: "Emphasis is placed on developing and understanding basic music theory skills. Course content includes recognizing and notating: all major and minor scales, rhythms in simple and compound meters, and triadic chord structures. Composition skills in standard notation of simple melodies, with accompanying chords and keyboard performance of simple tunes.", time: 150});//Music Theory
Classes[i++]=({header: "Fine and Performing Arts", name:"Music Sampler 1 (SPED)", courseDescription: "Students will sample and study a variety of music.", time: 0});//Music Sampler 1 (SPED)

//BUISNESS/INFORMATION TECH & MARKETING
/*incomplete*/
/*wrong data for test reasons*/Classes[i++]=({header: "Business/Information Tech & Marketing", name:"Information Systems", time: 20});//Information Systems
//Classes[i++]=({header: "Business/Information Tech & Marketing", name:"Principles of Business and Marketing", courseDescription: "Students discover the roles of business in the free enterprise system and the global economy. Basic financial concepts of banking, insurance, credit, inheritance, taxation, and investments are investigated to provide a strong background as students prepare to make sound decisions as consumers, wage earners, and citizens. The real-world impact of technology, effective communication, and interpersonal skills is evident throughout the course. ", time: 0});//Principles of Business and Marketing
//Classes[i++]=({header: "Business/Information Tech & Marketing", name:"Programming", courseDescription: "Students explore computer concepts, apply logic procedures, and implement programming procedures with one or more languages, such as Visual Basic. Students use Graphical User Interfaces to develop interactive multimedia applications. In addition, HTML or JavaScript may be employed to create Web pages. ", time: 0});//Programming

//TECHNOLOGY AND ENGINEERING
/*done*/
Classes[i++]=({header: "Technology and Engineering", name:"Design & Technology", courseDescription: "This product-oriented course introduces the student to multimedia presentations, desktop publications, and web page creation. Hands-on activities are used as students develop advanced skills for creating desktop published, interactive multimedia, and Web-site projects. Students work with sophisticated hardware and software, applying skills to real-world projects. Internet research and copyright laws are emphasized. ", time: 0});//Design & Technology
Classes[i++]=({header: "Technology and Engineering", name:"Electronics 1", courseDescription: "Students explore career fields in electricity and electronics. The course includes information on electrical and electronic theory and applications, computer-aided instruction and circuit simulation, components, circuitry troubleshooting, use of test instruments and lab training devices, consumer information, and career opportunities.", time: 0});//Electronics 1
Classes[i++]=({header: "Technology and Engineering", name:"Basic Technical Drawing", courseDescription: "Students are taught to draw with technically acceptable stratgies. ", time: 25});//Basic Technical Drawing

//FAMILY & CONSUMER SCIENCES
/*done*/
Classes[i++]=({header: "Family & Consumer Sciences", name:"Gourmet & International Foods (full year)", courseDescription: "Students learn a vaeriety of recipes and techniques for cooking food. ", time: 0});//Gourmet & International Foods (full year)

//**SPORTS**
/*MILITARY TIME*/
var Sports = new Array();//Databse for all available sports name, hourStart, minStart, time
i=0;
Sports[i++]=({header: "spring", name: "Baseball", hourStart: [15, 16, 15, 15, 16, 9, 0], minStart: [ 30, 30, 30, 30, 30, 0, 0], hourEnd: [18, 21, 18, 18, 21, 11, 0], minEnd: [0, 0, 0, 0, 0, 30, 0]});//Baseball
Sports[i++]=({header: "winter", name: "Basketball (Boys)", hourStart: [15, 15, 15, 15, 15, 8, 0], minStart: [30, 15, 30, 30, 15, 0, 0], hourEnd: [17, 18, 17, 17, 18, 10, 0], minEnd: [30, 15, 30, 30, 15, 0, 0]});//Basketball (Boys)
Sports[i++]=({header: "winter", name: "Basketball (Girls)", hourStart: [17, 15, 17, 17, 15, 8, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [19, 17, 19, 19, 17, 10, 0], minEnd: [30, 30, 30, 30, 30, 0, 0]});//Basketball (Girls)
//Sports[i++]=({header: "fall", name: "Cheerleading", hourStart: [0,0,0,0,0,0,3], minStart: [0,0,0,0,0,0,3], hourEnd: [0,0,0,0,0,0,3], minEnd: [0,0,0,0,0,0,3]});//Cheerleading
Sports[i++]=({header: "fall", name: "Cross Country", hourStart: [15, 15, 15, 15, 15, 8, 0], minStart: [20, 20, 30, 20, 20, 0, 0], hourEnd: [17, 17, 19, 17, 17, 14, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Cross Country
//Sports[i++]=({header: "spring", name: "Crew", hourStart: [0,0,0,0,0,0,5], minStart: [0,0,0,0,0,0,6], hourEnd: [0,0,0,0,0,0,5], minEnd: [0,0,0,0,0,0,5]});//Crew
Sports[i++]=({header: "fall", name: "Field Hockey", hourStart: [19, 19, 18, 15, 18, 0, 0], minStart: [0, 0, 0, 30, 0, 0, 0], hourEnd: [21, 21, 21, 17, 21, 0, 0], minEnd: [0, 0, 30, 30, 30, 0, 0]});//Field Hockey
Sports[i++]=({header: "fall", name: "Varsity Football", hourStart: [16, 16, 16, 16, 15, 9, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [18, 18, 18, 17, 22, 11, 0], minEnd: [30, 30, 30, 30, 0, 0, 0]});//Varsity Football
Sports[i++]=({header: "fall", name: "JV Football", hourStart: [16, 16, 16, 17, 15, 9, 0], minStart: [0, 0, 0, 30, 0, 0, 0], hourEnd: [18, 18, 18, 19, 17, 11, 0], minEnd: [30, 30, 30, 30, 0, 0, 0]});//Swim/Dive
////Sports[i++]=({header: "winter", name: "Swim/Dive", hourStart: [0,0,0,0,0,0,9], minStart: [0,0,0,0,0,0,9], hourEnd: [0,0,0,0,0,0,9], minEnd: [0,0,0,0,0,0,9]});//Golf (Boys)
////Sports[i++]=({header: "fall", name: "Golf (Boys)", hourStart: [0,0,0,0,0,0,10], minStart: [0,0,0,0,0,0,10], hourEnd: [0,0,0,0,0,0,10], minEnd: [0,0,0,0,0,0,10]});//Golf (Girls)
////Sports[i++]=({header: "fall", name: "Golf (Girls)", hourStart: [0,0,0,0,0,0,11], minStart: [0,0,0,0,0,0,11], hourEnd: [0,0,0,0,0,0,11], minEnd: [0,0,0,0,0,0,11]});//Gymnastics
////Sports[i++]=({header: "winter", name: "Gymnastics", hourStart: [0,0,0,0,0,0,12], minStart: [0,0,0,0,0,0,12], hourEnd: [0,0,0,0,0,0,12], minEnd: [0,0,0,0,0,0,12]});//Indoor Track
////Sports[i++]=({header: "winter", name: "Indoor Track", hourStart: [0,0,0,0,0,0,13], minStart: [0,0,0,0,0,0,13], hourEnd: [0,0,0,0,0,0,13], minEnd: [0,0,0,0,0,0,13]});//Lacrosse (Boys)
Sports[i++]=({header: "spring", name: "Lacrosse (Boys)", hourStart: [16, 19, 16, 19, 16, 8, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [18, 21, 18, 21, 18, 10, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Lacrosse (Girls)
//Sports[i++]=({header: "spring", name: "Lacrosse (Girls)", hourStart: [0,0,0,0,0,0,15], minStart: [0,0,0,0,0,0,15], hourEnd: [0,0,0,0,0,0,15], minEnd: [0,0,0,0,0,0,15]});//Outdoor Track
Sports[i++]=({header: "spring", name: "Outdoor Track", hourStart: [15, 15, 15, 15, 15, 9, 0], minStart: [15, 15, 15, 15, 15, 0, 0], hourEnd: [17, 17, 17, 17, 17, 17, 0], minEnd: [30, 30, 30, 30, 30, 0, 0]});//Precisionettes
Sports[i++]=({header: "spring", name: "Precisionettes", hourStart: [15, 16, 0, 15, 0, 0, 0], minStart: [30, 30, 0, 30, 0, 0, 0], hourEnd: [18, 19, 0, 18, 0, 0, 0], minEnd: [0, 30, 0, 0, 0, 0, 0]});//Rifle
Sports[i++]=({header: "winter", name: "Rifle", hourStart: [0, 0, 0, 17, 0, 0, 0], minStart: [0, 0, 0, 0, 0, 0, 0], hourEnd: [0, 0, 0, 21, 0, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Soccer (Boys)
//Sports[i++]=({header: "spring", name: "Soccer (Boys)", hourStart: [0,0,0,0,0,0,19], minStart: [0,0,0,0,0,0,19], hourEnd: [0,0,0,0,0,0,19], minEnd: [0,0,0,0,0,0,19]});//Soccer (Girls)
//Sports[i++]=({header: "spring", name: "Soccer (Girls)", hourStart: [0,0,0,0,0,0,20], minStart: [0,0,0,0,0,0,20], hourEnd: [0,0,0,0,0,0,20], minEnd: [0,0,0,0,0,0,20]});//Softball
Sports[i++]=({header: "spring", name: "Softball", hourStart: [15, 16, 15, 15, 16, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [18, 21, 18, 18, 21, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Swim/Dive
//Sports[i++]=({header: "winter", name: "Swim/Dive", hourStart: [0,0,0,0,0,0,22], minStart: [0,0,0,0,0,0,22], hourEnd: [0,0,0,0,0,0,22], minEnd: [0,0,0,0,0,0,22]});//Tennis (Boys)
Sports[i++]=({header: "spring", name: "Tennis (Boys)", hourStart: [16, 15, 16, 15, 16, 0, 0], minStart: [0, 30, 0, 30, 0, 0, 0], hourEnd: [17, 18, 17, 18, 17, 0, 0], minEnd: [15, 45, 15, 45, 15, 0, 0]});//Tennis (Girls)
Sports[i++]=({header: "spring", name: "Tennis (Girls)", hourStart: [15, 15, 15, 15, 15, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [17, 18, 17, 18, 17, 0, 0], minEnd: [0, 45, 0, 45, 0, 0, 0]});//Volleyball
Sports[i++]=({header: "fall", name: "Volleyball", hourStart: [15, 15, 15, 15, 15, 0, 0], minStart: [30, 30, 30, 30, 30, 0, 0], hourEnd: [21, 21, 21, 21, 21, 0, 0], minEnd: [0, 0, 0, 0, 0, 0, 0]});//Varsity Wrestling
//Sports[i++]=({header: "winter", name: "Varsity Wrestling", hourStart: [0,0,0,0,0,0,26], minStart: [0,0,0,0,0,0,26], hourEnd: [0,0,0,0,0,0,26], minEnd: [0,0,0,0,0,0,26]});//Varsity Wrestling
//Sports[i++]=({header: "winter", name: "JV Wrestling", hourStart: [0,0,0,0,0,0,27], minStart: [0,0,0,0,0,0,27], hourEnd: [0,0,0,0,0,0,27], minEnd: [0,0,0,0,0,0,27]});//JV Wrestling

//**CLUBS**
var Clubs = new Array();
/*MILITARY TIME*/

i=0;
/*1*/Clubs[i++]=({header: "art",name: "Anime Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Anime Club
//*0*/Clubs[i++]=({header: "academic",name: "Astronomy Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Astronomy Club
//*0*/Clubs[i++]=({header: "sports", name: "Athletic Training Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Athletic Training Club
//*0*/Clubs[i++]=({header: "art", name: "Band", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Band
/*1*/Clubs[i++]=({header: "other",name: "Catholic Club", hourStart: 19, minStart: 30, hourEnd: 20, minEnd: 0, day: "Thu", weekly: true});//Catholic Club
//*0*/Clubs[i++]=({header: "academic",name: "Cavalcade (Newspaper)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Cavalcade (Newspaper)
//*0*/Clubs[i++]=({header: "academic",name: "Cavalier (Yearbook)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Cavalier (Yearbook)
/*1*/Clubs[i++]=({header: "academic",name: "Chess Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Mon", weekly: false});//Chess Club
//*0*/Clubs[i++]=({header: "art",name: "Chorus", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Chorus
//*0*/Clubs[i++]=({header: "other",name: "Class of 2016", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2016
//*0*/Clubs[i++]=({header: "other",name: "Class of 2017", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2017
//*0*/Clubs[i++]=({header: "other",name: "Class of 2018", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2018
//*0*/Clubs[i++]=({header: "other",name: "Class of 2019", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Class of 2019
//*0*/Clubs[i++]=({header: "sport",name: "Color Guard", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Color Guard
/*1*/Clubs[i++]=({header: "academic", name: "Computer Science", hourStart: 16, minStart: 0, hourEnd: 17, minEnd: 0, day: "Thu", weekly: true});//Computer Science
/*1*/Clubs[i++]=({header: "academic",name: "Deaf Academic Bowl", hourStart: 15, minStart: 10, hourEnd: 17, minEnd: 0, day: "Wed", weekly: true});//Deaf Academic Bowl
//*0*/Clubs[i++]=({header: "academic", name: "DECA", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//DECA
//*0*/Clubs[i++]=({header: "academic",name: "DECA Officers", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//DECA Officers
/*1*/Clubs[i++]=({header: "other",name: "Doctor Who Fan Club", hourStart: 15, minStart: 15, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Doctor Who Fan Club
/*1*/Clubs[i++]=({header: "academic",name: "Engineering Club/ACE Mentoring", hourStart: 16, minStart: 30, hourEnd: 18, minEnd: 0, day: "Wed", weekly: false});//Engineering Club/ACE Mentoring
//*0*/Clubs[i++]=({header: "volunteer",name: "Environment Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Environment Club
//*0*/Clubs[i++]=({header: "other",name: "Family, Career and Community Leaders of America (FCCLA)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Family, Career and Community Leaders of America (FCCLA)
//*0*/Clubs[i++]=({header: "sports",name: "Fellowship of Christian Athletes", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Fellowship of Christian Athletes
/*1*/Clubs[i++]=({header: "languages", name: "French Club", hourStart: 15, minStart: 15, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//French Club
//*0*/Clubs[i++]=({header: "languages", name: "French Honor Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//French Honor Society
/*1*/Clubs[i++]=({header: "other",name: "Gay-Straight Alliance (GSA)", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Gay-Straight Alliance (GSA)
/*1*/Clubs[i++]=({header: "languages",name: "German Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//German Club
/*1*/Clubs[i++]=({header: "languages",name: "German Honor Society", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//German Honor Society
/*1*/Clubs[i++]=({header: "sports",name: "Go Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Go Club
//*0*/Clubs[i++]=({header: "volunteer", name: "Habitat for Humanity", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Habitat for Humanity
/*1*/Clubs[i++]=({header: "art", name: "Hip Hop Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Tue", weekly: true});//Hip Hop Club
/*1*/Clubs[i++]=({header: "art",name: "Improv Club", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 15, day: "Tue", weekly: true});//Improv Club
//*0*/Clubs[i++]=({header: "art",name: "International Thespian Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//International Thespian Society
/*1*/Clubs[i++]=({header: "academic",name: "IT Girls", hourStart: 15, minStart: 0, hourEnd: 18, minEnd: 0, day: "Tue", weekly: false});//IT Girls
//*0*/Clubs[i++]=({header: "volunteer",name: "Key Club", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Key Club
//*0*/Clubs[i++]=({header: "other", name: "KFC (Kosher Food Club)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//KFC (Kosher Food Club)
/*1*/Clubs[i++]=({header: "languages",name: "Latin Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Thu", weekly: true});//Latin Club
/*1*/Clubs[i++]=({header: "languages",name: "Latin Honor Society", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Mon", weekly: false});//Latin Honor Society
//*0*/Clubs[i++]=({header: "academic",name: "Leadership", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Leadership
//*0*/Clubs[i++]=({header: "academic",name: "Math Honor Society  (Mu Alpha Theta)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Math Honor Society  (Mu Alpha Theta)
/*1*/Clubs[i++]=({header: "academic",name: "Math Team (JV)", hourStart: 15, minStart: 10, hourEnd: 15, minEnd: 40, day: "Wed", weekly: false});//Math Team (JV)
/*1*/Clubs[i++]=({header: "academic",name: "Math Team (Varsity)", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Wed", weekly: false});//Math Team (Varsity)
/*1*/Clubs[i++]=({header: "academic",name: "Model United Nations", hourStart: 15, minStart: 30, hourEnd: 16, minEnd: 30, day: "Wed", weekly: true});//Model United Nations
/*1*/Clubs[i++]=({header: "art",name: "National Art Honor Society", hourStart: 15, minStart: 30, hourEnd: 17, minEnd: 0, day: "Mon", weekly: false});//National Art Honor Society
/*1*/Clubs[i++]=({header: "academic",name: "National English Honor Society", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Tue", weekly: false});//National English Honor Society
//*0*/Clubs[i++]=({header: "academic",name: "National Honor Society", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 45, day: "Thu", weekly: false});//National Honor Society
/*1*/Clubs[i++]=({header: "volunteer",name: "Operation Patriot", hourStart: 15, minStart: 5, hourEnd: 15, minEnd: 30, day: "Wed", weekly: false});//Operation Patriot
//*0*/Clubs[i++]=({header: "art",name: "Orchestra", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Orchestra
//*0*/Clubs[i++]=({header: "art",name: "Page (Literary/Art Magazine)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Page (Literary/Art Magazine)
/*1*/Clubs[i++]=({header: "art",name: "Photography Club ", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Photography Club
/*1*/Clubs[i++]=({header: "art",name: "Poetry Club ", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Mon", weekly: false});//Poetry Club
//*1*/Clubs[i++]=({header: "volunteer",name: "Relay for Life", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Relay for Life
/*1*/Clubs[i++]=({header: "academic",name: "Robotics Club", hourStart: 15, minStart: 0, hourEnd: 18, minEnd: 0, day: "Tue, Thu", weekly: true});//Robotics Club
/*1*/Clubs[i++]=({header: "academic",name: "Scholastic Quiz Bowl /It's Academic", hourStart: 15, minStart: 10, hourEnd: 15, minEnd: 50, day: "Tue, Thu", weekly: true});//Scholastic Quiz Bowl /It's Academic
//*0*/Clubs[i++]=({header: "academic",name: "Science Olympiad", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Science Olympiad
/*1*/Clubs[i++]=({header: "academic", name: "Science National Honor Society", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 0, day: "Thu", weekly: false});//Science National Honor Society
/*1*/Clubs[i++]=({header: "academic",name: "Speech, Debate, & Forensics ", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Thu", weekly: true});//Speech, Debate, & Forensics
/*1*/Clubs[i++]=({header: "languages",name: "Spanish Club", hourStart: 15, minStart: 0, hourEnd: 16, minEnd: 30, day: "Wed", weekly: false});//Spanish Club
/*1*/Clubs[i++]=({header: "languages",name: "Spanish National Honor Society", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 0, day: "Wed", weekly: false});//Spanish National Honor Society
//*0*/Clubs[i++]=({header: "academic",name: "Student Advisory Council (SAC)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Student Advisory Council (SAC)
//*0*/Clubs[i++]=({header: "academic",name: "Student Government Association (SGA)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Student Government Association (SGA)
//*0*/Clubs[i++]=({header: "other", name: "Students Against Destructive Decisions (SADD)", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Students Against Destructive Decisions (SADD)
/*1*/Clubs[i++]=({header: "volunteer",name: "Student 2 Student (Ambassadors) ", hourStart: 15, minStart: 30, hourEnd: 16, minEnd: 30, day: "Mon", weekly: false});//Student 2 Student (Ambassadors)
/*1*/Clubs[i++]=({header: "academic",name: "Technology Student Association (TSA)", hourStart: 15, minStart: 10, hourEnd: 16, minEnd: 10, day: "Wed", weekly: false});//Technology Student Association (TSA)
//*0*/Clubs[i++]=({header: "art",name: "Tri M Music Honor Society", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Tri M Music Honor Society
//*0*/Clubs[i++]=({header: "volunteer",name: "Woodson Buddies", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Woodson Buddies
//*0*/Clubs[i++]=({header: "volunteer",name: "Young Hearts", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Young Hearts
//*0*/Clubs[i++]=({header: "other",name: "Young Republicans", hourStart: 0, minStart: 0, hourEnd: 0, minEnd: 0, day: "", weekly: false});//Young Republicans

//Extra Clubs and thingys
var Stupid=new Array();
i=0;
/*1*/Stupid[i++]=({name: "Model United Nations Sat", hourStart: 9, minStart: 0, hourEnd:17, minEnd: 0, day: "Sat", weekly: false});//Model United Nations
/*1*/Stupid[i++]=({name: "Model United Nations Fri", hourStart: 16, minStart: 30, hourEnd: 21, minEnd: 0, day: "Fri", weekly: false});//Model United Nations
/*1*/Stupid[i++]=({name: "Relay for Life Smoothie", hourStart: 15, minStart: 0, hourEnd: 15, minEnd: 30, day: "Fri", weekly: true});//Relay for Life



