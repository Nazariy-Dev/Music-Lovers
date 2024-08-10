import { PropsWithChildren } from 'react'

export default function SectionHeader({children}: PropsWithChildren) {
    return (
        <h1 className="mb-10 font-bold text-4xl text-center">{children}</h1>

    )
}
