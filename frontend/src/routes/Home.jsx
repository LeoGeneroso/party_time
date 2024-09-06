import partyFetch from "../axios/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    const [parties, setParties] = useState(null);

    useEffect(() => {
        const loadParties = async () => {
            const res = await partyFetch.get("/parties");
            setParties(res.data);
        }
        loadParties();
    }, []);

    if (!parties) return <p>Loading Parties...</p>

    return (
        <div className="home">
            <h1>Your Parties</h1>
            <div className="parties-container">
                {parties.length === 0 ? (
                    <p>There are no parties created</p>
                ) : (
                    parties.map((party) => (
                        <div className="party" key={party._id}>
                            <img src={party.image} alt={party.title} />
                            <h3>{party.title}</h3>
                            <Link to={`/party/${party._id}`} className="btn-secondary">Details</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Home