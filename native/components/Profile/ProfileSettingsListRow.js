import styles from '../../styles/Event/eventStyles.js';
import { reducer, store } from '../../sharedNative/reducers/reducers.js';
import React, {
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
 } from 'react-native';

const ProfileSettingsListRow = () => (
  <View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Name: {store.getState().user.userName}</Text>
    </View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Nickname: TODO</Text>
    </View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>Address: TODO</Text>
    </View>
  </View>
);

module.exports = ProfileSettingsListRow;
