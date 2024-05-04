import { useReducer } from "react";

type LoadingAction = {
  type: 'SET_LOADING';
  payload: boolean;
};

const initialState = true;

export default function useLoading(): [boolean, React.Dispatch<LoadingAction>] {
  const [loading, setLoading] = useReducer((state: boolean, action: LoadingAction) => {
    switch (action.type) {
      case 'SET_LOADING':
        return action.payload;
      default:
        return state;
    }
  }, initialState);

  return [loading, setLoading];
}
