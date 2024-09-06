import partyFetch from "../axios/config"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useToast from "../hooks/useToast"
import "./Form.css"

const EditParty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState(null);
    const [party, setParty] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get("/services");
            setServices(res.data);
            loadParty();
        }

        const loadParty = async () => {
            const res = await partyFetch.get(`/parties/${id}`);
            setParty(res.data);
        };

        loadServices();
    }, []);

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const service = services.filter((s) => s._id === value)[0];

        let partyServices = party.services;

        if (checked) {
            partyServices = [...partyServices, service];
        }
        else {
            partyServices = partyServices.filter((s) => s._id !== value);
        }

        setParty({ ...party, services: partyServices });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateParty();
    };

    const updateParty = async () => {
        try {
            const res = await partyFetch.put(`/parties/${party._id}`, party);
    
            if (res.status === 200) {
                navigate(`/party/${party._id}`);
                useToast(res.data.msg);
            }
        } catch (error) {
            useToast(error.response.data.msg, "error");
        }
    };

    if (!party) return <p>Loading Party...</p>

    return (
        <div className="form-page">
            <h2>Editing: {party.title}</h2>
            <p>Update your Party details</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Party name:</span>
                    <input 
                        type="text"
                        placeholder="Be creative =D"
                        required
                        onChange={(e) => setParty({ ...party, title: e.target.value })}
                        value={party.title}
                    />
                </label>
                <label>
                    <span>Host:</span>
                    <input 
                        type="text"
                        placeholder="Who is hosting the party?"
                        required
                        onChange={(e) => setParty({ ...party, owner: e.target.value })}
                        value={party.owner}
                    />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea 
                        placeholder="Tell us more about the party..."
                        required
                        onChange={(e) => setParty({ ...party, description: e.target.value })}
                        value={party.description}
                    />
                </label>
                <label>
                    <span>Budget:</span>
                    <input 
                        type="number"
                        placeholder="How much do you intend to invest?"
                        required
                        onChange={(e) => setParty({ ...party, budget: e.target.value })}
                        value={party.budget}
                    />
                </label>
                <label>
                    <span>Image:</span>
                    <input 
                        type="text"
                        placeholder="Enter an image URL"
                        required
                        onChange={(e) => setParty({ ...party, image: e.target.value })}
                        value={party.image}
                    />
                </label>
                <div>
                    <h2>Choose services</h2>
                    <div className="services-container">
                        {!services || services.length === 0 ? (
                            <p>Loading services...</p>
                        ) : (
                            services.map((service) => (
                                <div className="service" key={service._id} >
                                    <img src={service.image} alt={service.name} />
                                    <p className="service-name">{service.name}</p>
                                    <p className="service-price">R${service.price}</p>
                                    <div className="checkbox-container">
                                        <input 
                                            type="checkbox"
                                            value={service._id}
                                            onChange={(e) => handleServices(e)}
                                            checked={party.services.find((partyService) => partyService._id === service._id) || false}
                                        />
                                        <p>Check to request</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <input type="submit" value="Update Party" className="btn" />
            </form>
        </div>
    )
}

export default EditParty