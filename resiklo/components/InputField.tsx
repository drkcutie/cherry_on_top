import { useState } from 'react';
import { View, TextInput, KeyboardTypeOptions, TextInputProps } from 'react-native';

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
  keyboardType,
  secureTextEntry,
  textContentType
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`relative flex w-full flex-row border border-neutral-400 px-4 ${
        isFocused ? 'bg-neutral-50' : 'bg-white'
      }`}
    >
      <TextInput
        className="h-14 flex-1 text-lg"
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChange}
        multiline={false}
        textAlignVertical="center"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {icon && <View className="justify-center border-neutral-400">{icon}</View>}
    </View>
  );
}
