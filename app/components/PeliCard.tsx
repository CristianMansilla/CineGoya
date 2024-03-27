"use client"

import { useRouter } from "next/navigation";

let url_img = "https://image.tmdb.org/t/p/w500";

const PeliCard = ({peli}:any) => {
    const router = useRouter();
    return (
        <a onClick={()=>{router.push(`/dashboard/pelicula/${peli.id}`)}}>
            <img src={url_img + peli.poster_path} alt="" />
        </a>
        // onClick={()=>{router.push(`/dashboard/pelicula/${peli.title}`)}}
    )
}

export default PeliCard;
