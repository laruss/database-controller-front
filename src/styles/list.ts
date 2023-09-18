import {css} from "@emotion/react";

export const newItemStyle = css`
  &.Mui-selected {
    background-color: #88b8c4;
  }

  &.MuiListItemButton-root {
    background-color: #dfe9eb;
    justify-content: center;
  }

  &.Mui-focusVisible {
    background-color: #b1d9e3;
  }

  :hover {
    background-color: #b1d9e3;
  }
`;

export const containerStyle = css`
    &.MuiBox-root {
      overflow: auto;
      width: var(--items-list-width);
      height: calc(100vh - var(--header-height));
      background-color: #ebebeb;
    }
`;