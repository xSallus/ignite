import { ReactNode } from "react";

interface IFood {
  id?: number;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  image: string;
}

interface IFoodProps {
  food: IFood;
  handleEditFood: (food: IFood)=>void;
  handleDelete: (id:number)=>void;
}

interface IFoodContainerProps {
  available: boolean;
  children: ReactNode;
}

interface IHeaderProps {
  openModal: ()=>void;
}

interface InputContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  placeholder: string;
  name: string;
  icon?: any;
}

export type IModalProps = {
  isOpen: boolean;
  setIsOpen: ()=>void;
  children?: ReactNode;
}

export { IFood, IFoodProps, IFoodContainerProps, IHeaderProps, InputContainerProps };