import {GET_MESSAGE, UPDATE_MESSAGE} from './actionTypes'
import {getMessage} from '../../helpers/apiHelper';

const setMessage = data => ({
    type: GET_MESSAGE,
    data
});

const updateMessage = data => ({
    type: UPDATE_MESSAGE,
    data
});

const sortByDate = data => {
    const tempData = [...data];
    tempData.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
    });

    return tempData;
}

const getUssers = data => {
    const userData = [];
    data.map(el => {
        const {userId, avatar, user} = el;
        if (userData.length === 0) {
            userData.push({userId, avatar, user});
        } else {
            const result = userData.find(name => name.user === el.user);
            if (!result) {
                userData.push({userId, avatar, user});
            }
        }
    });
    return userData;
};

export const loadMessage = () => async (dispatch, getRootState) => {
    const prevValue = getRootState();
    const {data} = await getMessage();
    const sortMessage = sortByDate(data);
    const userData = getUssers(sortMessage);
    const tempData = sortMessage.map(el => {
        return {
            ...el,
            likers: []
        }
    });
    const lastMessageTime = tempData[tempData.length - 1].createdAt;
    userData.push(prevValue.chat.userInfo);
    const message = {
        message: [...tempData],
        userData,
        lastMessageTime: tempData[tempData.length - 1].createdAt,
        mesageCount: tempData.length,
        usersCount: userData.length
    };

    dispatch(setMessage(message));
};

export const addMessage = (newMessage, user) => (dispatch, getRootState) => {
    const prevValue = getRootState();
    const date = new Date().toISOString();
    const {message: messages} = prevValue.chat;
    const lastMessageTime = date;

    messages.push({
        id: Date.now().toString(),
        userId: user.userId,
        avatar: user.avatar,
        user: user.user,
        likers: [],
        text: newMessage,
        createdAt: date,
        editedAt: ""
    });

    dispatch(updateMessage({
            message: [...messages],
            lastMessageTime,
            mesageCount: messages.length,
        }
    ));
};

export const messageReaction = (messageId, user) => (dispatch, getRootState) => {
    const prevValue = getRootState();
    const {message: messages} = prevValue.chat;
    const tempMessage = messages.map(el => {
        if (el.id === messageId && el.userId !== user.userId) {
            const tempLike = el.likers.findIndex(el => el === user.userId);
            if (tempLike === -1) {
                el.likers.push(user.userId)
            } else {
                el.likers.splice(tempLike, 1);
            }
        }
        return el;
    });

    dispatch(updateMessage({
            message: [...tempMessage],
        }
    ));
};

export const deleteUserMesage = messageId => (dispatch, getRootState) => {
    const prevValue = getRootState();
    const {message: messages} = prevValue.chat;
    const tempMessage = messages.filter(el => el.id !== messageId);

    dispatch(updateMessage({
            message: [...tempMessage],
            mesageCount: messages.length,
            lastMessageTime: tempMessage[tempMessage.length - 1].createdAt,
        }
    ));
};

export const saveChanges = (messageId, text) => (dispatch, getRootState) => {
    const date = new Date().toISOString();
    const prevValue = getRootState();
    const {message: messages} = prevValue.chat;
    const tempMessage = messages.map(el => {
        if (el.id === messageId) {
            el.text = text;
            el.editedAt = date;
        }
        return el
    });

    dispatch(updateMessage({message: [...tempMessage]}));
};
