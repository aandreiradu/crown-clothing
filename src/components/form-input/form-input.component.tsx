import React, { InputHTMLAttributes,FC } from "react";

import {FormInputLabel,Group,Input} from "./form-input.styles";

type FormInputProps = {
  label : string
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput : FC<FormInputProps> = (props) => {
  const { label, ...otherProps } = props;
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
