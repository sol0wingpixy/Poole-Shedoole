
/*(function(){*/
var English = ([
	{"id":1,"Course":"English 9","Homework Time":"18" },
	{"id":2,"Course":"English 9 HN","Homework Time":"30"},
	{"id":3,"Course":"English 9(LDTeam)","Homework Time":"15"},
	{"id":4,"Course":"English 9(SCLD)","Homework Time":"0"},
	{"id":5,"Course":"English 9(CSS)","Homework Time":"6"},
	{"id":6,"Course":"English 9(SCHI)","Homework Time":"18"},
	{"id":7,"Course":"English 9(SCSPED)","Homework Time":"6"},
	{"id":8,"Course":"Creative Writing(Fall/Spring))","Homework Time":"3"},
	{"id":9,"Course":"Development Reading","Homework Time":"0"},
	{"id":10,"Course":"Journalism","Homework Time":"7"},
	{"id":11,"Course":"Photojournalism","Homework Time":"7"},
	{"id":12,"Course":"Film Study","Homework Time":"3"},
	{"id":13,"Course":"Literacy Lab 1","Homework Time":"0"},
	{"id":14,"Course":"Debate/ Forensics","Homework Time":"0"},             
]);
var Science = ([
	{"id":1,"Course":"Biology 1","Homework Time":"8"},	
	{"id":2,"Course":"Biology 1 HN","Homework Time":"12"},
	{"id":3,"Course":"Biology 1(LDTeam)","Homework Time":"8"},
	{"id":4,"Course":"Biology 1(SCLD)","Homework Time":"10"},
	{"id":5,"Course":"Biology 1(CSS)","Homework Time":"10"},
	{"id":6,"Course":"Biology 1(SCHI)","Homework Time":"10"},
	{"id":7,"Course":"Biology 1(SCSPED)","Homework Time":"10"},
	{"id":8,"Course":"Biology 1(ESOL Team)","Homework Time":"10"},
]);
var SocialStudies = ([
	{"id":1,"Course":"World History & Geography 1","Homework Time":"36"},	
	{"id":2,"Course":"World History & Geography 1 HN","Homework Time":"76"},
	{"id":3,"Course":"World History & Geography 1(LDTeam)","Homework Time":"36"},
	{"id":4,"Course":"World History & Geography 1(SCLD)","Homework Time":"15"},
	{"id":5,"Course":"World History & Geography 1(CSS)","Homework Time":"12"},
	{"id":6,"Course":"World History & Geography 1(SCHI)","Homework Time":"0"},
	{"id":7,"Course":"World History & Geography 1(SCSPED)","Homework Time":"0"},
	{"id":8,"Course":"World History & Geography 1(ESOL Team)","Homework Time":"0"},
	{"id":9,"Course":"World History & Geography 2","Homework Time":"24"},	
	{"id":10,"Course":"World History & Geography 2HN","Homework Time":"36"}	
]);
var Mathematics = ([
	{"id":1,"Course":"Algebra 1","Homework Time":"18"},	
	{"id":2,"Course":"Algebra 1 HN","Homework Time":"18"},
	{"id":3,"Course":"Algebra 1(LDTeam)","Homework Time":"18"},
	{"id":4,"Course":"Algebra 1(SCLD)","Homework Time":"18"},
	{"id":5,"Course":"Algebra 1(CSS)","Homework Time":"24"},
	{"id":6,"Course":"Algebra 1(SCHI)","Homework Time":"24"},
	{"id":7,"Course":"Geometry","Homework Time":"20"},	
	{"id":8,"Course":"Geometry HN","Homework Time":"25"},
	{"id":9,"Course":"Geometry(LDTeam)","Homework Time":"20"},
	{"id":10,"Course":"Geometry(SCLD)","Homework Time":"20"},
	{"id":11,"Course":"Geometry(CSS)","Homework Time":"15"},
	{"id":12,"Course":"Geometry(SCHI)","Homework Time":"0"},
	{"id":13,"Course":"Algebra 2","Homework Time":"18"},
	{"id":14,"Course":"Algerba 2HN","Homework Time":"20"},
	{"id":15,"Course":"Computer Science","Homework Time":"12"},
]);
var ESOL = ([
	{"id":1,"Course":"ESOL Level 2/3","Homework Time":"12"},	
	{"id":2,"Course":"ESOL Level 3 Developing","Homework Time":"12"},
	{"id":3,"Course":"ESOL Level 4 Expanding","Homework Time":"12"},
	{"id":4,"Course":"English 9 Transitional(ESOL)","Homework Time":"12"},
	{"id":5,"Course":"Individualized Math","Homework Time":"12"},
]);
var WorldLanguages = ([
	{"id":1,"Course":"French 1","Homework Time":"10"},	
	{"id":2,"Course":"French 2","Homework Time":"10"},
	{"id":3,"Course":"French 3","Homework Time":"12"},
	{"id":4,"Course":"German 1","Homework Time":"10"},
	{"id":5,"Course":"German 2","Homework Time":"10"},
	{"id":6,"Course":"German 3","Homework Time":"12"},
	{"id":7,"Course":"Latin 1","Homework Time" :"6"},	
	{"id":8,"Course":"Latin 2","Homework Time" :"12"},
	{"id":9,"Course":"Latin 3","Homework Time" :"15"},
	{"id":10,"Course":"Spanish 1","Homework Time":"10"},
	{"id":11,"Course":"Spanish 2","Homework Time":"12"},
	{"id":12,"Course":"Spanish 3","Homework Time":"15"},
	{"id":13,"Course":"American Sign Language 1","Homework Time":"10"},
	{"id":14,"Course":"American Sign Language 2","Homework Time":"10"},
	{"id":15,"Course":"Latin 1","Homework Time":"10"},
	{"id":16,"Course":"Latin 2","Homework Time":"10"},
]);
var PerformingArts = ([
	{"id":1,"Course":"Theatre Arts 1","Homework Time":"1"},
	{"id":2,"Course":"Technical Theatre 1","Homework Time":"1"},
	{"id":3,"Course":"Intermediate Band (Audition)","Homework Time":"20"},
	{"id":4,"Course":"Advanced Symphonic Band (Audition)","Homework Time":"20"},
	{"id":5,"Course":"Percussion Ensemble (Audition)","Homework Time":"20"},
	{"id":6,"Course":"Intermediate Orchestra (Audition)","Homework Time":"20"},
	{"id":7,"Course":"Advanced Orchestra (Audition)","Homework Time":"24"},
	{"id":8,"Course":"Chamber Ensemble (Audition)","Homework Time":"0"},
	{"id":9,"Course":"Guitar 1","Homework Time":"0"},
	{"id":10,"Course":"Guitar 2 (Audition)","Homework Time":"0"},
	{"id":11,"Course":"Guitar 3 (Audition)","Homework Time":"0"},
	{"id":12,"Course":"Jazz Ensemble ( (9th period only)","Homework Time":"0"},
	{"id":13,"Course":"Intermediate Women’s Chorus (Audition)","Homework Time":"3"},
	{"id":14,"Course":"Women’s Chorus","Homework Time":"3"},
	{"id":15,"Course":"Men’s Chorus","Homework Time":"3"},
	{"id":16,"Course":"Music Theory","Homework Time":"30"},
	{"id":17,"Course":"Music Sampler 1 (SPED)","Homework Time":"0"},
]);
var VisualArts = ([
	{"id":1,"Course":"Studio Art & Design 1","Homework Time":"0"},
	{"id":2,"Course":"Computer Graphics 1","Homework Time":"0"},
	{"id":3,"Course":"Photography 1","Homework Time":"5"},
	{"id":4,"Course":"3-D Studio Art 1","Homework Time":"0"},
]);
var PE = ([
	{"id":1,"Course":"HPE 9 ","Homework Time":"2"},
	{"id":2,"Course":"Adapted PE (9/10)","Homework Time":"0"},
	{"id":3,"Course":"Sports Medicine","Homework Time":"4"},
]);
var Tech = ([
	{"id":1,"Course":"Design & Technology","Homework Time":"0"},
	{"id":2,"Course":"Electronics 1","Homework Time":"0"},
	{"id":3,"Course":"Basic Technical Drawing","Homework Time":"0"},
]);
/*});*/