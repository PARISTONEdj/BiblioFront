import * as Select from "@radix-ui/react-select";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Toaster, toast } from 'sonner';
import axios from "axios";

function Newemprunt(){

  const [menuItems, setMenuItems] = useState([]);

  const [membres, setMembres] = useState([]);

    const [lastUpdate, setLastUpdate] = useState(new Date()); 

    const [loading, setLoading] = useState(true);

    const [countries, setCountries] = React.useState([]);
    const [books, setBooks] = useState([]);
    const [bookitem, setBookitem] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/membres/liste/')
    .then((response) => response.json())
    .then((data) => {
      setMembres(data);
      const usernames = data.map((membre) => membre.username);
     setCountries(usernames);
       setMenuItems(usernames); 
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des publications:', error);
    });  
    
    fetch('http://localhost:5000/books/liste/')
    .then((response) => response.json())
    .then((data) => {
      setBooks(data);
      const usernames = data.map((membre) => membre.titre);
      setBookitem(usernames);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des publications:', error);
    });   

}, [lastUpdate]);

  const [value, setValue] = useState("");

  const [valeur, setValeur] = useState("");


  const handleSearch = (e) => {
    const inputValue = e.target.value; 
    const results = menuItems.filter((item) =>
      item.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    setCountries(results);
    setValue(inputValue); 
  };



  const handleSearchs = (e) => {
    const inputValue = e.target.valeur;  
    const results = menuItems.filter((item) =>
      item.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    );
    setCountries(results);
    setValue(inputValue); 
  };

  const [dateRetourPrevue, setDateRetourPrevue] = useState("");

  const enregistrer = (e) => {
    e.preventDefault();
  
    alert("valeur adhérent : " + value);
    alert("valeur livre : " + valeur);
  
    if (dateRetourPrevue === "" || value === "" || valeur === "") {
      alert("Renseignez tous les champs");
    } else {
      const datas = {
        dateRetourPrevue: dateRetourPrevue,
        livre: valeur, 
        membre: value, 
      };
  
  
      axios.post('http://localhost:5000/emprunt/ajouter/', datas)
        .then(response => {
          toast.success("Livre enregistré");
          annuler();
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error("Erreur de connexion au serveur");
          }
        });
    }
  };
const annuler =()=>{
    setDateRetourPrevue("");
} 

  return (
    <div>
        <Header/>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Ajouter un nouvel emprunt
                </h3>
                            <p className="text-gray-600 mt-2">
                                Vous pouvez ajouter un nouvel emprunt dans la bibliotheque
                            </p>

                    <form method="post">
                    <div className="max-w-md px-4 mx-auto mt-12">
                    
                    <label for="username" className="block py-2 text-gray-500">
                        Date de retour
                    </label>
                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            Date
                        </div>
                        <input 
                            type="date"
                            placeholder="annee de parution"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none"
                            value={dateRetourPrevue}
                            onChange={(e) => setDateRetourPrevue(e.target.value)}
                        />
                    </div>
                    <br/>
                    <label for="username" className="block py-2 text-gray-500">
                        adherant
                    </label> 

                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            Membre
                        </div>  
                    <Select.Root
                        onValueChange={setValue}
                        onOpenChange={() => setCountries(menuItems)}

                    >
                        <div className="w-72 max-w-full">
                        <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                            <Select.Value placeholder="trouver un adherant">
                            {value}
                            </Select.Value>
                            <Select.Icon className="text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                />
                            </svg>
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content
                            position="popper"
                            avoidCollisions={false}
                            className="w-[var(--radix-select-trigger-width)] overflow-hidden mt-3 bg-white border rounded-lg shadow-sm text-sm"
                            >
                            <div className="shadow flex items-center">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mx-3 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                                </svg>
                                <input
                                type="text"
                                placeholder="Search"
                                className="p-2 text-gray-500 w-full rounded-md outline-none"
                                onInput={handleSearch}
                                />
                            </div>
                            <Select.Viewport className="max-h-64 mt-2 overflow-y-auto">
                                {countries.length < 1 ? (
                                <div className="px-3 py-2 text-gray-600">Nothing found.</div>
                                ) : (
                                ""
                                )}
                                {countries.map((item, idx) => (
                                <SelectItem key={idx} value={item}>
                                    {item}
                                </SelectItem>
                                ))}
                            </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                        </div>
                    </Select.Root>
                 </div>  
                 <br/><br/>    


                 <label for="username" className="block py-2 text-gray-500">
                        Selectionner le livre
                    </label> 

                    <div className="flex items-center text-gray-400 border rounded-md">
                        <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                            Livre
                        </div>  
                    <Select.Root
                        onValueChange={setValeur}
                        onOpenChange={() => setCountries(bookitem)}
                    >
                        <div className="w-72 max-w-full">
                        <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
                            <Select.Value placeholder="selectionner le livre">
                            {valeur}
                            </Select.Value>
                            <Select.Icon className="text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                />
                            </svg>
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content
                            position="popper"
                            avoidCollisions={false}
                            className="w-[var(--radix-select-trigger-width)] overflow-hidden mt-3 bg-white border rounded-lg shadow-sm text-sm"
                            >
                            <div className="shadow flex items-center">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mx-3 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                                </svg>
                                <input
                                type="text"
                                placeholder="Search"
                                className="p-2 text-gray-500 w-full rounded-md outline-none"
                                onInput={handleSearchs}
                                />
                            </div>
                            <Select.Viewport className="max-h-64 mt-2 overflow-y-auto">
                                {countries.length < 1 ? (
                                <div className="px-3 py-2 text-gray-600">Nothing found.</div>
                                ) : (
                                ""
                                )}
                                {countries.map((item, idx) => (
                                <SelectItem key={idx} value={item}>
                                    {item}
                                </SelectItem>
                                ))}
                            </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                        </div>
                    </Select.Root>
                 </div>  
                 <br/><br/>               
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
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-indigo-600 data-[state=checked]:bg-indigo-50 data-[highlighted]:text-indigo-600 data-[highlighted]:bg-indigo-50 data-[highlighted]:hover:text-indigo-600 data-[highlighted]:hover:bg-indigo-50 outline-none"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>
          <div className="pr-4 line-clamp-1">{children}</div>
        </Select.ItemText>
        <div className="w-6">
          <Select.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  }
);

export default Newemprunt;
