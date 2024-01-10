import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { Toaster, toast } from 'sonner';
import axios from "axios";

function Newmembre(){
    const [email, setEmail]= useState("");
    const [username, setUsername]= useState("");
    const [adresse, setAdresse]= useState("");
    const [telephone, setTelephone] = useState("");

    const enregistrer = (e)=>{
        e.preventDefault();
        if(email =="" || username=="" || adresse=="" || telephone==null){
            alert("renseigner tous les champs");
        }
        else{
                
            const datas = {
                email,
                username,
                adresse,
                telephone,
            }
            axios
                .post('http://localhost:5000/membres/register/', datas
                )
                .then(response => {
                    toast.success("Livre enregistrer ");
                    annuler();
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error) {
                        toast.error(error);
                    } else {
                        // setErrors('Une erreur s\'est produite');
                        toast.error("erreur connexion serveur");
                    }
                
                })      
           
        }
    }

    const annuler =()=>{
        setEmail("");
        setUsername("");
        setAdresse("");
        setTelephone("");
    } 

    return (
        <div>
            <Header/>
            <br/><br/>

                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Ajouter un nouveau adherant
                </h3>
                            <p className="text-gray-600 mt-2">
                                Ce volet concerne l'ajout de nouveau membre a la bibliotheque
                            </p>
                <form method="post">
                    <div className="max-w-md px-4 mx-auto mt-12">

                    <label for="username" className="block py-2 text-gray-500">
                        Email
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
                        Nom
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
                        Adresse :
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="adress"
                            placeholder="Auteur du livre"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                        />
                    </div>
                    <label for="username" className="block py-2 text-gray-500">
                        Numero de telephone :
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @Tel
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

                <br/><br/>
        </div>
    )
}

export default Newmembre;