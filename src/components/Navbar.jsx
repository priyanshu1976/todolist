import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <ul className="flex bg-green-500 justify-end">
        <li className="pr-4">
          <Link to="/product">product</Link>
        </li>
        <li className="pr-4">
          <Link to="/login">login</Link>
        </li>
        <li className="pr-4">
          <Link to="/">homepage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
