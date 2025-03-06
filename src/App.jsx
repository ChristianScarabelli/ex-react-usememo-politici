import Card from "./components/Card.jsx"
import { useState, useEffect, useMemo } from "react"

function App() {

  const [politicians, setPoliticians] = useState([])

  // Stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPoliticians()
  }, [])

  const fetchPoliticians = async () => {
    try {
      const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      const data = await response.json()
      console.log(data)
      setPoliticians(data)
    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  // Lista filtrata derivata dallo stato senza modificarlo direttamente
  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => {
      const isInName = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const isInBio = p.biography.toLowerCase().includes(searchTerm.toLowerCase())
      const isInPos = p.position.toLowerCase().includes(searchTerm.toLowerCase())
      return isInName || isInBio || isInPos
    }
    )
  }, [politicians, searchTerm])


  return (
    <>
      <section className="bg-blue-500 min-h-screen">
        <div className="container mx-auto px-2">
          <h1 className="py-4 text-center text-gray-200 font-bold text-4xl mb-5">Politicians</h1>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search politicians..."
              className="w-50% px-4 py-2 text-gray-700 rounded-md bg-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm: grid-cols-2 gap-5 pb-5">
            {filteredPoliticians.map((p) => {
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
