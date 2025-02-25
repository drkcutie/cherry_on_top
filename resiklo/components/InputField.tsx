import { View, Text, TextInput, KeyboardTypeOptions, TextInputProps } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: TextInputProps['textContentType'];
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
}

export default function InputField({
  label,
  value,
  onChange,
  keyboardType = 'default',
  secureTextEntry = false,
  textContentType = 'none'
}: InputFieldProps) {
  return (
    <View className="flex w-full flex-col gap-1">
      <Text className="font-jet">{label}</Text>
      <View className="relative flex w-full flex-row rounded-md border border-neutral-400">
        <View className="h-fit w-14 rounded-l-md border border-neutral-400" />
        <TextInput
          className="flex-1 px-4"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
}
