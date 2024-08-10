import SectionHeader from './components/SectionHeader'

export default function About() {
    return (
        <section className='bg-base-300' id='about'>
            <div className='max-w-[80%] mx-auto py-12'>
                <SectionHeader>What is Music Lovers?</SectionHeader>
                <div className='relative text-2xl'>The idea of our service is to find favourite songs of other people to widen you music collection and share your favourite songs with the world.
                    <div className='hidden sm:block top-0 -left-16 absolute -rotate-45 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-white'></div>
                    <div className='hidden sm:block bottom-0 -right-16 absolute rotate-[135deg] w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-white'></div>
                </div>
            </div>
        </section>

    )
}
