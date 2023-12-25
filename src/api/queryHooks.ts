import { useMutation, useQuery } from "@tanstack/react-query";

import { getBets, getTickets, login, registerUser } from "../lib/client";
import { IUserLoginRequest, IUserRegisterRequest } from "./interface";
import { AxiosError } from "axios";

export function useRegister() {
  return useMutation<string, { message?: string }, IUserRegisterRequest>({
    mutationFn: ({ name, mail, pass }) => registerUser({ name, mail, pass }),
    mutationKey: ["register"],
  });
}

export function useLogin() {
  return useMutation<
    { token: string; userId: string },
    { message?: string },
    IUserLoginRequest
  >({
    mutationFn: ({ mail, pass }) => login({ mail, pass }),
    mutationKey: ["login"],
    retry: 1,
  });
}

export function useBets() {
  return useQuery<any, AxiosError>({ queryKey: ["bets"], queryFn: getBets });
}

export function useUserTickets(id: string, isFlag = false) {
  return useQuery<number, AxiosError>({
    queryKey: ["tickets", id],
    queryFn: () => getTickets(id),
    enabled: isFlag,
  });
}
