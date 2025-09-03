import { useEffect, useState } from "react";
import { Dialog, DialogProps, useDialog } from "@mukhindev/mui-dialog";
import { LinearProgress } from "@mui/material";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function TestAsyncDataDialog(props: DialogProps) {
  const { ...dialogProps } = props;

  return (
    <Dialog {...dialogProps}>
      <TestAsyncData />
    </Dialog>
  );
}

function TestAsyncData() {
  const { close } = useDialog();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    let isActive = true;
    setInProgress(true);

    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then(setTodo)
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }
      })
      .finally(() => {
        if (isActive) {
          setInProgress(false);
        }
      });

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [setInProgress, close]);

  return (
    <>
      {inProgress && (
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
        />
      )}
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </>
  );
}
