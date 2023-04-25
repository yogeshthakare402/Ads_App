import React, { useEffect, useState } from 'react';
import './View.css';

function View() {
    const [search, setSearch] = useState('');
    const [ads,setAds] = useState([]);
    const [tempAd,setTempAd] = useState([]);

    useEffect(()=>{
        let url = `http://localhost:8000/api/ads/`
        fetch(url,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            }
        }).then((res)=>res.json())
        .then((result)=>{
            // console.log(result.ads)
            setTempAd(result.ads)
            setAds(result.ads)})
        .catch((err)=>console.log(err))
    },[]);

    const findAds = ()=>{
        // e.preventDefualt()
        // console.log(search)
        if(search.length>0){
            let url = `http://localhost:8000/api/ads/${search}`
            fetch(url,{
                method:"GET",
                headers:{
                    "accept":"application/json",
                    "content-type":"application/json"
                }
            }).then((res)=>res.json())
            .then((result)=>{
                // console.log(result.ads)
                setAds(result.ads)})
            .catch((err)=>console.log(err))
        }else{
            setAds(tempAd)
        }
    }

    return (
        <div id='mainContainer' className='container-fluid bg-dark' style={{ maxWidth: "650px", height: "100vh" }}>
            <nav id='navbar' className="navbar navbar-light bg-light justify-content-between">
                <div className="navbar-brand">Ads App</div>
                <form className="form-inline" onSubmit={(e)=>{
                    e.preventDefault()
                    findAds()}}>
                    <input className="form-control mr-sm-2"
                        type="search"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value) }}
                        placeholder="Search"
                        aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <div className="container-fluid" id='ads'>
                {ads && ads.map((ad,i)=>{
                    let image = ad.imageUrl.split("/");
                    // console.log(image[5])
                    let imageOne = `https://drive.google.com/uc?export=view&id=${image[5]}`;
                    let imageTwoUrl = image[3].split("&")[0];
                    let imgurl = "";
                    if(imageTwoUrl.length>4){
                        imgurl = imageTwoUrl.slice(5);
                        // console.log(imgurl)
                    } 
                    let imageTwo = `https://drive.google.com/uc?export=view&${imgurl}`;

                    return <div className="card" style={{width:"16rem"}} key={i}>
                        <img className='card-img-top' src={image[5]!==undefined?imageOne:imageTwo} alt={ad.company.name}/>
                        <p className="card-text">{ad.headline}</p>
                        <h5 className="card-body p-0">{ad.company.name}</h5>
                        <p className="card-text">{ad.description}</p>
                        <h6 className="card-text">{ad.primaryText}</h6>
                        <a href={`https://www.${ad.company.url}`} target='_blank' className="btn btn-primary">{ad.CTA} </a>
                    </div>
                })}
            </div>

        </div>
    )
}

export default View