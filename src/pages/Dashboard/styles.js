import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const DatePicker = styled.View`
  height: 50px;
  padding: 0 20px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PrevDate = styled.TouchableOpacity``;

export const CurrentDate = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const NextDate = styled.TouchableOpacity``;

export const Meetups = styled.FlatList`
  margin-top: 20px;
  padding: 0 20px;
`;

export const Meetup = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
  padding-bottom: 10px;
  background: #fff;
  overflow: hidden;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 170px;
`;

export const Info = styled.View`
  padding: 10px;
`;

export const InfoText = styled.View`
  margin-bottom: 5px;

  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const MeetupDate = styled.Text`
  margin-left: 5px;
  color: #666;
  font-size: 14px;
`;

export const Location = styled.Text`
  margin-left: 5px;
  font-size: 14px;
  color: #666;
`;

export const Organizer = styled.Text`
  margin-left: 5px;
  font-size: 14px;
  color: #666;
`;

export const SubscribeButton = styled.View`
  padding: 0 10px;
`;
