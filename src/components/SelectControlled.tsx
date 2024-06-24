import { MenuItem, Select } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { IOptionType } from "../types";
import { GenericInputControlled } from "./GenericInputControlled";
import { ReactElement } from "react";

interface IProps<T = unknown> {
  control: Control<FieldValues, any>;
  name: string;
  label: string;
  options: IOptionType<T>[];
}

export const SelectControlled = <T,>(props: IProps<T>) => {
  const { options } = props;

  return (
    <GenericInputControlled
      {...props}
      FieldControl={Select}
      options={options.map<ReactElement>((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.title}
        </MenuItem>
      ))}
    />
  );
};

// const dirtyStyle = {
//   div: {
//     color: "red",
//   },
// };

// const { control, name, label, options } = props;
// const {
//   formState: { dirtyFields },
// } = useFormContext();

// const isDirty = dirtyFields[name];

// <Controller
//   name={name}
//   control={control}
//   render={({ field }) => (
//     <FormControl>
//       <InputLabel id={name}>{label}</InputLabel>
//       <Select
//         {...field}
//         label={label}
//         variant="outlined"
//         sx={isDirty && dirtyStyle}
//       >
// {options.map((option) => (
//   <MenuItem key={option.id} value={option.id}>
//     {option.title}
//   </MenuItem>
// ))}
//       </Select>
//       {isDirty && <FormHelperText>Dirty</FormHelperText>}
//     </FormControl>
//   )}
// />
