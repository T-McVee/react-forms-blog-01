import { Box } from "@mui/material";
import { CustomCellRendererProps } from "ag-grid-react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";
import { useEffect, useState } from "react";

interface IProps extends CustomCellRendererProps {
  fieldRoot: string;
}

export const CustomCellRenderer = (props: IProps) => {
  const { value, data: targetValue, fieldRoot, colDef } = props;
  const {
    formState: { dirtyFields },
    getValues,
  } = useFormContext();

  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const fieldValues = getValues(fieldRoot);
    const targetIndex = fieldValues.findIndex(
      (fieldValue: any) => fieldValue.id === targetValue.id,
    );

    setIndex(targetIndex);
  }, [targetValue]);

  const name = colDef!.field;
  const isDirty = get(dirtyFields, `${fieldRoot}.${index}.${name}`);

  return <Box sx={isDirty && dirtyStyle}>{value}</Box>;
};

const dirtyStyle = {
  color: "red",
};
