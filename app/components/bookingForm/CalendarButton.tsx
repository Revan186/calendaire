import { Button } from "@/components/ui/button";

import { useRef } from "react";
import { useFocusRing, mergeProps, useButton, AriaButtonProps } from 'react-aria'

import { CalendarState } from 'react-stately'

export function CalendarButton(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      disabled={props.isDisabled}
      variant="outline"
      size="icon"
    >
      {props.children}
    </Button>
  );
}