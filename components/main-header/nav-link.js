"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import classes from "./nav-link.module.css"
import classNames from "classnames"

export default function NavLink({ href, children }) {
  const path = usePathname()

  const isActive = path.startsWith(href)

  const cls = classNames(classes.link, { [classes.active]: isActive })

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
