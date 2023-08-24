import '../styles/globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'

const notoSansThai = Noto_Sans_Thai ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'คำนวนเงินกู้บ้าน คอนโด อสังหาฯ ฟรี โดย Purin Buriwong',
  description: 'โปรแกรมคำนวณดอกเบี้ยบ้าน สินเชื่อบ้าน ดอกเบี้ยเงินกู้บ้านแต่ละงวด คำนวณงวดผ่อนชำระ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSansThai.className}>{children}</body>
    </html>
  )
}
