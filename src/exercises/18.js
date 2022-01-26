// Graph: Lazy-loading with React.lazy
import React, { Suspense } from 'react'
// 🐨 remove this Graph import 💣
// import Graph from '../graph'

// 🐨 use React.lazy to get the Graph component via a dynamic import
// 📜 https://reactjs.org/docs/code-splitting.html#reactlazy
const Graph = React.lazy(() => import('../graph'));

function GraphShower() {
  const [showGraph, setShowGraph] = React.useState(false)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={showGraph}
          onChange={e => setShowGraph(e.target.checked)}
        />
        {' show Graph'}
      </label>
      <div>
        {/*
          🐨 You need to wrap this in <React.Suspense> with a "fallback" prop
          so you can tell React what to show while the component code is being
          loaded
          📜 https://reactjs.org/docs/code-splitting.html#suspense
        */}
        <Suspense fallback={<div>Loading ...</div>}>
        {showGraph ? (
          <div className="totally-centered">
            <Graph />
          </div>
        ) : null}
        </Suspense>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <GraphShower />
}
Usage.title = 'Graph: Lazy-loading with React.lazy'

export default Usage
