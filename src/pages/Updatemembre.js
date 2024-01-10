import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { Toaster, toast } from 'sonner';
import axios from "axios";
import { useParams } from "react-router-dom";

function Updatemembre(){

    const {id} = useParams();
    const [email, setEmail]= useState("");
    const [username, setUsername]= useState("");
    const [adresse, setAdresse]= useState("");
    const [telephone, setTelephone] = useState("");
    const [membre, setMembres] = useState(null);

    const [lastUpdate, setLastUpdate] = useState(new Date()); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetch(`http://localhost:5000/membres/selectone/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setMembres(data); 
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération de la publication :', error);
          });

      }, [id, lastUpdate]);

    const enregistrer=(event)=>{
        event.preventDefault();
        const datas = {};
    
              if (email != "") {
                datas.email = email;
              }
              
              if (username != "") {
                datas.username = username; 
              }

              if (telephone != "") {
                datas.telephone = telephone; 
              }
              if (adresse != "") {
                datas.adresse =adresse; 
              }
              console.log(datas);
              alert(JSON.stringify(datas));
              console.log(datas);
              if(datas ==null){
                  toast.error("Aucun element selectonner");
              } 
              else{
                axios
                .put(`http://localhost:5000/membres/update/${id}`, datas
                )
                .then((response) => {
                  toast.success("Adherant modifier: " + response.data.message);
                  annuler();
                  setLastUpdate(new Date());
                })
                .catch((error) => {
                  if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                  } else {
                    toast.error("Erreur de connexion au serveur");
                  }
                });   

              } 
               
    }

    const annuler =()=>{
        setEmail("");
        setUsername("");
        setAdresse("");
        setTelephone("");
    } 

    return(
        <div>
            <Header/>
            <br/><br/>

            {loading ? (
                        <div>Loading...</div>
                    ) : (
                        membre ? (
            <div> 

                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Mise a jour de l'adherant : {membre.titre}
                </h3>
                            <p className="text-gray-600 mt-2">
                                Vous pouvez mettre a jour un membre de la bibliotheque
                            </p>
                <form method="post">
                    <div className="max-w-md px-4 mx-auto mt-12">

                    <label for="username" className="block py-2 text-gray-500">
                        Email : {membre.email}
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="email"
                            placeholder="email"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>   
                    <label for="username" className="block py-2 text-gray-500">
                        Nom : {membre.username}
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="text"
                            placeholder="Votre nom"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label for="username" className="block py-2 text-gray-500">
                        Adresse : {membre.adresse}
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="adress"
                            placeholder="Adresse"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                        />
                    </div>
                    <label for="username" className="block py-2 text-gray-500">
                        Numero de telephone :  {membre.telephone}
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            telephone :
                        </div>
                        <input 
                            type="phone"
                            placeholder="annee de parution"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </div>
                    <br/>
            
                <button
                    onClick={enregistrer}
                    className="px-7 py-3.5 text-white bg-indigo-600 rounded-lg shadow-md focus:shadow-none duration-100 ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                    Ajouter
                </button>
                </div>
                </form>
                <Toaster richColors  />


         </div>               
        ) : (
            <div>Aucune adherant trouvée.</div>
        )
    )}

                <br/><br/>
        </div>
    )
}

export default Updatemembre;