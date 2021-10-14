import Loading from "Components/Loading.js";
import React, { lazy, Suspense } from "react";

const Container = lazy(() => import("Components/wallpaper/WallpaperContainer.js"));
export default function Wallpapers() {
  return (
    <Suspense fallback={<Loading />}>
      <Container />
    </Suspense>
  );
}
