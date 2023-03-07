import { authForm } from "./authForm";

export interface formProps {
  handleClick: (data: authForm) => void;
  loading: boolean;
}
