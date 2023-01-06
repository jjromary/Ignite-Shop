import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"


import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../lib/stripe"

interface HomeProducts {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProducts) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}


    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(products => {
    const price = products.default_price as Stripe.Price

    return {
      id: products.id,
      name: products.name,
      imageUrl: products.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}