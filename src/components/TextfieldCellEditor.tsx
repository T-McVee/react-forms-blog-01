import { CustomCellEditorProps } from "ag-grid-react";
import { TextField } from "@mui/material";
import { GenericCellEditor } from "./GenericCellEditor";

interface IProps extends CustomCellEditorProps {
  fieldRoot: string;
  options: any[];
}

export const TextfieldCellEditor = (props: IProps) => {
  return <GenericCellEditor {...props} FieldControl={TextField} />;
};
