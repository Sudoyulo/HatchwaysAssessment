
const TestScores = (props) => {

  const { grades, expand, stuId } = props;
  let name = "average-scores-show";

  const scores = grades.map((test, index) => {
    return (
      <p key={index + test}> Test {index + 1} : {test} %</p>
    )
  })

  if (expand.includes(stuId)) {
    name = "average-scores-show"
  } else {
    name = "average-scores-hide"
  }

  return (
    <div className={name}>
      {scores}
    </div>
  )

}

export default TestScores;