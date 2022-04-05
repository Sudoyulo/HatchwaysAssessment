

const TestScores = (props) => {

  const { grades } = props;

  let scores = grades.map((test, index) => {
    return (
      <p key={index}> Test {index + 1} : {test} %</p>
    )
  })

  return (
    <div>
      {scores}
    </div>
  )

}

export default TestScores;