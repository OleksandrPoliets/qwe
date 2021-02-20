import { OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

const openModal = data => ({
    type: OPEN_MODAL,
    data
});

export const setOpenModal = (messageId, text) => dispatch => {
    dispatch(openModal({messageId, text}));
};

export const closeModal = () => ({
    type: CLOSE_MODAL
});
