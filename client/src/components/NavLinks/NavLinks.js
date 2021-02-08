
import React from "react";
import {Link} from "@material-ui/core";

const NavLinks = () => {
  return (
    <>
      <Link className="nav-link" href="/">
        Home
      </Link>
      <Link className="nav-link" href="/register">
        Sign Up
      </Link>
      <Link className="nav-link" href="/login">
        Sign In
      </Link>
      <Link className="nav-link" href="/privacy">
        Privacy
      </Link>
      <Link className="nav-link" href="https://github.com">
        Github Repo
      </Link>
    </>
  )
}

export default NavLinks;