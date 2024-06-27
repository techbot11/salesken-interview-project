import { useEffect } from "react";
import { FetchSpaceLaunches } from "../service/SpacexService";
import { useDispatch, useSelector } from "react-redux";
import { storeSpaceLaunches } from "../store/slices/SpaceSlice";
import { useAppSelector } from "../store";
import { useDebounce } from "./useDebounce";

export default function useFilterLaunches({ filters }: any) {
  const dispatch = useDispatch();
  const launches = useAppSelector((state) => state.space.spaceLaunches);

  useEffect(() => {
    fetchLaunches(filters);
  }, [filters]);

  const fetchLaunches = (filters = {}) => {
    FetchSpaceLaunches(filters)
      .then((resp) => {
        dispatch(storeSpaceLaunches(resp.data));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return { launches };
}
