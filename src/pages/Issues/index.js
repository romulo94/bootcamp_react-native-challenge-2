/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';
import PropTypes from 'prop-types';
import styles from './styles';

class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    filter: 'all',
    issues: [],
    loading: true,
    error: '',
    refreshing: false,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { filter } = this.state;
    const { navigation } = this.props;

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam('full_name')}/issues?state=${filter}`,
      );

      this.setState({ issues: data });
    } catch (_err) {
      this.setState({ error: 'Não foi possível completar a requisição' });
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  handleFilter = async (filter) => {
    this.setState({ filter });

    const { navigation } = this.props;

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam('full_name')}/issues?state=${filter}`,
      );

      this.setState({ issues: data });
    } catch (_err) {
      this.setState({ error: 'Erro ao recuperar as Issues' });
    }
  };

  renderIssueItem = ({ item }) => (
    <TouchableOpacity
      style={styles.containerIssueItem}
      onPress={() => Linking.openURL(item.html_url)}
    >
      <Image style={styles.avatar} source={{ uri: item.user.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.author}>{item.user.login}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-right" size={16} />
    </TouchableOpacity>
  );

  renderIssues = () => {
    const { issues, refreshing } = this.state;

    return !issues.length ? (
      <Text style={styles.empty}>Nenhuma issue encontrada</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderIssueItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const { loading, error, filter } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.containerFilter}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleFilter('all')}>
            <Text style={[styles.buttonText, filter === 'all' && styles.activeFilter]}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleFilter('open')}
          >
            <Text style={[styles.buttonText, filter === 'open' && styles.activeFilter]}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleFilter('closed')}
          >
            <Text style={[styles.buttonText, filter === 'closed' && styles.activeFilter]}>
              Fechadas
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator size="large" style={styles.loading} /> : this.renderIssues()}
      </View>
    );
  }
}

export default Issues;
