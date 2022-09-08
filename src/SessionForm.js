import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function SessionForm({ button, keyboardEvent, store, obj }) {
    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <input type='button' value='Alterar' className="btn btn-primary" />
                        <input type='button' value='Remover' className="btn btn-danger" />
                        <input type='button' value='Cancelar' className="btn btn-primary" />
                    </div>
            }

            {/* Modal bootstrap-react */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de sessão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input type='time' value={obj.hours} onChange={keyboardEvent} name='hours' className="form-control" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" 
                    // onClick={handleClose} 
                    onClick={store}>
                        Cadastrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default SessionForm;