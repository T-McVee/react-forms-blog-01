import { Button, Paper, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextFieldControlled } from "./components/TextFieldControlled";
import { SelectControlled } from "./components/SelectControlled";
import { projectStatuses } from "./mocks";
import { DeliverablesGrid } from "./components/DeliverablesGrid";

export interface IStatus {
  id: string;
  title: string;
}

export const ProjectEditor = () => {
  const { getValues, control, handleSubmit } = useFormContext();

  const title = getValues("title");

  function logData(formData: any) {
    console.log("form data:", formData);
    console.log("form state", control._formState);
  }

  return (
    <Stack sx={{ p: 2 }}>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(logData)}>
          <Stack gap={2} p={4} sx={{ background: "#f2f2f2", borderRadius: 2 }}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h4">{title}</Typography>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>

            <TextFieldControlled
              // control={control}
              name="description"
              label="Description"
            />
            <SelectControlled
              control={control}
              name="status"
              label="status"
              options={projectStatuses}
            />
            <DeliverablesGrid />
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};
