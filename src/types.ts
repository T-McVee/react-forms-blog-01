import * as yup from "yup";

export type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  deliverables?: Deliverable[];
};

export type Deliverable = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export interface IStatus {
  id: string;
  title: string;
}

interface BaseOption {
  id: string | number;
  title: string;
}

export type IOptionType<T = unknown> = T & BaseOption;

export const deliverablesSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
});

export const projectSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  deliverables: yup.array().of(deliverablesSchema),
});
