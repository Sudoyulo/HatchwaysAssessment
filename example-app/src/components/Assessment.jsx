
import axios from "axios";
import { useState, useEffect } from "react";

const Assessment = () => {

  const [request, setRequest] = useState([])

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        setRequest(res.data.students)
      })
  }

  const calculateAverage = (grades) => {

    let sum = 0;
    grades.forEach((grade) => {
      sum += Number(grade);
    })
    return sum / grades.length;

  }

  const studentList = request.map((student) => {

    let average = Math.round(calculateAverage(student.grades) * 100) / 100;

    return (
      <div className="student">
        <img src={student.pic} alt="profile" />
        <p>{student.firstName} {student.lastName}</p>
        <p>Email: {student.email}</p>
        <p>Company: {student.company}</p>
        <p>Skill: {student.skill}</p>
        <p>Average: {average}%</p>



      </div>
    )

  })

  useEffect(() => {
    getInfo();
  }, [])

  console.log(request)

  return (
    <h1>
      Contents
      {studentList}
    </h1>

  )

}

export default Assessment;