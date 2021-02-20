import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Statistic } from 'semantic-ui-react';
import styles from './styles.module.scss';

const ChatHeader = ({chatName, memberCounter, messageCounter, lastMessage}) => {
    const date = new Date(lastMessage);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return (
        <div className={styles.chatHeader}>
            <Statistic size='tiny'>
                <Statistic.Value>
                    <Icon name='rocketchat'/>{chatName}
                </Statistic.Value>
                <Statistic.Label>Have fan</Statistic.Label>
            </Statistic>
            <Statistic color='teal' size='tiny'>
                <Statistic.Value>
                    <Icon name='users'/> {memberCounter}
                </Statistic.Value>
                <Statistic.Label>Participants</Statistic.Label>
            </Statistic>
            <Statistic size='tiny' color='olive'>
                <Statistic.Value>
                    <Icon name='comment alternate'/> {messageCounter}
                </Statistic.Value>
                <Statistic.Label>Messages</Statistic.Label>
            </Statistic>
            <Statistic size='tiny' color='violet'>
                <Statistic.Value>
                    <Icon name='time'/> Last Mesage
                </Statistic.Value>
                <Statistic.Label>{date.toLocaleString("en-US", options)}</Statistic.Label>
            </Statistic>
        </div>
    );
};

ChatHeader.propTypes = {
    chatName: PropTypes.string.isRequired,
    memberCounter: PropTypes.number.isRequired,
    messageCounter: PropTypes.number.isRequired,
    lastMessage: PropTypes.string.isRequired
};

export default ChatHeader;
