import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { format, parseISO, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

import {
  Container,
  Meetups,
  DatePicker,
  PrevDate,
  CurrentDate,
  NextDate,
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

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        const response = await api.get('/subscriptions');

        setSubscriptions(response.data);
      } catch (err) {
        Alert.alert('Erro', 'Falha ao carregar os dados.');
      }
    }

    loadSubscriptions();
  }, []);

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

Dashboard.navigationOptions = {
  title: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};
