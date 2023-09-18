import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Github Repo ve Kullanıcı Arama',
  description: 'Github Repo ve Kullanıcı Arama - GitHub arama uygulaması ile hızlı ve kolay bir şekilde kullanıcılar ve depolar arayın.',
  keywords: 'GitHub, arama, kullanıcı, depo, arama uygulaması',
  author: 'Ahmet Semih Dur',
  image: "https://ahmetsedur.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FprofilePicture.f562554e.png&w=256&q=75", // Paylaşılacak önizleme görseli (Facebook, Twitter vb. için)
  url: 'https://githubarama.vercel.app/', // Sayfanın URL'si
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
