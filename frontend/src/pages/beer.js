import { Header } from "../components/Header"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { Paginate } from "../components/Paginate"
import { useApp } from "../hooks"
import { Title } from "../components/Title";
import { Card } from "../components/Card";

function Beer() {
  const {count, logout} = useApp()
  const [beers, setBeers] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/api/consultApi/${count}/13`)
        setBeers(response.data.beers)
        setLoading(false)
      } catch (error) {
        if(error.response.data.cause === "jwt expired"){
          alert("Expired Session")
          logout()
        }
        else{
          logout()
          alert("Request Failed. \n Contact Support Team.")
        }
      }
    }
    load()
  }, [count, logout])

  return (
    <main>
      <Header />
      <Title>Beers</Title>
      <div style={{display:"flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly"}}>
        {
          loading?<p>Loading ...</p> : (
            beers.map((beer) => {
              return (
                <Card 
                  value={beer.id}
                  img={beer.image_url}
                  name={beer.name}
                  tag={beer.tagline}
                  abv={beer.abv}
                  ibu={beer.ibu}
                />
              )
            })
          )
        }
      </div>
      <Paginate
        current={1}
        maxPages={13}
      />
    </main>
  );
}

export { Beer };