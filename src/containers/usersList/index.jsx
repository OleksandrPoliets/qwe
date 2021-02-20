import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'semantic-ui-react';
import UserListItem from "../../component/userListItem";
import styles from './styles.module.scss';

const UsersList = ({users}) => {
    return (
        <List className={styles.list} selection verticalAlign='middle' size='large'>
            {
                users.map(el => (
                        <UserListItem
                            key={el.userId}
                            userName={el.user}
                            imgSrc={el.avatar}
                        />
                    )
                )
            }
        </List>
    );
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersList;
