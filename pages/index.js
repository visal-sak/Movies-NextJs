import Image from 'next/image'
import Layout from '../component/layout'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { BASE_PATH,BASE_URL,API_KEY } from '@/libs/constant'

const inter = Inter({ subsets: ['latin'] })

export default function Home({movies}) {
  return (
    <Layout>
      <div className='container'>
            <div className="row g-3">
                {
                  movies.results.map(movie => (
                      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
                        <Link href={{
                          pathname:  `/movies/${movie.id}`,
                          query: {
                            movie: JSON.stringify(movie)
                          }
                        }} 
                        as={`/movies/${movie.id}`}
                        className="text-decoration-none">
                        <div className="card border-0 shadow-sm h-100">
                            <img src={BASE_PATH + movie.backdrop_path} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">{movie.title}</p>
                            </div>
                        </div>
                        </Link>
                      </div> 
                  ))
                }
            </div>
        </div>
    </Layout>
  
  )
}

export async function getServerSideProps(){
  console.log(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`)
  const res = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`)
  const resp = await res.json();
  console.log(resp)
  return{
      props:{
        movies:resp
      }
    }
}

