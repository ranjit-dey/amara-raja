import About from './components/About'
import BoardOfDirectors from './components/BoardOfDirectors'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PerformanceHighlights from './components/PerformanceHighlights'
import Timeline from './components/Timeline'
import VVIPSection from './components/VVIPSection'
import { directorsData } from './data/directorsData'
import { performanceHighlights } from './data/performanceHighlights'

const App = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Timeline />
            <VVIPSection />
            <BoardOfDirectors directors={directorsData} />
            <PerformanceHighlights performanceHighlights={performanceHighlights} />
            <Footer />
        </div>
    )
}

export default App
