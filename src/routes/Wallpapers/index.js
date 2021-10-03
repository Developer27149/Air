import { Box } from "@chakra-ui/layout";
import axios from "axios";
import Loading from "Components/Loading.js";
import React, { lazy, Suspense, useEffect, useState } from "react";

const Container = lazy(() => import("../../components/WallpaperContainer.js"));
export default function Wallpapers() {
  return (
    <Suspense fallback={<Loading />}>
      <Container />
    </Suspense>
  );
}