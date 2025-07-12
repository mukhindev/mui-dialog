import { FormEvent } from "react";

export type AsyncSubmitCallback = (evt: FormEvent) => void | Promise<void>;
