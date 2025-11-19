import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / total
  const positive = `${((good / total) * 100).toFixed(1)} %`

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}


const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>

      <h1>Anecdote of the day</h1>
      {anecdotes.length === 0 ? (
        <div>No anecdotes defined (replace `anecdotes` array)</div>
      ) : (
        <>
          <Anecdote text={anecdotes[selected]} votes={votes[selected] ?? 0} />
          <Button
            handleClick={() => {
              const copy = [...votes]
              copy[selected] = (copy[selected] ?? 0) + 1
              setVotes(copy)
            }}
            text="vote"
          />
          <Button
            handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
            text="next anecdote"
          />

          <h2>Anecdote with most votes</h2>
          {votes.length === 0 || Math.max(...votes.map(v => Number(v) || 0)) === 0 ? (
            <div>No votes yet</div>
          ) : (
            (() => {
              const normalized = votes.map(v => Number(v) || 0)
              const max = Math.max(...normalized)
              const index = normalized.indexOf(max)
              if (index === -1) return <div>No votes yet</div>
              return <Anecdote text={anecdotes[index]} votes={max} />
            })()
          )}
        </>
      )}

      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App