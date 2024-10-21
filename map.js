let students = [
  {
    id: 1,
    name: "Faris Talal",
    age: 16,
    mark: 85,
    school: "Greenwood High",
  },
  {
    id: 2,
    name: "Ibrahim Taher",
    age: 17,
    mark: 90,
    school: "Blue Valley School",
  },
  {
    id: 3,
    name: "Abdulla Talal",
    age: 16,
    mark: 88,
    school: "Sunrise Academy",
  },
  {
    id: 4,
    name: "Shane White",
    age: 18,
    mark: 92,
    school: "Northview High",
  },
];
console.log(students);

//Use map to create a new updated array that has only name

let q1 = students.map((e) => {
  return e.name;
});

let studentsNames = q1;

console.log(studentsNames);

//Use map to create a new updated array that new school value for everyone "Northview High"

let q2 = students.map((e) => {
  return { ...e, school: "Northview High" };
});

let updatedSchool = q2;

console.log(updatedSchool);

//use map to change user that has age: 18 to 21

let q3 = students.map((e) => {
  if (e.age == 18) {
    return { ...e, age: "21" };
  } else {
    return e;
  }
});

let updatedAge = q3;

console.log(updatedAge);

//use map to add property pass if grade is more than 90

let q4 = students.map((e) => {
  if (e.mark >= 90) {
    return { ...e, pass: "true" };
  } else {
    return { ...e, pass: "false" };
  }
});

let pass = q4;

console.log(pass);

//use map to delete property school from user with age 18

let q5 = students.map((e) => {
  if (e.age == 18) {
    delete e.school;
    return e;
  } else {
    return e;
  }
});

let deletedSchool = q5;

console.log(deletedSchool);

//filter

let filterAge = students.filter((item) => {
  return item.age == 16;
});
console.log(filterAge);

//delete students that has id of 3
let selectedID = 3;
let deleteID = students.filter((item) => {
  return item.id != selectedID;
});

students = deleteID;

console.log(students);
