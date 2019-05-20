/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';

import {
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import PropTypes from 'prop-types';

import api from '~/services/api';

class Repositories extends Component {
  static navigationOptions = {
    title: 'GitIssues',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    repositories: [],
    inputRepository: '',
    loadingAdd: false,
    err: '',
    loadingRepositories: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    const repositories = JSON.parse(await AsyncStorage.getItem('@Githuber:repositories'));
    this.setState({ repositories: repositories || [] });
  };

  addRepository = async () => {
    const { inputRepository, repositories } = this.state;
    this.setState({ loadingAdd: true });

    try {
      const { data } = await api.get(`/repos/${inputRepository}`);

      await AsyncStorage.setItem('@Githuber:repositories', JSON.stringify([...repositories, data]));
      this.setState({
        inputRepository: '',
        err: '',
        repositories: [...repositories, data],
      });
    } catch (error) {
      this.setState({ err: 'Nao existe' });
    } finally {
      this.setState({ loadingAdd: false });
    }
  };

  renderRepository = navigate => ({ item }) => (
    <TouchableOpacity
      style={styles.containerRepository}
      onPress={() => navigate('Issues', { title: item.name, full_name: item.full_name })}
    >
      <Image style={styles.avatar} source={{ uri: item.owner.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.author}>{item.owner.login}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-right" size={16} />
    </TouchableOpacity>
  );

  renderRepositories = (navigate) => {
    const { repositories } = this.state;

    return !repositories.length ? (
      <Text style={styles.empty}>Nenhum repositório</Text>
    ) : (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderRepository(navigate)}
        // onRefresh={this.loadRepositories}
        // refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const {
      inputRepository, loadingAdd, err, loadingRepositories,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formInput}
              autoCapitalize="none"
              placeholder="Adicionar novo repositório"
              autoCorrect={false}
              placeholderTextColor={styles.placeholderColor.color}
              value={inputRepository}
              onChangeText={text => this.setState({ inputRepository: text })}
            />

            <TouchableOpacity onPress={this.addRepository}>
              {loadingAdd ? (
                <ActivityIndicator size="small" style={styles.formLoading} />
              ) : (
                <Icon name="plus" size={20} style={styles.formIcon} />
              )}
            </TouchableOpacity>
          </View>
          {!!err && <Text style={styles.error}>{err}</Text>}
        </View>
        {loadingRepositories ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          this.renderRepositories(navigate)
        )}
      </View>
    );
  }
}
export default withNavigation(Repositories);
