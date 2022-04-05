
import axios from "axios";
import { useState, useEffect } from "react";
import "./assessment.css"
import TestScores from "./TestScores";
import Tags from "./Tags";

const Assessment = () => {

  const [data, setdata] = useState([]) //initial data from API
  const [filter, setfilter] = useState([]) //used for search filter
  const [expanded, setExpanded] = useState([0]) //used for expanded test scores

  const getInfo = () => {
    axios.get("https://api.hatchways.io/assessment/students")
      .then(res => {
        let list = res.data.students;
        list.forEach((student) => {
          student.tag = []
        })
        setdata(list) //set intial
        setfilter(list) //set manupilative
      })
  }

  const calculateAverage = (grades) => { //return average
    let sum = 0;
    grades.forEach((grade) => { sum += Number(grade) })
    return sum / grades.length;
  }

  const studentList = filter.map((student, index) => {

    const toggleClass = (id) => { //Average Test Expander
      if (expanded.includes(id)) {
        setExpanded(expanded.filter((stu) => { return stu !== id })) //remove from expanded scored
        student.show = !student.show;
      } else {
        setExpanded([...expanded].concat([id])) //add to list of expanded test scores
        student.show = !student.show;
      }
    }

    const average = Math.round(calculateAverage(student.grades) * 100) / 100; //2 sig fig

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

  const searchbar = (key) => { //uses original data to filter names. does not work with tags
    setfilter([...data].filter((student) => {
      if (student.firstName.toLowerCase().includes(key) || student.lastName.toLowerCase().includes(key)) { return student; }
    }))
  }

  const searchtag = (key) => { //uses original data to filter names. does not work with search
    setfilter([...data].filter((student) => {
      let found = false;
      student.tag.forEach((tag) => { if (tag.toLowerCase().includes(key)) { found = true } })
      if (found) { return student }
    }))

    if (key === "") { setfilter(data) } //reset when blank
  }

  useEffect(() => { //load async data on page load
    getInfo();
  }, [])

  return (
    <div id="information">
      <div id="header">
        <input className="search" type="text" placeholder="Search by name" onChange={(e) => { searchbar(e.target.value.toLowerCase()) }} />
        <input className="search" type="text" placeholder="Search by tag" onChange={(e) => { searchtag(e.target.value.toLowerCase()) }} />
      </div>
      <div className="list">
        {studentList}
      </div>
    </div>
  )

}

export default Assessment;