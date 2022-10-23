var filterdatalength, currentdataindex, filteredarray, jsondata;
let techskills = "";
let hobbies = "";
window.onload = init;

function getJsonData() {
  return fetch("asset/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var jsondata = new Array();
      jsondata.push(data);
      window.sessionStorage.setItem("resumedata", JSON.stringify(jsondata));
    });
}
function init() {
  var validUser = JSON.parse(window.localStorage.getItem("isloggedin"));
  const { host, hostname, href, origin, pathname, port, protocol, search } =
    window.location;

  console.log(pathname);
  if (pathname === "/index.html" && validUser) {
    location.href = "/resume.html";
  } else if (pathname === "/index.html" && !validUser) {
    var a = new Array();
    up1 = new Object();
    up1 = {
      name: "rahuldubey@gmail.com",
      password: btoa("rahul@123"),
    };
    a.push(up1);
    // console.log(a)
    window.localStorage.setItem("all_users", JSON.stringify(a));
  } else if (pathname === "/resume.html" && validUser) {
    var jsondata = JSON.parse(window.sessionStorage.getItem("resumedata"));
    if (!jsondata) {
      getJsonData();
    }
    fetchall();
  } else {
    location.href = "/index.html";
  }
}
function Login() {
  let isvalid = false;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username != "" && password != "") {
    var validUser = JSON.parse(window.localStorage.getItem("all_users"));
    for (let key of validUser) {
      if (key["name"] === username && key["password"] === btoa(password)) {
        isvalid = true;
        break;
      }
    }

    console.log(isvalid);
    if (isvalid) {
      var b = new Array();
      up2 = new Object();
      up2 = {
        status: true,
      };
      b.push(up2);
      // console.log(a)
      window.localStorage.setItem("isloggedin", JSON.stringify(b));
      location.href = "/resume.html";
    } else {
      document.getElementById("msg").innerHTML = "invalid username/password.";
    }
  }
}

function addskills(item, index) {
  techskills +=
    '<div class="row"> <div class="info-right"><span>' +
    item +
    "</span></div></div>";
}
function addhobbies(item, index) {
  hobbies +=
    '<div class="row"> <div class="info-right"><span>' +
    item +
    "</span></div></div>";
}
function putData() {
  var data = filteredarray[currentdataindex];
  console.log(data);
  // name
  document.getElementById("name").innerHTML = data["basics"]["name"];
  document.getElementById("AppliedFor").innerHTML =
    data["basics"]["AppliedFor"];
  document.getElementById("email").innerHTML = data["basics"]["email"];
  document.getElementById("phone").innerHTML = data["basics"]["phone"];
  document.getElementById("profiles").href = data["basics"]["profiles"]["url"];
  document.getElementById("profiles").innerHTML =
    data["basics"]["profiles"]["network"];
  techskills = "";
  skills = data["skills"]["keywords"];
  skills.forEach(addskills);
  document.getElementById("tech-skills").innerHTML = techskills;
  hobbies = "";
  interests = data["interests"]["hobbies"];
  interests.forEach(addhobbies);
  document.getElementById("hobbies").innerHTML = hobbies;

  document.getElementById("companyname").innerHTML =
    data["work"]["Company Name"];
  document.getElementById("enddate").innerHTML = data["work"]["End Date"];
  document.getElementById("position").innerHTML = data["work"]["Position"];
  document.getElementById("startdate").innerHTML = data["work"]["Start Date"];
  document.getElementById("summary").innerHTML = data["work"]["Summary"];

  document.getElementById("projectname").innerHTML = data["projects"]["name"];
  document.getElementById("projectdesc").innerHTML =
    data["projects"]["description"];

  document.getElementById("UG").innerHTML =
    data["education"]["UG"]["institute"] +
    "," +
    data["education"]["UG"]["course"] +
    "," +
    data["education"]["UG"]["Start Date"] +
    "," +
    data["education"]["UG"]["End Date"] +
    "," +
    data["education"]["UG"]["cgpa"];
  document.getElementById("PU").innerHTML =
    data["education"]["Senior Secondary"]["institute"] +
    "," +
    data["education"]["Senior Secondary"]["cgpa"];
  document.getElementById("HS").innerHTML =
    data["education"]["High School"]["institute"] +
    "," +
    data["education"]["High School"]["cgpa"];

  document.getElementById("icompanyname").innerHTML =
    data["Internship"]["Company Name"];
  document.getElementById("ienddate").innerHTML =
    data["Internship"]["End Date"];
  document.getElementById("iposition").innerHTML =
    data["Internship"]["Position"];
  document.getElementById("istartdate").innerHTML =
    data["Internship"]["Start Date"];
  document.getElementById("isummary").innerHTML = data["Internship"]["Summary"];
  document.getElementById("asummary").innerHTML =
    data["achievements"]["Summary"];
}
function getNext() {
  filterdatalength = filteredarray.length - 1;
  currentdataindex = currentdataindex + 1;

  if (currentdataindex < filteredarray.length - 1) {
    document.getElementById("nextbtn").className = "next-btn";
  } else {
    document.getElementById("nextbtn").className = "next-btn d-none";
  }
  if (currentdataindex - 1 >= 0) {
    document.getElementById("prevbtn").className = "pev-btn";
  } else if (currentdataindex - 1 < 0) {
    document.getElementById("prevbtn").className = "pev-btn d-none";
  }
  putData();
}

function getPrev() {
  filterdatalength = filteredarray.length - 1;
  currentdataindex = currentdataindex - 1;

  if (currentdataindex < filteredarray.length - 1) {
    document.getElementById("nextbtn").className = "next-btn";
  } else {
    document.getElementById("nextbtn").className = "next-btn d-none";
  }
  if (currentdataindex - 1 >= 0) {
    document.getElementById("prevbtn").className = "pev-btn";
  } else if (currentdataindex - 1 < 0) {
    document.getElementById("prevbtn").className = "pev-btn d-none";
  }
  putData();
}
function fetchall() {
  jsondata = JSON.parse(window.sessionStorage.getItem("resumedata"));
  filteredarray = jsondata[0]["resume"];
  console.log(filteredarray);
  if (filteredarray.length > 0) {
    filterdatalength = filteredarray.length - 1;
    currentdataindex = 0;

    document.getElementById("notfound").className = "container  d-none";
    document.getElementById("resumetemp").className = "container";
    if (currentdataindex < filteredarray.length - 1) {
      document.getElementById("nextbtn").className = "next-btn";
    } else {
      document.getElementById("nextbtn").className = "next-btn d-none";
    }
    if (currentdataindex - 1 >= 0) {
      document.getElementById("prevbtn").className = "pev-btn";
    } else if (currentdataindex - 1 < 0) {
      document.getElementById("prevbtn").className = "pev-btn d-none";
    }
    putData();
  }
}
function getdata(event) {
  var search = document.getElementById("searchbox").value;
  if (search != "") {
    jsondata = JSON.parse(window.sessionStorage.getItem("resumedata"));
    filteredarray = jsondata[0]["resume"].filter(
      (jsondata) =>
        jsondata.basics.AppliedFor.toLowerCase() === search.toLowerCase()
    );
    console.log(filteredarray.length);
    if (filteredarray.length > 0) {
      filterdatalength = filteredarray.length - 1;
      currentdataindex = 0;

      document.getElementById("notfound").className = "container  d-none";
      document.getElementById("resumetemp").className = "container";
      if (currentdataindex < filteredarray.length - 1) {
        document.getElementById("nextbtn").className = "next-btn";
      } else {
        document.getElementById("nextbtn").className = "next-btn d-none";
      }
      if (currentdataindex - 1 >= 0) {
        document.getElementById("prevbtn").className = "pev-btn";
      } else if (currentdataindex - 1 < 0) {
        document.getElementById("prevbtn").className = "pev-btn d-none";
      }
      putData();
    } else {
      document.getElementById("notfound").className = "container";
      document.getElementById("resumetemp").className = "container d-none";
      document.getElementById("nextbtn").className = "next-btn d-none";
      document.getElementById("prevbtn").className = "pev-btn d-none";
    }
  } else {
    fetchall();
  }
}
