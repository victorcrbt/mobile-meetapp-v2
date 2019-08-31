import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('/meetups', {
          params: {
            date,
          },
        });

        console.tron.log(response.data);

        setMeetups(response.data);
      } catch (err) {
        console.tron.log(err);
      }
    }

    loadMeetups();
  }, [date]);

  return (
    <Background>
      <Header />

      <DatePicker>
        <PrevDate onPress={() => setDate(subDays(date, 1))}>
          <Icon name="chevron-left" size={25} color="#fff" />
        </PrevDate>

        <CurrentDate>
          {format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
        </CurrentDate>

        <NextDate onPress={() => setDate(addDays(date, 1))}>
          <Icon name="chevron-right" size={25} color="#fff" />
        </NextDate>
      </DatePicker>

      <Container>
        <Meetups
          data={meetups}
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

              <SubscribeButton>
                <Button>Realizar inscrição</Button>
              </SubscribeButton>
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
