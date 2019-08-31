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
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('/meetups', {
          params: {
            date,
            page,
          },
        });

        const { data: subscriptions } = await api.get('/subscriptions');

        const meetupList = response.data.map(meetup => ({
          ...meetup,
          subscribed: subscriptions.some(
            subscription => subscription.meetup_id === meetup.id
          ),
        }));

        setMeetups([...meetups, ...meetupList]);
      } catch (err) {
        Alert.alert('Erro', 'Falha ao carregar os dados.');
      }
    }

    loadMeetups();
  }, [date, page]); // eslint-disable-line

  function prevDate() {
    setDate(subDays(date, 1));
    setMeetups([]);
    setPage(1);
  }

  function nextDate() {
    setDate(addDays(date, 1));
    setMeetups([]);
    setPage(1);
  }

  function handlePageChange() {
    setPage(page + 1);
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/meetups/${id}/subscribe`);

      const meetupIndex = meetups.findIndex(meetup => meetup.id === id);

      const meetupsCopy = meetups;

      meetupsCopy[meetupIndex].subscribed = true;

      setMeetups([...meetupsCopy]);

      Alert.alert('Sucesso!', 'Você se inscreveu na meetup com sucesso!');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Background>
      <Header />

      <DatePicker>
        <PrevDate onPress={prevDate}>
          <Icon name="chevron-left" size={25} color="#fff" />
        </PrevDate>

        <CurrentDate>
          {format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
        </CurrentDate>

        <NextDate onPress={nextDate}>
          <Icon name="chevron-right" size={25} color="#fff" />
        </NextDate>
      </DatePicker>

      <Container>
        <Meetups
          data={meetups}
          onEndReached={handlePageChange}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: meetup }) => (
            <Meetup>
              <Banner source={{ uri: meetup.banner.url }} />

              <Info>
                <Title>{meetup.title}</Title>
                <InfoText>
                  <Icon name="date-range" size={14} color="#666" />
                  <MeetupDate>
                    {format(
                      parseISO(meetup.date),
                      "dd 'de' MMMM 'de' yyyy', às' HH'h'mm",
                      {
                        locale: pt,
                      }
                    )}
                  </MeetupDate>
                </InfoText>
                <InfoText>
                  <Icon name="pin-drop" size={14} color="#666" />
                  <Location>{meetup.location}</Location>
                </InfoText>
                <InfoText>
                  <Icon name="person" size={14} color="#666" />
                  <Organizer>Organizador: {meetup.user.name}</Organizer>
                </InfoText>
              </Info>

              {!meetup.subscribed && (
                <SubscribeButton>
                  <Button onPress={() => handleSubscription(meetup.id)}>
                    Realizar inscrição
                  </Button>
                </SubscribeButton>
              )}
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
