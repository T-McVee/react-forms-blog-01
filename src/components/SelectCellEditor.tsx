import { CustomCellEditorProps } from "ag-grid-react";
import { MenuItem, Select } from "@mui/material";
import { GenericCellEditor } from "./GenericCellEditor";

interface IProps extends CustomCellEditorProps {
  fieldRoot: string;
  options: any[];
}

export const SelectCellEditor = (props: IProps) => {
  const { options } = props;

  return (
    <GenericCellEditor
      {...props}
      FieldControl={Select}
      options={options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    />
  );
};
