import { useEffect, useState } from "react";
import { Dialog, DialogActions, useDialog } from "../lib";
import { Button } from "@mui/material";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function DialogWithAsyncData() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog with async data
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <AsyncData />
      </Dialog>
    </>
  );
}

function AsyncData() {
  const { setInProgress, disabled, close, cancel } = useDialog();

  const [todo, setTodo] = useState<Todo | null>(null);

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
      <pre>{JSON.stringify(todo, null, 2)}</pre>
      <DialogActions>
        <Button
          variant="contained"
          color="inherit"
          disabled={disabled}
          onClick={cancel}
        >
          Отмена
        </Button>
        <Button variant="contained" color="primary" disabled={disabled}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}
