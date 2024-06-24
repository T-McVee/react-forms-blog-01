import { CustomCellEditorProps } from "ag-grid-react";
import { Controller, set, useFormContext } from "react-hook-form";
import { SelectControlled } from "./SelectControlled";
import { Box, MenuItem, Select } from "@mui/material";
import { get } from "lodash";
import { ComponentType, useEffect, useMemo, useState } from "react";
import { useFieldState } from "../hooks/useFieldState";
import { Deliverable } from "../types";

interface IProps extends CustomCellEditorProps {
  fieldRoot: string;
  options: any[];
  FieldControl: ComponentType<any>;
  fieldOptions?: any;
  // children?: React.ReactNode;
  // transform?: (value: any) => any;
}

export const GenericCellEditor = (props: IProps) => {
  const {
    fieldRoot,
    options,
    data: targetValue,
    column,
    FieldControl,
    fieldOptions,
    onValueChange,
  } = props;
  const {
    control,
    formState: { dirtyFields },
    getValues,
  } = useFormContext();

  const fieldValues = getValues(fieldRoot);
  const index = useMemo(() => {
    const index = fieldValues.findIndex(
      (value: any) => value.id === targetValue.id,
    );

    return index;
  }, [fieldValues, targetValue.id]);

  const name = column.getColId();
  const pathToField = `${fieldRoot}.${index}.${name}`;

  const isDirty = get(dirtyFields, pathToField);

  function handleChange(e: any, formOnChangeHandler: any) {
    const newValue = e.target.value;

    // Updates form value - allows form to update field value and state
    formOnChangeHandler(newValue);

    // Updates AgGrid cell value - allows renderer to show new value
    onValueChange && onValueChange(newValue);
  }

  return (
    <Box>
      <Controller
        name={pathToField}
        control={control}
        render={({ field }) => (
          <FieldControl
            {...field}
            onChange={(e: any) => {
              handleChange(e, field.onChange);
            }}
            variant="outlined"
            sx={isDirty && dirtyStyle}
            size="small"
            fullWidth
            {...fieldOptions}
            children={options}
          />
        )}
      />
    </Box>
  );
};

const dirtyStyle = {
  div: {
    color: "red",
  },
};
