import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import { Toaster, toast } from 'sonner';

function Nonrendu(){
    const [emprunts, setEmprunts] = useState([]);

    const [lastUpdate, setLastUpdate] = useState(new Date()); 

    const [loading, setLoading] = useState(true);


    useEffect(() => {

              fetch('http://localhost:5000/emprunt/listenonrendu/')
              .then((response) => response.json())
              .then((data) => {
                setEmprunts(data);
                setLoading(false);
                setLastUpdate(new Date());

              })
              .catch((error) => {
                console.error('Erreur lors de la récupération des publications:', error);
              });    
    
      }, [lastUpdate]);

      const deletemembre=(id)=>{
        if (id == null) {
            toast.error("Aucune publication sélectionnée");
        } else {
            alert(id);   
            axios
                .delete(`http://localhost:5000/membres/delete/${id}`)
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

      const rendre=(id)=>{
        if (id == null) {
            toast.error("Aucune publication sélectionnée");
        } else {
            alert(id);   
            axios
                .put(`http://localhost:5000/emprunt/update/${id}`)
                .then(response => {
                    toast.success("Suppression réussie : ");
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
    return(
        <div>
            <Header/>
             
             <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Les emprunt de livres aux adherant de la bibliotheque
                        </h3>
                        <p className="text-gray-600 mt-2">
                            La liste des emprunts de livre de la bibliotheque non rendus
                        </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="/newemprunt"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Nouvel emprunt
                        </a>
                    </div>

                    <div className="mt-3 md:mt-0">
                        <a
                            href="/penalite"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Retard et penalité
                        </a>
                    </div>

                    <div className="mt-3 md:mt-0">
                        <a
                            href="/nonrendu"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Livre non rendu
                        </a>
                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Livre</th>
                                <th className="py-3 px-6">Adherant</th>
                                <th className="py-3 px-6">Date emprunt</th>
                                <th className="py-3 px-6">Date retour</th>
                                <th className="py-3 px-6"></th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                emprunts.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            {/* <img src={item.imageUrl} className="w-10 h-10 rounded-full" /> */}
                                            <div>
                                                <span className="block text-gray-700 text-sm font-medium">{item.ISBN}</span>
                                                <span className="block text-gray-700 text-xs">{item.livre.titre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.membre.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.dateEmprunt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.dateRetourPrevue}</td>
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button onClick={()=>rendre(item._id)}  className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Rendre
                                            </button>
                                            {/* <a href={`/detailrecette/${item._id}`} className="py-2 px-3 font-medium text-yellow hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                               {item.livre.disponible == false ? "Preter" : "Disponible"}
                                            </a> */}
                                            <button onClick={()=>deletemembre(item._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Annuler
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

export default Nonrendu;