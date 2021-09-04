import { useSelector } from "react-redux";

export default function UseWallpaper() {
  const wallpaperConfig = useSelector((state) => state.home.wallpaper);
  const newImg = useSelector(state => state.home.newImg);
  
}
