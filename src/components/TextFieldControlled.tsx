import { TextField } from "@mui/material";
import { GenericInputControlled } from "./GenericInputControlled";

interface IProps {
  name: string;
  label: string;
}

export const TextFieldControlled = (props: IProps) => {
  return <GenericInputControlled {...props} FieldControl={TextField} />;
};

// const dirtyStyle = {
//   input: {
//     color: "red",
//   },
// };

// const { name, label } = props;
// const {
//   formState: { dirtyFields, errors },
// } = useFormContext();

// const isDirty = dirtyFields[name];
// const hasError = errors[name];

// <Controller
//   name={name}
//   control={control}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       label={label}
//       variant="outlined"
//       error={!!hasError}
//       helperText={
//         (hasError && (hasError.message as string)) || (isDirty && "Dirty")
//       }
//       sx={isDirty && dirtyStyle}
//     />
//   )}
// />
