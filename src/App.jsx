import Card from "./components/Card.jsx"
import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    fetchPoliticians()
  }, [])

  const fetchPoliticians = async () => {
    try {
      const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      const data = await response.json()
      setPoliticians(data)
    }
    catch (error) {
      console.error('Error:', error)
    }
  }


  return (
    <>
      <section className="bg-blue-500">
        <div className="container mx-auto">
          <h1 className="py-4 text-center text-gray-200 font-bold text-4xl">Politicians</h1>
          <div className="grid grid-cols-6 gap-5">
            {politicians &&
              politicians.map((p) => {
                return <Card key={p.id} data={p} />
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default App
