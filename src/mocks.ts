import { Project, IStatus } from "./types";

export const mockData: Project = {
  id: 1,
  title: "Acme Co",
  description: "This is the project description",
  status: "1",
  deliverables: [
    {
      id: "1",
      title: "Deliverable 1",
      description: "This is deliverable 1",
      status: "1",
    },
    {
      id: "2",
      title: "Deliverable 2",
      description: "This is deliverable 2",
      status: "2",
    },
    {
      id: "3",
      title: "Deliverable 3",
      description: "This is deliverable 3",
      status: "3",
    },
  ],
};

export const projectStatuses: IStatus[] = [
  { id: "1", title: "In Progress" },
  { id: "2", title: "Completed" },
  { id: "3", title: "Cancelled" },
];
