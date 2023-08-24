import styles from '../styles/page.module.sass'
import Mortgage from '@/components/mortgage/page'
export default function Home() {
  return (
    <main className={styles.main}>
      <Mortgage />
    </main>
  )
}
