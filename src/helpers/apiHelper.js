import axios from "axios";

export const getMessage = async () => {
    try {
        const message = await axios.get('https://edikdolynskyi.github.io/react_sources/messages.json');

        return message;
    } catch (e) {
        console.log(e);
    }

}
