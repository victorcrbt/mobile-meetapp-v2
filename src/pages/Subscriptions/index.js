import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import {
  Container,
  Meetups,
  Meetup,
  Banner,
  Info,
  InfoText,
  Title,
  MeetupDate,
  Location,
  Organizer,
  SubscribeButton,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    try {
      const response = await api.get('/subscriptions');

      setSubscriptions(response.data);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao carregar os dados.');
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleSubscription(id) {
    try {
      await api.delete(`/meetups/${id}/unsubscribe`);

      const index = subscriptions.findIndex(subs => subs.id === id);

      const subscriptionsCopy = subscriptions;

      subscriptionsCopy.splice(index, 1);

      setSubscriptions([...subscriptionsCopy]);

      Alert.alert('Sucesso!', 'Você cancelou a inscrição com sucesso!');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  return (
    <Background>
      <Header />

      <Container>
        <Meetups
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: subscription }) => (
            <Meetup>
              <Banner source={{ uri: subscription.meetup.banner.url }} />

              <Info>
                <Title>{subscription.meetup.title}</Title>
                <InfoText>
                  <Icon name="date-range" size={14} color="#666" />
                  <MeetupDate>
                    {format(
                      parseISO(subscription.meetup.date),
                      "dd 'de' MMMM 'de' yyyy', às' HH'h'mm",
                      {
                        locale: pt,
                      }
                    )}
                  </MeetupDate>
                </InfoText>
                <InfoText>
                  <Icon name="pin-drop" size={14} color="#666" />
                  <Location>{subscription.meetup.location}</Location>
                </InfoText>
                <InfoText>
                  <Icon name="person" size={14} color="#666" />
                  <Organizer>
                    Organizador: {subscription.meetup.user.name}
                  </Organizer>
                </InfoText>
              </Info>

              <SubscribeButton>
                <Button onPress={() => handleSubscription(subscription.id)}>
                  Cancelar inscrição
                </Button>
              </SubscribeButton>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  title: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
