import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Label} from 'semantic-ui-react';
import styles from './styles.module.scss';

const UserInput = ({postMessage}) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false)
    const handleChange = e => {
        e.preventDefault();
        if (text.length > 0) {
            postMessage(text);
            setText('');
        } else {
            setError(true);
        }
    };
    const onTextWrite = e => {
        setText(e.target.value);
        setError(false);
    };
    return (
        <Form reply onSubmit={handleChange} className={styles.form}>
            <Form.TextArea
                value={text}
                placeholder="Type a comment..."
                onChange={onTextWrite}
            />
            <Button type="submit" content="Post" labelPosition="left" icon="edit" primary/>
            {error && (
                <Label basic color='red' pointing='left'>
                    Please enter a value
                </Label>
            )}
        </Form>
    );
};

UserInput.propTypes = {
    postMessage: PropTypes.func.isRequired
};

export default UserInput;
