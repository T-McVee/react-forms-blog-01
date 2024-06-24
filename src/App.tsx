import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { ProjectEditor } from "./ProjectEditor";
import { mockData } from "./mocks";
import { DevTool } from "@hookform/devtools";
import { Project, projectSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const form = useForm<Project>({
    resolver: yupResolver(projectSchema),
    defaultValues: mockData,
  });

  return (
    <Stack
      sx={{
        width: "100vw",
        justifyContent: "flex-start",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ag Grid + React Hook Form</Typography>
        </Toolbar>
      </AppBar>
      <FormProvider {...form}>
        <ProjectEditor />
      </FormProvider>
      <DevTool control={form.control} />
    </Stack>
  );
}

export default App;
