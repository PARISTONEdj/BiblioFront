import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { Toaster, toast } from 'sonner';
import axios from "axios";
import { useParams } from "react-router-dom";

function Updatelivre(){

    const {id} = useParams();

    const [titre, setTitre]= useState("");
    const [auteur, setAuteur]= useState("");
    const [annee, setAnne]= useState("");
    const [ISBN, setISBN] = useState("");
    const [book, setBook] = useState(null);

    const [lastUpdate, setLastUpdate] = useState(new Date()); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetch(`http://localhost:5000/books/selectone/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setBook(data); 
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération de la publication :', error);
          });

      }, [id, lastUpdate]);

    const enregistrer=(event)=>{
        event.preventDefault();
        const datas = {};
    
              if (titre != "") {
                datas.titre = titre;
              }
              
              if (auteur != "") {
                datas.auteur = auteur; 
              }

              if (annee != "") {
                datas.annee = annee; 
              }
              if (ISBN != "") {
                datas.ISBN =ISBN; 
              }
              console.log(datas);
              alert(JSON.stringify(datas));
              console.log(datas);
              if(datas ==null){
                  toast.error("Aucun element selectonner");
              } 
              else{
                axios
                .put(`http://localhost:5000/books/update/${id}`, datas
                )
                .then((response) => {
                  toast.success("livre modifier: " + response.data.message);
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
        setTitre("");
        setAnne("");
        setISBN("");
        setAuteur("");
    } 

    return(
        <div>
            <Header/>
            <br/><br/>

            {loading ? (
                        <div>Loading...</div>
                    ) : (
                        book ? (
            <div> 

                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Mise a jour du livre : {book.titre}
                </h3>
                            <p className="text-gray-600 mt-2">
                                Vous pouvez mettre a jour un livre de la bibliotheque
                            </p>
                <form method="post">
                    <div className="max-w-md px-4 mx-auto mt-12">

                    <label for="username" className="block py-2 text-gray-500">
                        ISBN : {book.ISBN}
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
                        Titre : {book.titre}
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
                        Auteur : {book.auteur}
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
                        Annee de Parution :  {book.annee}
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


         </div>               
        ) : (
            <div>Aucune Livre trouvée.</div>
        )
    )}

                <br/><br/>
        </div>
    )
}

export default Updatelivre;