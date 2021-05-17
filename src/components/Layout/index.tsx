import Alert from '../alert'
import Footer from '../footer'
import Meta from '../meta'
import React from "react";
import styles from './styles.module.css'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/*<Alert preview={preview} />*/}
        <div className={styles.container}>
          <main id="skip">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
