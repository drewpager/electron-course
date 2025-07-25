import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import catLogo from './../../desktopIcon.png'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './chart'

function App() {
  const [count, setCount] = useState(0)
  const statistics = useStatistics(10);
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics])

  console.log(statistics)

  return (
    <>
      <div className="App">
        <div style={{ height: 120 }}>
          <Chart data={cpuUsages} maxDataPoints={10} />
        </div>
        <a href="https://react.dev" target="_blank">
          <img src={catLogo} className="logo react" alt="Cat logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Solvester</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test Hot Mod
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
