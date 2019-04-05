import * as React from "react";
import { connect } from "react-redux";
import { Mode, State } from "../store/reducer";
import styled from "styled-components";
import { AnchorHTMLAttributes, MouseEvent } from "react";
import { updateMode } from "../store/actions";

interface SwitcherProps extends AnchorHTMLAttributes<undefined> {
  target?: Mode;
  isCurrent: boolean;
}

const mapStateToProps = (state: State, props): Partial<SwitcherProps> => ({
  isCurrent: state.mode === props.target
});

const mapDispatchToProps = (dispatch, props): Partial<SwitcherProps> => ({
  onClick: (e: MouseEvent) => {
    e.preventDefault();
    dispatch(updateMode(props.target));
  }
});

const StyledSwitcher = styled.a<SwitcherProps>`
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: inline-block;
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: ${p => (p.isCurrent ? p.theme.lightBg : "rgba(0, 0, 0, 0.1)")};
  color: ${p => (p.isCurrent ? p.theme.dark : p.theme.light)};
  cursor: ${p => (p.isCurrent ? "default" : "pointer")};
  margin: 8px 0 16px;
  text-decoration: ${p => (p.isCurrent ? "none" : "underline")};
  text-align: center;

  &:first-of-type {
    border-radius: 6px 0 0 6px;
  }

  &:last-of-type {
    border-radius: 0 6px 6px 0;
  }
`;

export const Switcher = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledSwitcher);
