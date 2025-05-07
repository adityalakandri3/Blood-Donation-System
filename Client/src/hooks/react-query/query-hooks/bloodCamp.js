import {  useQuery } from "@tanstack/react-query";
import { BLOOD_CAMP } from "../query-keys/QueryKeys";
import { getAllCamps } from "../../../Api/functions/bloodCamp";

export const useGetAllBloodCampQuery = () => {
  return useQuery({
    queryKey: [BLOOD_CAMP],
    queryFn: getAllCamps,
  });
};