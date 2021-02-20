import React from 'react';
import PropTypes from 'prop-types';
import {Comment} from 'semantic-ui-react';
import styles from './styles.module.scss';
import UserMesage from "../../component/message";

const MesagesContainer = ({messages, carentUser, setLike, onEdit, deleteOwnMesage}) => {
    let tempDate;
    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const optionsTimeLine = {
        month: 'long',
        day: 'numeric'
    };
    const pastDays = (prevDate, date) => {
        const datePrev = new Date(prevDate);
        const carentDate = new Date(date);
        const result = Math.ceil((datePrev - carentDate) / 8.64e7);
        let message = '';
        if (result === 2) {
            message = 'Yesterday';
        }
        if (result > 2) {
            message = carentDate.toLocaleString("en-US", optionsTimeLine);
        }
        return message;
    };
    return (
        <div className={styles.messagesWrap}>
            <Comment.Group size='large' className={styles.listWrap}>
                {
                    messages.map((el, index) => {
                            tempDate = index ? pastDays(el.createdAt, messages[index - 1].createdAt) : null;
                            return (
                                <div key={el.id + Date.now()}>
                                    {tempDate
                                        ? (
                                            <div key={el.id + 'div'} className={styles.timelineWrap}>
                                                <p key={el.id + 'span'} className={styles.timeBlock}>{tempDate}</p>
                                            </div>
                                        )
                                        : null}
                                    <UserMesage
                                        key={el.id}
                                        userName={el.user}
                                        imgSrc={el.avatar}
                                        text={el.text}
                                        id={el.id}
                                        canEdit={el.userId === carentUser}
                                        like={el.likers.length}
                                        setLike={setLike}
                                        onEdit={onEdit}
                                        deleteOwnMesage={deleteOwnMesage}
                                        date={new Date(el.createdAt).toLocaleString("en-US", options)}
                                    />
                                </div>

                            )
                        }
                    )
                }
            </Comment.Group>
            <hr/>
            <hr/>
        </div>

    );
};

MesagesContainer.propTypes = {
    messages: PropTypes.array.isRequired,
    carentUser: PropTypes.string.isRequired,
    setLike: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    deleteOwnMesage: PropTypes.func.isRequired
};

export default MesagesContainer;
