import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Deliverable, Project } from "../types";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { SelectCellEditor } from "./SelectCellEditor";
import { CustomCellRenderer } from "./CustomCellRenderer";
import { v4 as uuid } from "uuid";
import { TextfieldCellEditor } from "./TextfieldCellEditor";

export const DeliverablesGrid = () => {
  const {
    control,
    formState: { dirtyFields },
  } = useFormContext<Project>();
  const { fields, append, update, remove } = useFieldArray<Project>({
    control,
    name: "deliverables",
    keyName: "key" as any, // hook form has the field typed to "id" but this overrides the existing id.
  });

  const rowData: Deliverable[] = fields as Deliverable[];

  const [gridApi, setGridApi] = useState<GridApi<Deliverable> | null>(null);
  // const [rowData, setRowData] = useState(fields as Deliverable[]);
  const [selectedDeliverable, setSelectedDeliverable] =
    useState<Deliverable | null>(null);

  const defaultColDef = useMemo(() => {
    return { editable: true, width: 200 };
  }, []);

  const columnDefs: any[] = useMemo(() => {
    return [
      {
        headerName: "Deliverable",
        field: "title",
        cellRenderer: CustomCellRenderer,
        cellRendererParams: {
          fieldRoot: "deliverables",
        },
        cellEditor: TextfieldCellEditor,
        cellEditorParams: {
          fieldRoot: "deliverables",
        },
      },
      {
        field: "description",
        cellRenderer: CustomCellRenderer,
        cellRendererParams: {
          fieldRoot: "deliverables",
        },
        cellEditor: TextfieldCellEditor,
        cellEditorParams: {
          fieldRoot: "deliverables",
        },
      },
      {
        field: "status",
        cellRenderer: CustomCellRenderer,
        cellRendererParams: {
          fieldRoot: "deliverables",
        },
        cellEditor: SelectCellEditor,
        cellEditorParams: {
          fieldRoot: "deliverables",
          options: ["1", "2", "3"],
        },
      },
    ];
  }, [fields]);

  function onGridReady(params: GridReadyEvent) {
    setGridApi(params.api);
  }

  function onSelectionChanged() {
    const [selectedRow] = gridApi!.getSelectedRows();
    setSelectedDeliverable(selectedRow);
  }

  function onCellValueChanged(params: any) {
    const modifiedDeliverableId = params.data.id;
    const modifiedDeliverableIndex = fields.findIndex(
      (deliverable) => deliverable.id === modifiedDeliverableId,
    );

    // remove key prop from data
    const { key, ...rest } = params.data;

    // update the form object with the modified deliverable
    update(modifiedDeliverableIndex, rest);
  }

  function addDeliverable() {
    const newDeliverable = {
      id: uuid(),
      title: "New deliverable",
      description: "",
      status: "",
    };

    // Add the new deliverable to the form object
    append(newDeliverable);
  }

  function removeDeliverable() {
    const index = fields.findIndex(
      (deliverable) => deliverable.id === selectedDeliverable?.id,
    );

    if (index === -1) return;

    // Remove the selected deliverable from the form object
    remove(index);
  }

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <div className="ag-theme-quartz" style={{ height: 177, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          // onCellValueChanged={onCellValueChanged}
          reactiveCustomComponents={true}
        />
      </div>
      <Stack sx={buttonWrapperStyle}>
        <Button
          variant="contained"
          onClick={addDeliverable}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={removeDeliverable}
          startIcon={<RemoveIcon />}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
};

const buttonWrapperStyle = {
  width: 600,
  flexDirection: "row",
  gap: 2,
  paddingTop: 1,
  justifyContent: "flex-end",
};

// useEffect(() => {
//   // Update the grid data when the form data changes
//   setRowData(fields as Deliverable[]);
// }, [fields]);
