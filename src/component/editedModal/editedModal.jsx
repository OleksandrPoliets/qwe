import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Button, Form, Label, Modal} from 'semantic-ui-react';
import * as actions from "./actions";
import { saveChanges } from "../../containers/chat/actions";

function EditedModal({isShown, text, closeModal, saveChanges, messageId}) {
    const [mesageText, setMesageText] = useState(text);
    const [error, setError] = useState(false)
    useEffect( () => {
        setMesageText(text);
    }, [text]);

    const save = () => {
        if (mesageText > 0){
            setError(false);
            saveChanges(messageId, mesageText);
            setMesageText('');
            closeModal();
        } else {
            setError(true);
        }
    };
    const onTextWrite = e => {
        setMesageText(e.target.value);
        setError(false);
    };
    return (
        <Modal
            onClose={closeModal}
            open={isShown}
        >
            <Modal.Header>Edit your message</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form reply onSubmit={save}>
                        <Form.TextArea
                            value={mesageText}
                            placeholder="Type a comment..."
                            onChange={onTextWrite}
                        />
                        <Button type="submit" content="Save changes" labelPosition="left" icon="edit" primary/>
                        <Button
                            content="Cancel"
                            labelPosition='right'
                            icon='cancel'
                            onClick={() => closeModal()}
                            negative
                        />
                        {error && (
                            <Label basic color='red' pointing='left'>
                                Please enter a value
                            </Label>
                        )}
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

EditedModal.propTypes = {
    isShown: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    saveChanges: PropTypes.func.isRequired
};

const mapStateToProps = state =>{
    return {
        isShown: state.editModal.isShown,
        text: state.editModal.text,
        closeModal: state.editModal.closeModal,
        saveChanges: state.chat.saveChanges,
        messageId: state.editModal.messageId

    }
};

const mapDispatchToProps={
    ...actions,
    saveChanges
};

export default connect(mapStateToProps, mapDispatchToProps)(EditedModal);


