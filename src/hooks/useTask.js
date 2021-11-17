import { useSelector } from "react-redux";

export default function useTask() {
  const tasks = useSelector((state) => state.works.tasks);
}
