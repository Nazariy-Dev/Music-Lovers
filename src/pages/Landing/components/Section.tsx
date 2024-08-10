import Container from '../../../components/Container'

export default function Section(props: any) {
    const { children, extraClass } = props
    return (
        <Container extraClass={extraClass}>
            <section {...props} className={'py-12 w-[80%] mx-auto'}>
                {children}
            </section>
        </Container>
    )
}
