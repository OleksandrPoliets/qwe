import MainHeader from "./component/mainHeader/mainHeader";
import MainFooter from "./component/mainFooter";
import Chat from "./containers/chat";
import EditedModal from "./component/editedModal/editedModal";
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.app}>
        <MainHeader/>

        <Chat/>
        <EditedModal/>
        <MainFooter/>
    </div>
  );
}

export default App;
