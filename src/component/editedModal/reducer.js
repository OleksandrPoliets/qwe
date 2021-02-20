import { OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

const initialState = {
    messageId: '',
    isShown: false,
    text:''
};

export default function (state = initialState, action) {
    switch (action.type) {

        case OPEN_MODAL: {
            return {
                isShown: true,
                ...action.data
            };
        }

        case CLOSE_MODAL: {
            return {
                messageId: '',
                isShown: false,
                text:''
            };
        }

        default:
            return state;
    }
}
