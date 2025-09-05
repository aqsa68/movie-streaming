"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

 
const useCurrentUser = () => {
  // @ts-ignore
  const { data, error, isLoading, mutate } = useSWR("/api/current");

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
