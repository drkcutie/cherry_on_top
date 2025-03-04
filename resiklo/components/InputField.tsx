import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
  TouchableOpacity
} from 'react-native';

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
  const [isVisible, setVisibility] = useState(false);

  const isPassword = textContentType === 'password';

  return (
    <View
      className={`relative flex w-fit flex-row border border-neutral-400 px-4 ${
        isFocused ? 'bg-neutral-50' : 'bg-white'
      }`}
    >
      <TextInput
        className="h-14 flex-1 text-lg"
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && !isVisible}
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

      <View className="items-center justify-center">
        {isPassword && (
          <TouchableOpacity onPress={() => setVisibility(!isVisible)}>
            {isVisible ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
          </TouchableOpacity>
        )}

        {/* Icon Display */}
        {!isPassword && icon && <View>{icon}</View>}
      </View>
    </View>
  );
}
