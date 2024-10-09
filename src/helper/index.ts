"use client"
import { Schema, JSONSchemaType } from "ajv";
import CryptoJsHelper from "./crypto-js-helper";
import { useEffect, useReducer, useRef } from "react";

const cryptoJsHelper = new CryptoJsHelper();

export interface MinimizedStatePersistentConfig<T> {
  persistentName: string;
  schema: Schema | JSONSchemaType<T>;
}

export const useMinimizedState = <T extends object>(
  initialState: T,
  persistentConfig?: MinimizedStatePersistentConfig<T>,
) => {
  const getSafeInitState = (config: MinimizedStatePersistentConfig<T>): T => {
    try {
      const ls = localStorage.getItem(config.persistentName);

      if (ls && cryptoJsHelper.decrypt(ls)) {
        const decrypLs = cryptoJsHelper.decrypt(ls);

        if (isJsonString(decrypLs)) return JSON.parse(decrypLs);
        else return initialState;
      } else return initialState;
    } catch (err) {
      return initialState;
    }
  };

  return useReducer(
    (s: T, ns: Partial<T>) => {
      const result = { ...s, ...ns };

      if (persistentConfig)
        localStorage.setItem(
          persistentConfig.persistentName,
          cryptoJsHelper.encrypt(JSON.stringify(result)),
        );

      return result;
    },
    persistentConfig ? getSafeInitState(persistentConfig) : initialState,
  );
};

export const isJsonString = (jsonString: string) => {
  try {
    JSON.parse(jsonString);

    return true;
  } catch (err) {
    return false;
  }
};

export const debounce = <T extends (...args: any) => any>(
  func: T,
  wait?: number,
) => {
  let timeout: NodeJS.Timeout | number | undefined;

  return (...args: any) => {
    const later = () => {
      timeout = undefined;

      func(...args);
    };

    clearTimeout(timeout as number | undefined);

    timeout = setTimeout(later, wait);
  };
};

export const useDebounce = <T extends Array<any>>(
  func: (...args: [...T]) => void,
  args: T,
  wait?: number,
  funcBeforeDebounce?: () => void,
) => {
  const debounceProcess = useRef(debounce(func, wait));

  const listener = () => {
    funcBeforeDebounce?.();
    debounceProcess.current(...args);
  };

  useEffect(listener, [...args]);
};