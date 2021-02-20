import { combineReducers } from "redux";
import chat from "./containers/chat/reducer"
import editModal from "./component/editedModal/reducer"


const rootReducer = combineReducers({
    chat,
    editModal
});

export default rootReducer;
