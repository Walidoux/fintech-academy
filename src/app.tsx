import { MetaProvider, Title } from '@solidjs/meta'
import { FileRoutes } from '@solidjs/start/router'
import { type ParentComponent, Suspense } from 'solid-js'
import './styles.css'
import { Navbar } from './components/navbar'

const Layout: ParentComponent = (props) => {
  return (
    <>
      <Navbar />
      <Suspense>{props.children}</Suspense>
    </>
  )
}

export default function App() {
  return (
    <MetaProvider>
      <Title>Finance Career</Title>
      <Layout>
        <FileRoutes />
      </Layout>
    </MetaProvider>
  )
}
