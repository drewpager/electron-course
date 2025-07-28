import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import catLogo from './../../desktopIcon.png'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './chart'

function App() {
  const [count, setCount] = useState(0)
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU")
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics])
  const ramUsages = useMemo(() => statistics.map((stat) => stat.ramUsage), [statistics])
  const storageUsages = useMemo(() => statistics.map((stat) => stat.storageUsage), [statistics])
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages;
      case 'RAM':
        return ramUsages;
      case 'STORAGE':
        return storageUsages;
      default:
        return cpuUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages])

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view))
  }, []);

  return (
    <>
      <div className="App">
        <header>
          <button id="close" onClick={() => window.electron.sendFrameAction("CLOSE")} />
          <button id="minimize" onClick={() => window.electron.sendFrameAction("MINIMIZE")} />
          <button id="maximize" onClick={() => window.electron.sendFrameAction("MAXIMIZE")} />
        </header>
        <div style={{ height: 120 }}>
          <Chart data={activeUsages} maxDataPoints={10} />
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
