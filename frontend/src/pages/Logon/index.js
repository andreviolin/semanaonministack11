import React, { useState } from 'react';
import {FiLogIn} from 'react-icons/fi';

//impede que o react seja reiniciado quando apertar em um link
import { Link, useHistory} from 'react-router-dom';

//import Api
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroeImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
         e.preventDefault();


         try {
             if (id===""){
                alert("O campo esta vazio!!!")
             }else{
                const response = await api.post('session', { id });

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);

                history.push('/profile');
             }
            
           // console.log(response.data.name);
         } catch (err) {
            alert("falha tente novamente");
         }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
            

             <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>

                <input placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
             </form>
            </section> 

            <img src={heroeImg} alt="Heroes"/>
        </div>
    );
}