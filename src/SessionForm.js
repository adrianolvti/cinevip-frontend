import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function SessionForm({ button, keyboardEvent, store, obj, cancel, deleteSession, updateSession }) {
    // Modal
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    return (
        <>
            {
                button
                    ?
                    <Button variant="primary" onClick={handleShow}>
                        Cadastrar
                    </Button>
                    :
                    <div>
                        <input type='button' onClick={handleShowUpdate} value='Alterar' className="btn btn-primary" />
                        <input type='button' onClick={deleteSession} value='Remover' className="btn btn-danger" />
                        <input type='button' value='Cancelar' onClick={cancel} className="btn btn-primary" />
                    </div>
            }

            {/* Create Modal bootstrap-react */}
            <Modal size="sm" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Sessão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="col-sm-4 mx-auto">
                        <Form.Control type='time' value={obj.hours} onChange={keyboardEvent} name='hours' className="form-control" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" 
                        // onClick={handleClose} 
                        onClick={store}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal bootstrap-react */}
            <Modal size="sm" show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Sessão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="col-sm-5 mx-auto">
                        <Form.Control type='time' value={obj.hours} onChange={keyboardEvent} name='hours' className="form-control" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={updateSession}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default SessionForm;