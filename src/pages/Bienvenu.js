import React from "react";
import "./bienvenu.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function Bienvenu(){

    const navigate = useNavigate();

    const bien =()=>{
        navigate('/home');
    }
    return(
        <div className="bienvenu">
            <div className="b1">
                <div className="bien">
                    Bienvenu sur
                </div>
                <div className="cuisine">
                    BIBLIO +
                </div>
            </div>
            <div className="desc">
                une plateforme de Gestion de livre de bibliotheque
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={bien}>Commencer</Button>
            </Stack>
        </div>
    ) 
} 

export default Bienvenu;