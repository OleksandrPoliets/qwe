import { GET_MESSAGE, UPDATE_MESSAGE } from "./actionTypes";

const initialState = {
    message: [],
    userData: [],
    loadingData: true,
    lastMessageTime: '',
    mesageCount: 0,
    usersCount: 0,
    userInfo: {
        userId: Date.now().toString(),
        avatar: 'https://styles.redditmedia.com/t5_rg2br/styles/profileIcon_snooead9969d-77dc-43a2-9ec4-56f6bfe040e6-headshot.png?width=256&height=256&crop=256:256,smart&s=1ee5302ed85fee1c1df54504eb3b8174460b38f7',
        user: 'TestUser'
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGE: {
            return {
                ...state,
                loadingData: false,
                message: [...action.data.message],
                userData: [...action.data.userData],
                lastMessageTime: action.data.lastMessageTime,
                mesageCount: action.data.mesageCount,
                usersCount: action.data.usersCount
            }
        }

        case UPDATE_MESSAGE: {
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state;
    }
}
