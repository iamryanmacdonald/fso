import { useState } from "react";

const Button = (props) => {
  const { handleClick, text } = props;

  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <div>
      {text} {value}
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  if (good + neutral + bad === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive"
        value={(100 * good) / (good + neutral + bad) + " %"}
      />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
