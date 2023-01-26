import { Container } from "react-bootstrap"
import { useSpring, animated, useScroll } from '@react-spring/web'

const Main = () => {

    const { scrollYProgress } = useScroll()

    const [springs, api] = useSpring(() => ({
        from: { opacity: 0 },
      }))

      const handleClick = () => {
        api.start({
          from: {
            opacity: 0,
          },
          to: {
            opacity: 100,
          },
        })
      }
    


    return (
       

        <Container style={{height : "500vh"}} fluid>
            <animated.div
        style={{
            position : "fixed",
        opacity: 1,
          height: scrollYProgress.to(val => val * 100 + "vh"),
          background: '#ff6d6d',
          borderRadius: 8,
        }}
      > Coucou</animated.div>
        </Container>
    )
}

export default Main