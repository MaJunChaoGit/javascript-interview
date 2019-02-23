const STUDENTS = [
    {
      "id": 1,
      "name": "John",
      "classroomId": 75
    },
    {
      "id": 2,
      "name": "MJC",
      "classroomId": 75
    },
    {
      "id": 3,
      "name": "MZY",
      "classroomId": 75
    },
    {
      "id": 4,
      "name": "NN",
      "classroomId": 75
    },
    {
      "id": 5,
      "name": "XG",
      "classroomId": 75
    }
];
const COURSES = [
  {
     "id": 1,
     "name": "history",
     "studentId": [1,3,4],
     "totalScore": 80
  },
  {
     "id": 2,
     "name": "algebra",
     "studentId": [2,3],
     "totalScore": 40
  },
  {
     "id": 3,
     "name": "math",
     "studentId": [1,5],
     "totalScore": 150
  },
  {
     "id": 4,
     "name": "english",
     "studentId": [2,4,5],
     "totalScore": 110
  }
];
const EVALUATION = [
  {
    "id": 1,
    "coursesId": 1,
    "studentId": 1,
    "score": 50
  },
  {
    "id": 2,
    "coursesId": 1,
    "studentId": 3,
    "score": 40
  },
  {
    "id": 3,
    "coursesId": 1,
    "studentId": 4,
    "score": 60
  },
  {
    "id": 4,
    "coursesId": 2,
    "studentId": 2,
    "score": 20
  },
  {
    "id": 5,
    "coursesId": 2,
    "studentId": 3,
    "score": 30
  },
  {
    "id": 6,
    "coursesId": 3,
    "studentId": 1,
    "score": 100
  },
  {
    "id": 7,
    "coursesId": 3,
    "studentId": 5,
    "score": 140
  },
  {
    "id": 8,
    "coursesId": 4,
    "studentId": 2,
    "score": 90
  },
  {
    "id": 9,
    "coursesId": 4,
    "studentId": 4,
    "score": 80
  },
  {
    "id": 10,
    "coursesId": 4,
    "studentId": 5,
    "score": 100
  }
];

// 回调函数写法
// function getStudents(classroomId, cb) {
//   setTimeout(function() {
//     cb(STUDENTS.filter(item => item.classroomId === classroomId));
//   }, Math.random() * 1000);
// }

// function getCourses(studentId, cb) {
//   setTimeout(function() {
//     cb(COURSES.filter(item => item.studentId.includes(studentId)));
//   }, Math.random() * 1000);
// }

// function getEvaluation(studentId, coursesId, cb) {
//   setTimeout(function() {
//     cb(EVALUATION.filter(item => item.studentId === studentId && item.coursesId === coursesId));
//   }, Math.random() * 1000);
// }

// function getAverage(classroomId, cb) {
//   let result = [];
//   // 获取所有的学生列表 
//   getStudents(classroomId, function(students) {
//     // 通过学生列表进行查询所在课程
//     students.forEach(student => {
//       let model = {
//         'id': student.id,
//         'name': student.name
//       };
//       getCourses(student.id, function(courses) {
//         let average = 0;
//         courses.forEach(course => {
//           getEvaluation(student.id, course.id, function(evaluations) {
//             evaluations.forEach(evaluation => {
//               average += evaluation.score;
//             });
//             model['average'] = average / 2;
//             result.push(model);
//           });
//         });
//         cb(model);
//       });
//     });
//   });
// }


// promise写法
// function getStudents(classroomId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       resolve(STUDENTS.filter(item => item.classroomId === classroomId));
//     }, 1000);
//   });
// }

// function getCourses(studentId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       let result = [];
//       let i = 0;
//       COURSES.filter(function(course) {
//         if (course.studentId.includes(studentId)) {
//           result.push({
//             id: i++,
//             studentId: studentId,
//             coursesId: course.id
//           });
//         }
//       });
//       resolve(result);
//     }, 1000);
//   });
// }

// function getEvaluation(studentId, coursesId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       resolve(EVALUATION.filter(item => item.studentId === studentId && item.coursesId === coursesId)[0]);
//     }, 1000);
//   });
// }

// function getAverage(classroomId) {
//   return new Promise((resolve, reject) => {
//     getStudents(classroomId).then(students => {
//       let promiseAll = [];
//       students.forEach(student => {
//         promiseAll.push(getCourses(student.id));
//       });
//       return Promise.all(promiseAll);
//     }).then(courses => {
//       let promiseAll = [];
//       courses.forEach(course => {
//         course.forEach(cose => {
//           promiseAll.push(getEvaluation(cose.studentId,cose.coursesId));
//         });
//       });
//       return Promise.all(promiseAll);
//     }).then(evaluations => {
//       let model = {};
//       evaluations.forEach(eva => {
//         if (model[eva.studentId]) {
//           model[eva.studentId] += eva.score;
//         } else {
//           model[eva.studentId] = eva.score;
//         }
//       });
//       return model;
//     }).then(model => {
//       let result = [];
//       Object.keys(model).forEach(key => {
//         let mod = {
//           'id': key,
//           'name': STUDENTS.filter(stu => stu.id == key)[0].name,
//           'average': (model[key] / 2)
//         };
//         result.push(mod);
//       });
//       resolve(result);
//     });
//   });
// }

// async写法
function getStudents(classroomId) {
  return new Promise((resolve, reject) => {
    resolve(STUDENTS.filter(item => item.classroomId === classroomId));
  });
}

function getCourses(studentId) {
  return new Promise((resolve, reject) => {
    let result = [];
    let i = 0;
    COURSES.filter(function(course) {
      if (course.studentId.includes(studentId)) {
        result.push({
          id: i++,
          studentId: studentId,
          coursesId: course.id
        });
      }
    });
    resolve(result);
  });
}

function getEvaluation(studentId, coursesId) {
  return new Promise((resolve, reject) => {
      resolve(EVALUATION.filter(item => item.studentId === studentId && item.coursesId === coursesId)[0]);
  });
}

async function getAverage(classroomId) {
    let students = await getStudents(classroomId);
    let courses = [];
    for (let student of students) {
      courses.push(await getCourses(student.id));
    }
    
    let evaluations = [];
    for (let course of courses) {
      for (let cose of course) {
        evaluations.push(await getEvaluation(cose.studentId,cose.coursesId));
      }
    }
    let model = {};
    evaluations.forEach(eva => {
      if (model[eva.studentId]) {
        model[eva.studentId] += eva.score;
      } else {
        model[eva.studentId] = eva.score;
      }
    });
    let result = [];
    Object.keys(model).forEach(key => {
      let mod = {
        'id': key,
        'name': STUDENTS.filter(stu => stu.id == key)[0].name,
        'average': (model[key] / 2)
      };
      result.push(mod);
    });
    return result;
}

