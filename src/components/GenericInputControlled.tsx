import { Controller, useFormContext } from "react-hook-form";
import { Box, FormControl, FormHelperText, InputLabel } from "@mui/material";
import { ComponentType, ReactElement } from "react";

interface IProps {
  name: string;
  label: string;
  FieldControl: ComponentType<any>;
  fieldOptions?: any;
  options?: ReactElement[];
  // transform?: (value: any) => any;
}

export const GenericInputControlled = (props: IProps) => {
  const { name, options, label, FieldControl, fieldOptions } = props;
  const {
    control,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          {options && <InputLabel id={name}>{label}</InputLabel>}
          <FieldControl
            {...field}
            label={label}
            variant="outlined"
            sx={isDirty && dirtyStyle}
            size="small"
            fullWidth
            {...fieldOptions}
            children={options}
            error={!!hasError}
            helperText={
              (hasError && (hasError.message as string)) || (isDirty && "Dirty")
            }
          />
          {options && isDirty && <FormHelperText>Dirty</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

const dirtyStyle = {
  div: {
    color: "red",
  },
};
