import { useGameStore } from "@/entities/game";
import { useModalStore } from "@/shared/model";
import { useState } from "react";

export function useCatModal() {
  const { setModalState, inputValue, setInputValue, resetModalStore } =
    useModalStore();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { players } = useGameStore();

  function showCatModal() {
    resetModalStore();
    setModalState("cat_in_bag");
  }

  function closeCatModal() {
    resetModalStore();
  }

  function setAndValidateInputValue(value: string) {
    setInputValue(value);

    if (
      players.find(
        (player) => player.name.toLowerCase() === value.toLowerCase(),
      )
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }

  return {
    showCatModal,
    closeCatModal,
    inputValue,
    setAndValidateInputValue,
    isBtnDisabled,
  };
}
