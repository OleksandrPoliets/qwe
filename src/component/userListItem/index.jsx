import React from 'react';
import PropTypes from 'prop-types';
import {List, Image} from 'semantic-ui-react';


const UserListItem = ({userName, imgSrc}) => (
    <List.Item>
        <Image avatar src={imgSrc}/>
        <List.Content>
            <List.Header as='a'>{userName}</List.Header>
        </List.Content>
    </List.Item>
);

UserListItem.propTypes = {
    userName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
};

export default UserListItem;
