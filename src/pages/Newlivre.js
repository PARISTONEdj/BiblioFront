import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { Toaster, toast } from 'sonner';
import axios from "axios";

function Newlivre(){
    const [titre, setTitre]= useState("");
    const [auteur, setAuteur]= useState("");
    const [annee, setAnne]= useState("");
    const [ISBN, setISBN] = useState("");

    const enregistrer = (e)=>{
        e.preventDefault();
        if(titre =="" || auteur=="" || annee=="" || ISBN==null){
            alert("renseigner tous les champs");
        }
        else{
                
            const datas = {
                titre,
                ISBN,
                annee,
                auteur,
            }
            alert(datas.title);
            axios
                .post('http://localhost:5000/books/enregistrer/', datas
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
        setTitre("");
        setAnne("");
        setISBN("");
        setAuteur("");
    } 

    return (
        <div>
            <Header/>
            <br/><br/>

                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Ajouter un nouveau livre
                </h3>
                            <p className="text-gray-600 mt-2">
                                Vous pouvez livre de nouveau livre dans la bibliotheque
                            </p>
                <form method="post">
                    <div className="max-w-md px-4 mx-auto mt-12">

                    <label for="username" className="block py-2 text-gray-500">
                        ISBN
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="text"
                            placeholder="identifiant unique"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={ISBN}
                            onChange={(e) => setISBN(e.target.value)}
                        />
                    </div>   
                    <label for="username" className="block py-2 text-gray-500">
                        Titre
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="text"
                            placeholder="Titre"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                        />
                    </div>
                    <label for="username" className="block py-2 text-gray-500">
                        Auteur
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            @
                        </div>
                        <input 
                            type="text"
                            placeholder="Auteur du livre"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={auteur}
                            onChange={(e) => setAuteur(e.target.value)}
                        />
                    </div>
                    <label for="username" className="block py-2 text-gray-500">
                        Annee de Parution
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            Annee
                        </div>
                        <input 
                            type="date"
                            placeholder="annee de parution"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={annee}
                            onChange={(e) => setAnne(e.target.value)}
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

export default Newlivre;