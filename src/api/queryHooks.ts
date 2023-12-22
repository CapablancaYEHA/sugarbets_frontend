import { useMutation, useQuery } from "@tanstack/react-query";

import { getBets, login, registerUser } from "../lib/client";
import { IUserLoginRequest, IUserRegisterRequest } from "./interface";
import { useAuth } from "../../utils/auth-manager";
import { AxiosError } from "axios";

export function useRegister() {
  return useMutation<string, { message?: string }, IUserRegisterRequest>({
    mutationFn: ({ name, mail, pass }) => registerUser({ name, mail, pass }),
    mutationKey: ["register"],
  });
}

export function useLogin() {
  return useMutation<string, { message?: string }, IUserLoginRequest>({
    mutationFn: ({ mail, pass }) => login({ mail, pass }),
    mutationKey: ["login"],
  });
}

export function useBets() {
  return useQuery<any, AxiosError>({ queryKey: ["bets"], queryFn: getBets });
}
