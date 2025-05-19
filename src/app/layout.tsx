
import './globals.css'
export const metadata = {
  title: 'CV Builder',
  description: 'Create your professional CV easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
