import { ChangeEvent } from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTasksStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist = (props: PropsType) => {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValule: string) => {
            props.changeTaskTitle(t.id, newValule, props.id);
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
        <div>
          <Button
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={onAllClickHandler}
          >
            All
          </Button>
          <Button
            color={"primary"}
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={onActiveClickHandler}
          >
            Active
          </Button>
          <Button
            color={"secondary"}
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={onCompletedClickHandler}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};
