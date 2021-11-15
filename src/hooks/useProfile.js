import { useSelector } from "react-redux";

export default function useProfile() {
  const profile = useSelector((state) => state.profile.profile);
  return profile;
}
