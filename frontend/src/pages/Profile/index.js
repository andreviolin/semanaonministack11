import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
 
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    function handleDeleteIncident(id) {
        try{
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            //deletando sem atualizar a pagina. Obs: instantaneamente
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    //sair
    function sair(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-conteiner">
            <header>
                <img src={logoImg} alt="be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                <button onClick={sair} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}