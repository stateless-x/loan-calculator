import Image from 'next/image'
import styles from './page.module.css'
import Mortgage from '@/components/mortgage/page'
export default function Home() {
  return (
    <main className={styles.main}>
      <Mortgage />
    </main>
  )
}
