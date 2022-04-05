
import axios from "axios";
import { useState, useEffect } from "react";
import "./assessment.css"
import TestScores from "./TestScores";
import Tags from "./Tags";

const Assessment = () => {

  const [data, setdata] = useState([])
  const [filter, setfilter] = useState([])
  const [expanded, setExpanded] = useState([0])

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        let list = res.data.students;
        list.forEach((student) => {
          student.tag = []
        })
        setdata(list)
        setfilter(list)
      })
  }

  const calculateAverage = (grades) => {
    let sum = 0;
    grades.forEach((grade) => { sum += Number(grade) })
    return sum / grades.length;
  }

  const studentList = filter.map((student, index) => {

    const toggleClass = (id) => {
      if (expanded.includes(id)) {
        setExpanded(expanded.filter((stu) => { return stu !== id }))
        student.show = !student.show;
      } else {
        setExpanded([...expanded].concat([id]))
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
              <TestScores grades={student.grades} expand={expanded} stuId={student.id} />
              <Tags data={data} setdata={setdata} stuId={student.id - 1} />
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
    setfilter([...data].filter((student) => {
      if (student.firstName.toUpperCase().includes(key) || student.lastName.toUpperCase().includes(key)) { return student; }
    }))
  }

  const searchtag = (key) => {
    setfilter([...data].filter((student) => {
      let found = false;
      student.tag.forEach((tag) => {
        if (tag.toLowerCase().includes(key)) { found = true }
      })
      if (found) { return student }
    }))

    if (key === "") { setfilter(data) }
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div id="information">
      <div id="header">
        <input className="search" type="text" placeholder="Search by name" onChange={(e) => { searchbar(e.target.value.toUpperCase()) }} />
        <input className="search" type="text" placeholder="Search by tag" onChange={(e) => { searchtag(e.target.value.toLowerCase()) }} />
      </div>
      <div className="list">
        {studentList}
      </div>
    </div>
  )

}

export default Assessment;