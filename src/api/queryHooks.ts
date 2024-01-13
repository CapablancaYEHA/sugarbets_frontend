import { useMutation, useQuery } from "@tanstack/react-query";

import {
  closeEvent,
  createBet,
  getBet,
  getEvent,
  getEvents,
  getPlayers,
  getProfile,
  getUserBets,
  initPayment,
  login,
  registerUser,
} from "../lib/client";
import {
  IBetRes,
  ICloseEventReq,
  ICreateBetReq,
  IEventsResponse,
  IPlayersResponse,
  IProfile,
  IUserLoginRequest,
  IUserRegisterRequest,
} from "./interface";
import { AxiosError } from "axios";
import { queryClient } from "./instance";

export function useRegister() {
  return useMutation<string, { message?: string }, IUserRegisterRequest>({
    mutationFn: ({ name, mail, pass }) => registerUser({ name, mail, pass }),
    mutationKey: ["register"],
    retry: 1,
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

export function useCreateBet() {
  return useMutation<string, { message?: string }, ICreateBetReq>({
    mutationFn: ({ betBody, game, userId, eventId }) =>
      createBet({ betBody, game, userId, eventId }),
    mutationKey: ["bets", "create"],
    retry: 1,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useEvents() {
  return useQuery<IEventsResponse[], AxiosError<{ message?: string }>>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
}

export function useSingleEvent(id: string, isFlag = true) {
  return useQuery<IEventsResponse, AxiosError<{ message?: string }>>({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: isFlag,
  });
}

export function usePlayers(game, locale) {
  return useQuery<IPlayersResponse[], AxiosError<{ message?: string }>>({
    queryKey: ["players", game, locale],
    queryFn: () => getPlayers(game, locale),
  });
}

export function useUserBets(user, isFlag = false) {
  return useQuery<IBetRes[], AxiosError<{ message?: string }>>({
    queryKey: ["bets", user],
    queryFn: () => getUserBets(user),
    enabled: isFlag,
  });
}

export function useSingleBet(id, isFlag = false) {
  return useQuery<IBetRes, AxiosError<{ message?: string }>>({
    queryKey: ["bets", id],
    queryFn: () => getBet(id),
    enabled: isFlag,
  });
}

export function useProfile(id: string, isFlag: boolean) {
  return useQuery<IProfile, AxiosError<{ message?: string }>>({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    enabled: isFlag,
  });
}

export function useCloseEvent() {
  return useMutation<string, { message?: string }, ICloseEventReq>({
    mutationFn: ({ betBody, game, eventId }) =>
      closeEvent({ betBody, game, eventId }),
    mutationKey: ["events", "close"],
    retry: 1,
  });
}

export function useInitPayment() {
  return useMutation<any, { message?: string }, string>({
    mutationFn: (id) => initPayment(id),
    mutationKey: ["yoomoney"],
    retry: 1,
  });
}
