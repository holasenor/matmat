import React from "react";
import {Modal, Button} from 'react-bootstrap';

class MySmallModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.title = this.props.title || 'asdf';
        this.state.texto = this.props.texto || 'asddsads';
    }

    render() {
        const {texto, ...rest } = this.props;
        return (
            <Modal {...rest} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        {this.state.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        {this.state.texto}
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default MySmallModal;
