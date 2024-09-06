import partyFetch from "../axios/config"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useToast from "../hooks/useToast"
import "./Party.css"

const Party = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [party, setParty] = useState(null);

    useEffect(() => {
        const loadParty = async () => {
            const res = await partyFetch.get(`/parties/${id}`);
            setParty(res.data);
        };
        loadParty();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await partyFetch.delete(`/parties/${id}`);
            if (res.status === 200) {
                navigate("/");
                useToast(res.data.msg);
            }   
        } catch (error) {
            useToast(error.response.data.msg, "error");
        }
    };

    if (!party) return <p>Loading Party...</p>

    return (
        <div className="party">
            <h1>{party.title}</h1>
            <div className="actions-container">
                <Link to={`/party/edit/${party._id}`} className="btn">Edit</Link>
                <button onClick={handleDelete} className="btn-secondary">Delete</button>
            </div>
            <p>Budget: R${party.budget}</p>
            <h3>Services:</h3>
            <div className="services-container">
                {party.services.map((service) => (
                    <div className="service" key={service._id} >
                        <img src={service.image} alt={service.name} />
                        <p>{service.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Party