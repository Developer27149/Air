import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyword2SearchEngine, searchIcons, selectIcon } from "Utils/index.js";
import { setSearch } from "Store/homeSlice.js";

export default function useSearch() {
  const [keyword, setKeyword] = useState("");
  const search = useSelector((state) => state.home.search);
  const [engineIcon, setEngineIcon] = useState(selectIcon(search));
  const [engine, setEngine] = useState(search.engine);
  const dispatch = useDispatch();
  // const [searchEngine, setSearchEngine] = useState(search.engine)
  const mapList = [
    {
      key: "bi",
      icon: searchIcons.DiBingSmall,
    },
    {
      key: "zh",
      icon: searchIcons.SiZhihu,
    },
    {
      key: "dev",
      icon: searchIcons.DiCode,
    },
    {
      key: "gh",
      icon: searchIcons.VscGithubAlt,
    },
    {
      key: "jj",
      icon: searchIcons.GiGoldNuggets,
    },
    {
      key: "gg",
      icon: searchIcons.FcGoogle,
    },
  ];

  useEffect(() => {
    mapList.some((item) => {
      if (keyword.startsWith(item.key) && engineIcon !== item.icon) {
        // dispatch data to store and save to storage
        setEngine(keyword2SearchEngine(item.key));
        dispatch(
          setSearch({
            engine,
          })
        );
        // reset icon and modify search keyword
        setEngineIcon(item.icon);
        setKeyword(keyword.replace(item.key, ""));
        return true;
      }
      return false;
    });
    return () => {
      setKeyword("");
    };
  }, [keyword]);

  return { keyword, engineIcon, setKeyword, engine };
}
