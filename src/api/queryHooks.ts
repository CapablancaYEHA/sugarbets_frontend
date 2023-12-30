import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createBet,
  getBets,
  getEvent,
  getEvents,
  getPlayers,
  getTickets,
  initPayment,
  login,
  registerUser,
} from "../lib/client";
import {
  ICreateBetReq,
  IEventsResponse,
  IPlayersResponse,
  IUserLoginRequest,
  IUserRegisterRequest,
} from "./interface";
import { AxiosError } from "axios";
import { queryClient } from "./instance";

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
  return useQuery<any[], AxiosError>({ queryKey: ["bets"], queryFn: getBets });
}

export function useCreateBet() {
  return useMutation<string, { message?: string }, ICreateBetReq>({
    mutationFn: ({ betBody, game, userId, eventId }) =>
      createBet({ betBody, game, userId, eventId }),
    mutationKey: ["bets", "create"],
    retry: 1,
  });
}

export function useEvents() {
  return useQuery<IEventsResponse[], AxiosError<{ message?: string }>>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
}

export function useSingleEvent(id: string) {
  return useQuery<IEventsResponse, AxiosError<{ message?: string }>>({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  });
}

export function usePlayers() {
  return useQuery<IPlayersResponse[], AxiosError>({
    queryKey: ["players"],
    queryFn: getPlayers,
  });
}

export function useUserTickets(id: string, isFlag = false) {
  return useQuery<number, AxiosError>({
    queryKey: ["tickets", id],
    queryFn: () => getTickets(id),
    enabled: isFlag,
  });
}

export function useInitPayment() {
  return useMutation<any, { message?: string }, string>({
    mutationFn: (id) => initPayment(id),
    mutationKey: ["yoomoney"],
    retry: 1,
  });
}

export const invalidateTickets = async () => {
  await queryClient.invalidateQueries({ queryKey: ["tickets"] });
};
