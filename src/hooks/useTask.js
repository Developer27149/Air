import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useTask(tasks = []) {
  const keyword = useSelector((state) => state.searchTask.keyword);
  const [initTask, setInitTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  useEffect(() => {
    const _tasks = tasks.filter((task) => {
      if (keyword.length === 0) {
        return true;
      } else {
        return task.content.title.includes(keyword) || task.content.text.includes(keyword);
      }
    });
    setInitTask(_tasks.filter((task) => task.status === "init"));
    setInProgressTask(_tasks.filter((task) => task.status === "doing"));
    setFinishTask(_tasks.filter((task) => task.status === "finish"));
  }, [tasks, keyword]);
  return [{ initTask, inProgressTask, finishTask }];
}
