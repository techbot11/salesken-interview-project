import { useEffect } from "react";
import { FetchSpaceLaunches } from "../service/SpacexService";
import { useDispatch } from "react-redux";
import { storeSpaceLaunches } from "../store/slices/SpaceSlice";
import { useAppSelector } from "../store";

let isComponentLoaded = false;

export default function useFilterLaunches({ filters }: any) {
  const dispatch = useDispatch();
  const launches = useAppSelector((state) => state.space.spaceLaunches);

  useEffect(() => {
    debugger;
    if (!!Object.keys(filters).length) {
      fetchLaunches(filters);
    }
  }, [filters]);

  const fetchLaunches = (filters: any = {}) => {
    Object.keys(filters).map((key: any) => {
      if (!filters[key]) {
        delete filters[key];
      }
      return 0;
    });
    FetchSpaceLaunches(filters)
      .then((resp) => {
        dispatch(storeSpaceLaunches(resp.data));
        isComponentLoaded = true;
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return { launches };
}
