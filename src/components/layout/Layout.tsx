import { ReactNode } from 'react'
import NavBar from './NavBar'
import FooterComp from './FooterComp'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
      <FooterComp />
    </>
  )
}
