import { View, Text, TextInput, KeyboardTypeOptions, TextInputProps } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  icon?: JSX.Element;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: TextInputProps['textContentType'];
  secureTextEntry?: boolean;
  onChange: (text: string) => void;
}

export default function InputField({
  label,
  value,
  icon,
  onChange,
  keyboardType = 'default',
  secureTextEntry = false,
  textContentType = 'none'
}: InputFieldProps) {
  return (
    <View className="flex w-full flex-col gap-1">
      <Text className="font-jet">{label}</Text>
      <View className="relative flex w-full flex-row rounded-md border border-neutral-400">
        {icon && (
          <View className="justify-center rounded-l-md border-r border-neutral-400 px-4">
            {icon}
          </View>
        )}
        <TextInput
          className="h-14 w-full px-4 text-lg"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChange}
          multiline={false}
          textAlignVertical="center"
        />
      </View>
    </View>
  );
}
