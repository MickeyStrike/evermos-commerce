"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { JSONSchemaType, Schema } from "ajv";
import { useMinimizedState } from "@/helper";

export const schema: Schema | JSONSchemaType<GlobalState> = {
  properties: {
    account: {
      type: "object",
      default: {},
      nullable: false,
    },
  },
};
export interface GlobalState {
  innerWidth?: number;
  innerHeight?: number;
  isModalOpen: boolean
}

export const initialGlobalState: GlobalState = {
  isModalOpen: false
};

export interface InitialContext {
  state: GlobalState;
  dispatch: Dispatch<Partial<GlobalState>>;
}

export const GlobalContext = createContext<InitialContext>({
  state: initialGlobalState,
  dispatch: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useMinimizedState<GlobalState>(initialGlobalState);

  useEffect(() => {
    dispatch({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
