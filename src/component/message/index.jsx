import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Comment, Icon, Button, Label} from 'semantic-ui-react';
import styles from './styles.module.scss';

const UserMesage = ({
    userName,
    imgSrc,
    text,
    id,
    date,
    canEdit,
    like,
    setLike,
    onEdit,
    deleteOwnMesage
}) =>{
    const [showEdit, setShowEdit] = useState(false);
    const show=() => {
        setShowEdit(true);
    };
    const hide=() => {
        setShowEdit(false);
    };
    return (
        <div className={styles.userMessageWrap} style={canEdit ? {justifyContent: 'flex-end'} : null}>
            <div
                className={styles.messageWrap}
                onMouseEnter={show}
                onMouseLeave={hide}
            >

                <Comment>
                    {canEdit
                        ? null
                        : (<Comment.Avatar src={imgSrc} className={styles.comment}/>)
                    }

                    <Comment.Content>

                        <Comment.Author as='a'>{userName}</Comment.Author>
                        <Comment.Metadata>
                            <div>{date}</div>
                        </Comment.Metadata>
                        <Comment.Text>{text}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                <Label onClick={() => {
                                    setLike(id)
                                }}>
                                    <Icon name='heart' color='red'/> {like}
                                </Label>
                            </Comment.Action>
                            <Comment.Action>
                                {showEdit && (
                                    <Button icon size='mini' onClick={() => {
                                        onEdit(id)
                                    }}>
                                        <Icon name='edit'/>
                                    </Button>
                                )}
                                {canEdit
                                    ? (

                                            <Button icon size='mini' onClick={() => {
                                                deleteOwnMesage(id)
                                            }}>
                                                <Icon name='trash alternate'/>
                                            </Button>

                                    )
                                    : null
                                }
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </div>
        </div>
    );
}

UserMesage.propTypes = {
    userName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    like: PropTypes.number.isRequired,
    setLike: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    deleteOwnMesage: PropTypes.func.isRequired
};

export default UserMesage;
