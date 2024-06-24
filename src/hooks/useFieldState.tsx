import React from "react";
import { get, isArray } from "lodash";
import { useFormContext } from "react-hook-form";

export const useFieldState = (pathToField: string, value: any) => {
  const { formState } = useFormContext();

  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    const dirtyFields = get(formState.dirtyFields, pathToField);

    if (dirtyFields && !isArray(dirtyFields)) {
      setIsDirty(true);
    } else if (dirtyFields && isArray(dirtyFields)) {
      // check if array contains a truthy value
      const hasDirtyField = dirtyFields.some((field: any) => {
        if (typeof field !== "object") return field;
        return Object.values(field).some((value) => value);
      });

      hasDirtyField && setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [formState.dirtyFields, value]);

  return { isDirty };
};
