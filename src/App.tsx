import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './components/layout/PageTransition'
import SkeletonLoader from './components/ui/SkeletonLoader'

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))

const Training = lazy(() => import('./pages/Training'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const ClientArea = lazy(() => import('./pages/ClientArea'))

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<SkeletonLoader variant="page" />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />

              <Route path="/training" element={<PageTransition><Training /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

              <Route path="/client-area" element={<PageTransition><ClientArea /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
