import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bienvenu from './pages/Bienvenu';
import Home from './pages/Home';
import Newlivre from './pages/Newlivre';
import Updatelivre from './pages/Updatelivre';
import Membre from './pages/Membre';
import Newmembre from './pages/Newmembre';
import Updatemembre from './pages/Updatemembre';
import Emprunt from './pages/Emprunt';
import Newemprunt from './pages/Newemprunt';
import Nonrendu from './pages/Nonrendu';
import Penalite from './pages/Penalite';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
          <Routes>
            {/* <Route path="/login" element={<Login />}/> */}
            <Route path="/" element={<Bienvenu />}/>
            <Route path="/home" element={<Home />} />

            <Route path="/newlivre" element={<Newlivre />} />

            <Route path="/updatelivre/:id" element={<Updatelivre />} />

            <Route path="/membre" element={<Membre />} />

            <Route path="/newmembre" element={<Newmembre />} />

            <Route path="/updatemembre/:id" element={<Updatemembre />} />

            <Route path="/emprunt" element={<Emprunt />} />

            <Route path="/newemprunt" element={<Newemprunt />} />

            <Route path="/nonrendu" element={<Nonrendu />} />

            <Route path="/penalite" element={<Penalite />} />



            {/* <Route path="/register" element={<Register />}/>
            <Route path="/envoyer" element={<Envoyer />}/>

            <Route path='/user/verify/:id/:uniqueString' element={<Activer/>}/>

            
          
                <Route path="/home" element={<Home />} />
                <Route path='mesrecettes' element={<MesRecettes />} />

                <Route path='team' element={<Teams/>}/>

                <Route path='/newrecette' element={<NewRecette/>}/>

                <Route path='/detailrecette/:id' element={<DetailRecette/>}/>

                <Route path='/setting' element={<Setting/>}/>

                <Route path='/utilisateur/:id' element={<Utilisateur/>}/>

                <Route path='/updaterecette/:id' element={<UpdateRecette/>}/>

                <Route path='/resultat/:recherche' element={<Resultat/>}/>

                <Route path='/admin' element={<Admin/>}/> */}
            

           


          </Routes>
       
      

      </BrowserRouter>
    </div>
  );
}

export default App;
