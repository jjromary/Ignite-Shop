import { useRouter } from "next/router"


export default function Product() {

  const { query } = useRouter()

  return (
    <h1> Hello, Romary. Page Product: {JSON.stringify(query)}</h1>
  )
}
