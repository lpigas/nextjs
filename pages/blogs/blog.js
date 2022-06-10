import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import Button from '../../components/atoms/Buttons/MyButton/MyButton'
import axios from 'axios'
import { BASE_URL } from '../../components/constants/consturl'
import { urlmaker } from '../../components/functions/urlmaker'




export default function blog(props) {
    const router = useRouter()
    const limit = ['10', '20', '50', '100']
    const [numPage, setNumPage] = useState(+router.query._page)
    const [numLimit,setNumLimit] = useState(+router.query._limit)
    const [indexLimit, setIndexLimit] = useState(0)
    const totalBlogs = props.posts.length
    const totalPages = totalBlogs / numLimit
    const [fullQuery, setFullQuery] = useState(`?_limit=${router.query._limit}&_page=${+router.query._page}`)
    useEffect(()=>{
        router.push(`?_limit=${10}&_page=${1}`)
    },[])
    useEffect(()=>{
        
        setNumPage(router.query._page)
        setNumLimit(router.query._limit)
        setFullQuery(`?_limit=${router.query._limit}&_page=${+router.query._page}`)
    },[router])
    useEffect(()=>{
        numPage > totalPages && router.push(`?_limit=${router.query._limit}&_page=${totalPages}`)
    },[numPage,numLimit])

    const addPage = ()=>{
        numPage < totalPages && router.push(`?_limit=${router.query._limit}&_page=${+router.query._page+1}`)
    }
    const minusPage = ()=>{
        numPage > 1 &&
            router.push(`?_limit=${router.query._limit}&_page=${+router.query._page-1}`)
    }
    const addlimit =()=>{
       if( indexLimit < limit.length-1){
           router.push(`?_limit=${limit[indexLimit+1]}&_page=${router.query._page}`)
           setIndexLimit(indexLimit + 1)
       }
    }
    const minusLimit = () =>{
        if(indexLimit > 0){
            router.push(`?_limit=${limit[indexLimit-1]}&_page=${router.query._page}`)
            setIndexLimit(indexLimit - 1)
        }
    }
        a(fullQuery)
        console.log(props.posts.length)
      return (
    <Layout>
        <div className='flex flex-col w-full'>
            <div className='flex justify-center w-full bg-orange-700'>
                 page num = {numPage} from {totalPages}
                </div>
                <div className='flex justify-center w-full '>
            <Button onClick={minusPage }> page - 1</Button>
            <Button onClick={addPage }> page + 1</Button>
            </div>
            <div className='flex justify-center w-full bg-orange-700'>
                 limit = {numLimit}
                </div>
                <div className='flex justify-center w-full '>
            <Button onClick={minusLimit }> Limit - </Button>
            <Button onClick={addlimit }> Limit +</Button>
            </div>
        </div>


</Layout>
  )
}


export async function getServerSideProps() {
    try {
      const datas = await axios.get(BASE_URL);
      const posts = datas.data;
      return {
        props: {
          posts,
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }
