
//  MOBILE MENU 
function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("show");
}

// DATA: ARRAY OF OBJECTs
let students = [
  {id: 1, name: "Mary Wanjiku", age: 21, gender: "Female", course: "Software Development", marks: 85},
  {id: 2, name: "John Kamau", age: 23, gender: "Male", course: "Software Development", marks: 65}
];
let nextId = 3;

// PERFORMANCE FUNCTION 
function getPerformance(marks){
  if(marks >= 80) return {text:"Excellent", class:"excellent"};
  else if(marks >= 70) return {text:"Very Good", class:"verygood"};
  else if(marks >= 60) return {text:"Good", class:"good"};
  else if(marks >= 50) return {text:"Average", class:"average"};
  else return {text:"Failed", class:"failed"};
}

// DISPLAY STUDENTS
function displayStudents(){
  let table = document.getElementById("studentTable");
  if(!table) return;
  let filter = document.getElementById("filterCourse").value;
  let searchText = "";
  let searchBox = document.getElementById("searchInput");
  if(searchBox) searchText = searchBox.value.toLowerCase();

  table.innerHTML = "";
  let total = 0, passed = 0, failed = 0, count = 0;
  let highest = null, lowest = null;

  for(let i = 0; i < students.length; i++){
    let s = students[i];
    if(filter !== "" && s.course !== filter) continue;
    if(searchText !== "" && !s.name.toLowerCase().includes(searchText)) continue;

    let perf = getPerformance(s.marks);
    let row = document.createElement("tr");
    row.innerHTML = `<td>${s.name}</td><td>${s.age}</td><td>${s.gender}</td><td>${s.course}</td><td>${s.marks}</td><td><span class="badge ${perf.class}">${perf.text}</span></td>
    <td><button onclick="updateMarks(${s.id})">Update</button> <button onclick="deleteStudent(${s.id})">Delete</button></td>`;
    table.appendChild(row);

    total += s.marks; count++;
    if(s.marks >= 50) passed++; else failed++;
    if(!highest || s.marks > highest.marks) highest = s;
    if(!lowest || s.marks < lowest.marks) lowest = s;
  }

  // Dashboard
  document.getElementById("totalStudents").textContent = count;
  document.getElementById("passedStudents").textContent = passed;
  document.getElementById("failedStudents").textContent = failed;
  document.getElementById("avgMarks").textContent = count > 0 ? (total / count).toFixed(1) : 0;
  let topEl = document.getElementById("topBottom");
  if(highest && topEl) topEl.textContent = ` Highest: ${highest.name} (${highest.marks}) | Lowest: ${lowest.name} (${lowest.marks})`;
}

//  REGISTER STUDENT 
let form = document.getElementById("studentForm");
if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("fullName").value.trim();
    let age = Number(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let course = document.getElementById("course").value;
    let marks = Number(document.getElementById("marks").value);
    let msg = document.getElementById("formMessage");

    // Validation
    if(name === "" || gender === "" || course === "" || !age || document.getElementById("marks").value === ""){
      msg.textContent = "Error: All fields are required!";
      msg.className = "error"; return;
    }
    if(isNaN(age) || age <= 0){
      msg.textContent = "Error: Age must be a valid number!";
      msg.className = "error"; return;
    }
    if(isNaN(marks) || marks < 0 || marks > 100){
      msg.textContent = "Error: Marks must be between 0 and 100!";
      msg.className = "error"; return;
    }

    students.push({id: nextId++, name: name, age: age, gender: gender, course: course, marks: marks});
    msg.textContent = `Success: ${name} registered successfully!`;
    msg.className = "success";
    form.reset();
    displayStudents();
  });
}

//  SEARCH 
function searchStudent(){
  displayStudents();
  let search = document.getElementById("searchInput").value.trim().toLowerCase();
  let msg = document.getElementById("searchMessage");
  if(search === ""){ msg.textContent = ""; return; }
  let found = false;
  for(let s of students){ if(s.name.toLowerCase().includes(search)) found = true; }
  msg.textContent = found ? "" : "No matching student found.";
  msg.className = "error";
}

//  DELETE & UPDATE 
function deleteStudent(id){
  if(confirm("Are you sure you want to delete this student?")){
    students = students.filter(s => s.id !== id);
    displayStudents();
  }
}
function updateMarks(id){
  let newMarks = prompt("Enter new marks (0-100):");
  if(newMarks === null) return;
  newMarks = Number(newMarks);
  if(isNaN(newMarks) || newMarks < 0 || newMarks > 100){
    alert("Invalid marks! Must be 0-100"); return;
  }
  for(let s of students){ if(s.id === id) s.marks = newMarks; }
  displayStudents();
  alert("Marks updated successfully!");
}
function sortByMarks(){
  students.sort((a,b) => b.marks - a.marks);
  displayStudents();
}
function clearAllStudents(){
  if(confirm("Clear all students?")){
    students = [];
    displayStudents();
  }
}

// CONTACT FORM 
let contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let subject = document.getElementById("contactSubject").value.trim();
    let message = document.getElementById("contactText").value.trim();
    let msg = document.getElementById("contactMessage");

    if(name === "" || email === "" || subject === "" || message === ""){
      msg.textContent = "Error: All fields are required!"; msg.className = "error"; return;
    }
    if(!email.includes("@") || !email.includes(".")){
      msg.textContent = "Error: Enter a valid email with @ and ."; msg.className = "error"; return;
    }
    if(message.length < 10){
      msg.textContent = "Error: Message must be at least 10 characters long!"; msg.className = "error"; return;
    }
    msg.textContent = "Thank you, your message has been sent!";
    msg.className = "success";
    contactForm.reset();
  });
}

// Initial load
displayStudents();
