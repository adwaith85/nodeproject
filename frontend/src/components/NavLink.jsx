import { useLocation } from "react-router-dom";

function NavLink({ children, showOn = [] }) {
  const location = useLocation();

  // If current pathname is NOT in the showOn list, hide the content
  if (!showOn.includes(location.pathname)) {
    return null;
  }

  return <>{children}</>;
}

export default NavLink;