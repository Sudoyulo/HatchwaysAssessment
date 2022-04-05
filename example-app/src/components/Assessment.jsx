
import axios from "axios";
import { useState, useEffect } from "react";
import "./assessment.css"
import TestScores from "./TestScores";
import Tags from "./Tags";

const Assessment = () => {

  const [request, setRequest] = useState([])
  const [filter, setfilter] = useState([])
  const [isActive, setIsActive] = useState([0])

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        setRequest(res.data.students)
        setfilter(res.data.students)
      })
  }

  const calculateAverage = (grades) => {
    let sum = 0;
    grades.forEach((grade) => { sum += Number(grade) })
    return sum / grades.length;
  }

  const studentList = filter.map((student, index) => {

    student.tag = ["1"];

    const toggleClass = (id) => {
      if (isActive.includes(id)) {
        setIsActive(isActive.filter((stu) => { return stu !== id }))
        student.show = !student.show;
      } else {
        setIsActive([...isActive].concat([id]))
        student.show = !student.show;
      }
    }

    let average = Math.round(calculateAverage(student.grades) * 100) / 100;

    return (
      <div className="student" key={index}>
        <div className="student-body">

          <div className="profile-picture">
            <img className="avatar" src={student.pic} alt="profile" />
          </div>
          <div className="student-traits">
            <p className="full-name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</p>
            <div className="traits">
              <p>Email: {student.email}</p>
              <p>Company: {student.company}</p>
              <p>Skill: {student.skill}</p>
              <p>Average: {average}%</p>
              <TestScores grades={student.grades} active={isActive} stuId={student.id} />
              <Tags student={student} />
            </div>
          </div>
        </div>
        <div className="expand">
          <button className="expand" onClick={() => toggleClass(student.id)}> {student.show ? "-" : "+"} </button>
        </div>
      </div>
    )
  })

  const searchbar = (key) => {
    setfilter([...request].filter((student) => {
      if (student.firstName.toUpperCase().includes(key) || student.lastName.toUpperCase().includes(key)) { return student; }
    }))
  }

  const searchtag = (key) => {
    setfilter([...request].filter((student) => {
      if (student.tag.forEach((tag) => {
        if (tag.includes(key)) { return true }
      })) { return student; }
    }))
  }

  useEffect(() => {
    getInfo();
  }, [])

  useEffect(() => {
  }, [isActive])

  return (
    <div id="information">
      <div id="header">
        <input className="search" type="text" placeholder="Search by name" onChange={(e) => { searchbar(e.target.value.toUpperCase()) }} />
        <input className="search" type="text" placeholder="Search by tag" onChange={(e) => { searchtag(e.target.value.toLowerCase()) }} />
      </div>
      {studentList}
    </div>
  )

}

export default Assessment;