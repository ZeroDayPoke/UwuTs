// ./src/types/defaultTypes.tsx

export interface NavBarItem {
  name: string;
  path: string;
  requiresLogin: boolean;
  adminOnly: boolean;
  hideWhenLoggedIn: boolean;
}

export interface NavBarProps {
  items: NavBarItem[];
}
