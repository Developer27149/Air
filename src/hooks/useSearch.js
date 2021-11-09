import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "Store/homeSlice.js";
import { getFuckSiteKeyword } from "Utils/index.js";

export default function useSearch() {
  const search = useSelector((state) => state.home.search);
  const [keyword, setKeyword] = useState("");
  const [engine, setEngine] = useState(search.engine);
  const [searchParams, setSearchParams] = useState(getFuckSiteKeyword(search.engine) ?? "q");
  const dispatch = useDispatch();
  const mapList = [
    {
      key: "bi",
      engine: "bing.com",
    },
    {
      key: "zh",
      engine: "zhihu.com",
    },
    {
      key: "dev",
      engine: "dev.to",
    },
    {
      key: "gh",
      engine: "github.com",
    },
    {
      key: "jj",
      engine: "juejin.cn",
    },
    {
      key: "gg",
      engine: "google.com",
    },
    {
      key: "yt",
      engine: "youtube.com",
    },
    {
      key: "bl",
      engine: "bilibili.com",
    },
    {
      key: "bd",
      engine: "baidu.com",
    },
  ];

  useEffect(() => {
    mapList.some((item) => {
      if (keyword.startsWith(item.key) && engine !== item.engine) {
        if (item.key === "bl") {
          setSearchParams("keyword");
        } else {
          setSearchParams("q");
        }
        // dispatch data to store and save to storage
        setEngine(item.engine);
        dispatch(
          setSearch({
            engine: item.engine,
          })
        );
        // reset engine and modify search keyword
        setKeyword(keyword.replace(item.key, ""));
        return true;
      }
      return false;
    });
  }, [keyword]);

  return { keyword, setKeyword, engine, clearKeyword: () => setKeyword(""), searchParams };
}
