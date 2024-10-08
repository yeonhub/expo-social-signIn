import {Pressable, Text, View} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default function Email() {

  const sendEmail = async () => {
    const result = await MailComposer.composeAsync({
      recipients: ['example@example.com'],
      subject: 'Hello from Expo',
      body: 'This is a test email.',
    });
  };

  return (
    <View>
      <Pressable onPress={sendEmail} style={{marginTop : 100}}>
        <Text>send email</Text>
      </Pressable>
    </View>
  );
}
