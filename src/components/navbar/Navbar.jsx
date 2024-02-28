import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}
