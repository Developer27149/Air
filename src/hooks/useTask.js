import { useEffect, useState } from "react";

export default function useTask(tasks = []) {
  const [initTask, setInitTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  useEffect(() => {
    setInitTask(tasks.filter((task) => task.status === "init"));
    setInProgressTask(tasks.filter((task) => task.status === "doing"));
    setFinishTask(tasks.filter((task) => task.status === "finish"));
  }, [tasks]);
  return [{ initTask, inProgressTask, finishTask }];
}
