import { ReactNode } from "react";

type ISquareProps = {
  children?: unknown & ReactNode;
  isSelected?: boolean;
  updateBoard?: (index: number) => void;
  index?: number
}

const Square = ({children, isSelected = false, updateBoard,index}:ISquareProps): JSX.Element => {
  const handleClick = () => {
    if (updateBoard && index != undefined) updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={`square ${isSelected ? 'is-selected': ''}`}>
      {children}
    </div>
  )
}
export default Square