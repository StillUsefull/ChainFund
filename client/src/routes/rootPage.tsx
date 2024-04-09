import { Footer } from '@components/footer'
import { Header } from '@components/header'
import 'bootstrap/dist/css/bootstrap.min.css'


export function RootPage(){
  return (
    <>
      <Header />
      <h1>Root page</h1>
      <Footer />
    </>
  )
}