import partyFetch from "../axios/config"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useToast from "../hooks/useToast"
import "./Form.css"

const CreateParty = () => {
    const [services, setServices] = useState(null);
    
    const [title, setTitle] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState(0);
    const [image, setImage] = useState("");
    const [partyServices, setPartyServices] = useState([]);    

    const navigate = useNavigate(); 

    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get("/services");
            setServices(res.data);
        }
        loadServices();
    }, []);

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const service = services.filter((s) => s._id === value)[0];

        if (checked) {
            setPartyServices((services) => [...services, service]);
        }
        else {
            setPartyServices((services) => services.filter((s) => s._id !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createParty();
    };

    const createParty = async () => {
        try {
            const party = {
                title,
                owner,
                description,
                budget,
                image,
                services: partyServices,
            };

            const res = await partyFetch.post("/parties", party);
    
            if (res.status === 201) {
                navigate("/");
                useToast(res.data.msg);
            }
        } catch (error) {
            useToast(error.response.data.msg, "error");
        }
    };

    return (
        <div className="form-page">
            <h2>Create your next Party</h2>
            <p>Set your budget and choose services</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Party name:</span>
                    <input 
                        type="text"
                        placeholder="Be creative =D"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Host:</span>
                    <input 
                        type="text"
                        placeholder="Who is hosting the party?"
                        required
                        onChange={(e) => setOwner(e.target.value)}
                        value={owner}
                    />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea 
                        placeholder="Tell us more about the party..."
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </label>
                <label>
                    <span>Budget:</span>
                    <input 
                        type="number"
                        placeholder="How much do you intend to invest?"
                        required
                        onChange={(e) => setBudget(e.target.value)}
                        value={budget}
                    />
                </label>
                <label>
                    <span>Image:</span>
                    <input 
                        type="text"
                        placeholder="Enter an image URL"
                        required
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
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
                                        />
                                        <p>Check to request</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <input type="submit" value="Create Party" className="btn" />
            </form>
        </div>
    )
}

export default CreateParty