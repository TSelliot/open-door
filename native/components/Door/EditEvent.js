import React, { Text, TouchableOpacity, View, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { store } from '../../sharedNative/reducers/reducers.js';
import { Button } from '../Shared/Button';
import { backButton, cancelButtonNav, cancelButton,
  navToFull, popScene, getTruthies } from '../Shared/Misc';
import { GroupList, UserList } from '../Shared/StatefulSelectList';
const actions = require('../../sharedNative/actions/actions');
const api = require('../../sharedNative/utils/api.js');
import NavBar from '../Shared/NavBar.js';
import VibePicker from './VibePicker.js';
import styles2 from '../../styles/Door/doorStyles.js';
import StyledTextInput from '../Shared/StyledTextInput.js';
import socialStyles from '../../styles/Social/socialStyles.js';

const InviteSelects = (props) => {
  return (
  <View>
    <NavBar title={props.route.title} leftButton={backButton} />
    <props.route.listComponent
      inviteFunc={props.route.inviteFunc}
      preSelected={props.route.preSelected}
    />
  </View>
);
}
InviteSelects.propTypes = { route: React.PropTypes.object };

const getInvited = (invitedArr) => {
  return invitedArr.reduce((allInvitedItems, singleInvitedItem) => {
    allInvitedItems[singleInvitedItem.id] = true;
    return allInvitedItems;
  }, {});
};

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSubmit: props.route.onSubmit,
    };
  }
  componentDidMount() {
    api.getEvent(this.props.route.event.id, store.getState().jwt)
    .then((event) => {
      this.setState({
        event: {
          ...event,
          invitedFriends: getInvited(event.Users),
          invitedGroups: getInvited(event.Groups),
          preSelectedFriends: getInvited(event.Users),
          preSelectedGroups: getInvited(event.Groups),
        }
      });
    });
  }
  render() {
    const updateLocalEvent = (update) => {
      const event = this.state.event;
      event[Object.keys(update)[0]] = update[Object.keys(update)[0]];
      this.setState({ event });
    };
    const submitEvent = () => {
      if (!this.state.event.name) {
        Alert.alert('Your door needs a name!', '', [cancelButton]);
      } else {
        this.state.event.friends = getTruthies(this.state.event.invitedFriends);
        this.state.event.groups = getTruthies(this.state.event.invitedGroups);
        this.state.onSubmit(this.state.event);
        popScene();
      }
    };
    const updateEventName = name => updateLocalEvent({ name });
    const updateEventDetails = details => updateLocalEvent({ details });
    const changeVibe = vibe => updateLocalEvent({ vibe });
    const toggleInviteFriend = (friendId) => {
      const event = this.state.event;
      event.invitedFriends[friendId] = !event.invitedFriends[friendId];
      this.setState({ event });
    };
    const navToFriends = () => navToFull({
      component: InviteSelects,
      title: 'Invite Friends',
      listComponent: UserList,
      inviteFunc: toggleInviteFriend,
      preSelected: this.state.event.preSelectedFriends,
    });
    const toggleInviteGroup = (groupId) => {
      const event = this.state.event;
      event.invitedGroups[groupId] = !event.invitedGroups[groupId];
      this.setState({ event });
    };
    const navToGroups = () => navToFull({
      component: InviteSelects,
      title: 'Invite Groups',
      listComponent: GroupList,
      inviteFunc: toggleInviteGroup,
      preSelected: this.state.event.preSelectedGroups,
    });
    return (
      <View>
        <NavBar title={'Edit Event'} leftButton={cancelButtonNav}
          rightButton={{ title: 'Save', handler: submitEvent }}
        />
        <StyledTextInput onChangeText={updateEventName} placeholder={'Event Name'} />
        <StyledTextInput onChangeText={updateEventDetails} placeholder={'Description (optional)'} />
        <VibePicker changeVibe={changeVibe} initialVibe={'jam'} />
        <TouchableOpacity onPress={navToFriends} style={socialStyles.categoryButton} >
          <Text>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navToGroups} style={socialStyles.categoryButton} >
          <Text>GROUPS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EditEvent.propTypes = {
  route: React.PropTypes.object,
};

module.exports = EditEvent;
