

const TestScores = (props) => {

  const { grades, active, stuId } = props;
  let name = "average-scores-show";

  let scores = grades.map((test, index) => {
    return (
      <p key={index}> Test {index + 1} : {test} %</p>
    )
  })

  if (active === stuId) {
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