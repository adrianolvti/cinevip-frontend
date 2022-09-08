import React, { useEffect, useState } from 'react';
import './App.css';
import SessionForm from './SessionForm';
import SessionTable from './SessionTable';

function App() {

    // Objeto Session
    const session = {
        hours: ''
    }

    // Use State
    const [btnStore, setBtnStore] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [objSession, setObjSession] = useState(session);

    // Use Effect
    useEffect(() => {
        fetch("http://localhost:8080/api/session")
            .then(response => response.json())
            .then(jsonResponse => setSessions(jsonResponse));
    }, []);

    // Obtendo os dados do formulário
    const whenTyping = (event) => {
        setObjSession({ ...objSession, [event.target.name]: event.target.value });
    }

    // Cadastrar session
    const storeSession = () => {
        fetch('http://localhost:8080/api/session', {
            method: 'post',
            body: JSON.stringify(objSession),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(returnData => returnData.json())
            .then(returnDataConverted => {
                if (returnDataConverted.id != undefined) {
                    setSessions([...sessions, returnDataConverted]);
                    alert('Sessão cadastrada com sucesso');
                    cleanForm()
                    window.location.reload();
                } else {
                    alert(returnDataConverted[0].errorMessage);
                }
            });
    }

    // Alterar uma sessão
    const updateSession = () => {
        fetch('http://localhost:8080/api/session/' + objSession.id, {
            method: 'put',
            body: JSON.stringify(objSession),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(returnData => returnData.json())
            .then(returnDataConverted => {
                if (returnDataConverted.id != undefined) {
                    alert('Sessão alterada com sucesso');

                    // Cópia temporária do vetor de sessões
                    let temporaryVector = [...sessions];

                    // Índice
                    let index = temporaryVector.findIndex((p) => {
                        return p.id === objSession.id;
                    });

                    // Alterar sessão do vetor temporário
                    temporaryVector[index] = objSession;

                    // Atualizar o vetor de sessões
                    setSessions(temporaryVector);

                    cleanForm()
                    // window.location.reload();
                } else {
                    alert(returnDataConverted[0].errorMessage + ' o campo ' + returnDataConverted[0].fieldName);
                }
            });
    }

    // Excluir session
    const deleteSession = () => {
        fetch('http://localhost:8080/api/session/' + objSession.id, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(returnData => returnData.json())
            .then(returnDataConverted => {

                //Ajustar retorno da api para vir uma mensagem no alert
                alert('Sessão deletada com sucesso');

                // Cópia temporária do vetor de sessões
                let temporaryVector = [...sessions];

                // Índice
                let index = temporaryVector.findIndex((p) => {
                    return p.id === objSession.id;
                });

                // Remover sessão do vetor temporário
                temporaryVector.splice(index, 1);

                // Atualizar o vetor de sessões
                setSessions(temporaryVector);

                // Limpar formulário
                cleanForm();
            });
    }

    // Limpar formulário
    const cleanForm = () => {
        setObjSession(session);
        setBtnStore(true);
    }

    // Selecionar produto
    const selectSession = (index) => {
        setObjSession(sessions[index]);
        setBtnStore(false);
    }

    // Retorno
    return (
        <div>
            <div class="card-body">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand">Dashboard</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="#">Sessões</a>
                                <a class="nav-link disabled">Login</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="row">
                    {/* Body Início */}
                    <div class="row-cols-1 row-cols-md-1 g-4">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col">
                                    <div class="col">
                                        <div class="card border-dark mb-3">
                                            <div class="card-header">
                                                <h1 class="card-title">Sessões</h1>
                                            </div>
                                            <div class="card-body text-dark">
                                                <div>
                                                    {/* <p>{JSON.stringify(objSession)}</p> */}
                                                    {/* <p>{JSON.stringify(sessions)}</p> */}
                                                    <SessionForm button={btnStore} keyboardEvent={whenTyping} store={storeSession} obj={objSession} cancel={cleanForm} deleteSession={deleteSession} updateSession={updateSession} />
                                                    <SessionTable vector={sessions} select={selectSession} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <div class="col">
                                        <div class="card border-dark mb-3">
                                            <div class="card-header">
                                                <h1 class="card-title">Filmes</h1>
                                            </div>
                                            <div class="card-body text-dark">
                                                <p class="card-text">Em construção.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="col">
                                        <div class="card border-dark mb-3">
                                            <div class="card-header">
                                                <h1 class="card-title">Salas</h1>
                                            </div>
                                            <div class="card-body text-dark">
                                                <p class="card-text">Em construção.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="col">
                                        <div class="card border-dark mb-3">
                                            <div class="card-header">
                                                <h1 class="card-title">Vendas</h1>
                                            </div>
                                            <div class="card-body text-dark">
                                                <p class="card-text">Em construção.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
