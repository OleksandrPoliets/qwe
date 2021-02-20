import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import * as actions from './actions';
import {Loader, Dimmer} from 'semantic-ui-react';
import ChatHeader from "../../component/chatHeader";
import UsersList from "../usersList";
import UserInput from "../../component/userInput";
import MesagesContainer from "../messagesContainer";
import { setOpenModal } from '../../component/editedModal/actions'

import styles from './styles.module.scss';

const Chat = ({
    userInfo,
    message = [],
    userData = [],
    loadingData,
    lastMessageTime,
    mesageCount,
    usersCount,
    loadMessage,
    addMessage,
    messageReaction,
    deleteUserMesage,
    setOpenModal
}) => {

    useEffect( () => {
        loadMessage();
    }, []);
    useEffect( () => {
    }, [message]);


    const handleLike = postId => {
        messageReaction(postId, userInfo);
    };

    const onAddPost = data => {
        addMessage(data,userInfo);
    };

    const hanndleEddit = id => {
        const editedMessage = message.find(el => el.id === id);
        setOpenModal(id, editedMessage.text);

    };

    const deleteMessage = id => {
        deleteUserMesage(id)
    };

    return (
        <main className={styles.main}>
            {loadingData
                ? (
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                )
                : (
                    <>
                        <ChatHeader
                            chatName='test'
                            memberCounter={usersCount}
                            messageCounter={mesageCount}
                            lastMessage={lastMessageTime}
                        />
                        <div className={styles.chatWrap}>
                            <div className={styles.messageWrap}>
                                <MesagesContainer
                                    onEdit={hanndleEddit}
                                    messages={message}
                                    carentUser={userInfo.userId}
                                    setLike={handleLike}
                                    deleteOwnMesage={deleteMessage}
                                />
                                <UserInput
                                    postMessage={onAddPost}
                                />
                            </div>
                            <UsersList
                                users={userData}
                            />
                        </div>
                    </>
                )}
        </main>
    );
};

Chat.propTypes = {
    message: PropTypes.array.isRequired,
    userData: PropTypes.array.isRequired,
    loadingData: PropTypes.bool.isRequired,
    lastMessageTime: PropTypes.string.isRequired,
    mesageCount: PropTypes.number.isRequired,
    usersCount: PropTypes.number.isRequired,
    loadMessage: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,
    messageReaction: PropTypes.func.isRequired,
    deleteUserMesage: PropTypes.func.isRequired
};

const mapStateToProps = state =>{
    return {
        message: state.chat.message,
        userData: state.chat.userData,
        loadingData: state.chat.loadingData,
        lastMessageTime: state.chat.lastMessageTime,
        mesageCount: state.chat.mesageCount,
        usersCount: state.chat.usersCount,
        loadMessage: state.chat.loadMessage,
        addMessage: state.chat.addMessage,
        messageReaction: state.chat.messageReaction,
        deleteUserMesage: state.chat.deleteUserMesage,
        userInfo: state.chat.userInfo,
        setOpenModal: state.editModal.setOpenModal
    }
};

const mapDispatchToProps={
    ...actions,
    setOpenModal
};


export default connect(mapStateToProps, mapDispatchToProps)(Chat);

