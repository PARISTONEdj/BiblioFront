import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import { Toaster, toast } from 'sonner';

function Home(){
    const [books, setBooks] = useState([]);

    const [lastUpdate, setLastUpdate] = useState(new Date()); 

    const [loading, setLoading] = useState(true);


    useEffect(() => {

              fetch('http://localhost:5000/books/liste/')
              .then((response) => response.json())
              .then((data) => {
                setBooks(data);
                setLoading(false);
              })
              .catch((error) => {
                console.error('Erreur lors de la récupération des publications:', error);
              });  
              
    
      }, [lastUpdate]);

      const deleterecette=(id)=>{
        if (id == null) {
            toast.error("Aucune publication sélectionnée");
        } else {
            alert(id);   
            axios
                .delete(`http://localhost:5000/books/delete/${id}`)
                .then(response => {
                    toast.success("Suppression réussie : " + response.data.message);
                    setLastUpdate(new Date());
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error) {
                        toast.error(error.response.data.error);
                    } else {
                        toast.error("Erreur de connexion au serveur");
                    }
                });
        }
      }

      const [recherche, setRecherche] = useState("");


      const effectuerRecherche = (event) => {
        event.preventDefault();

        if(recherche ==""){
            alert("renseigner le champs");
        }
        else{
            fetch(`http://localhost:5000/books/recherches/${recherche}`)
            .then((response) => response.json())
            .then((data) => {
              setBooks(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Erreur lors de la récupération des publications:', error);
            });   
        }
    };
    return(
        <div>
            <Header/>
             Home
             <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Les livres de la bibliotheque
                        </h3>
                        <p className="text-gray-600 mt-2">
                            La liste des livres de la bibliotheque
                        </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="/newlivre"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Ajouter livre
                        </a>
                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <form
                    onSubmit={effectuerRecherche}
            className="max-w-md px-4 mx-auto mt-12">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    value={recherche}  onChange={(e)=>setRecherche(e.target.value)}
                    type="text"
                    placeholder="Search ..Entrer le titre du livre"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">ISBN</th>
                                <th className="py-3 px-6">Titre</th>
                                <th className="py-3 px-6">Auteur</th>
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Etat</th>
                                <th className="py-3 px-6"></th>


                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                books.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            {/* <img src={item.imageUrl} className="w-10 h-10 rounded-full" /> */}
                                            <div>
                                                <span className="block text-gray-700 text-sm font-medium">{item.ISBN}</span>
                                                <span className="block text-gray-700 text-xs">{item.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.titre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.auteur}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.annee}</td>
                                        <td className="py-2 px-3 font-medium text-yellow hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"> {item.disponible == false ? "Preter" : "Disponible"}</td>

                                        <td className="text-right px-6 whitespace-nowrap">
                                            <a href={`/updatelivre/${item._id}`} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Modifier
                                            </a>
                                            {/* <a href={`/detailrecette/${item._id}`} className="py-2 px-3 font-medium text-yellow hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                {item.disponible == false ? "Preter" : "Disponible"}
                                            </a> */}
                                            <button onClick={()=>deleterecette(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;