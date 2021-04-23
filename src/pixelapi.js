import React, { useState } from "react";  
import axios from 'axios';  
import { Card, CardGroup } from 'react-bootstrap';  
//import Pagination from './Pagination'
import Pagination from "react-js-pagination";


function PixelApi() {  
    const [search, setSearch] = useState("");  
    const [perPage, setPerPage] = useState("");  
    const [currentPage, setCurrentPage] = useState(1);  
    const [imgPerPage] = useState(12);  
    const [result, setResult] = useState([]);  
  
    function handleChange(event) {  
        const search = event.target.value;  
        setSearch(search);  
    }  
    function noOfPics(event) {  
        const perPage = event.target.value;  
        setPerPage(perPage);  
    }  

    const indexOfLastImg = currentPage * imgPerPage;
    const indexOfFirstImg = indexOfLastImg - imgPerPage;
    const currentImg = result.slice(indexOfFirstImg, indexOfLastImg);
    console.log(result.length);
    const totalPages = Math.floor(perPage / 12) + 1;

   // const paginate = pageNumber => setCurrentPage(pageNumber);

   const paginate = ( pageNumber ) => {
    console.log( `active page is ${ pageNumber }` );
    setCurrentPage( pageNumber )
 };
  
    function handleSubmit(event) {  
        event.preventDefault();  
        const url = "https://api.pexels.com/v1/search?query=Beauty+Salon&per_page=100" ;  
        const access_token = '563492ad6f917000010000013cb6a1002c044f51b7aac14f043d6c09';  
        axios.get(url, {  
            headers: {  
                'Authorization': `${access_token}`  
            }  
        }).then(data => {  
            console.log(data);  
            setResult(data.data.photos);  
        })  
  
    }  

    window.addEventListener("load", handleSubmit);

    return (  
        
        <div>
        <form onSubmit={handleSubmit}>  
            <div class="container" style={{ 'margin-top': '100px' }}>  
                <div class="row">  
                    {currentImg.map(search => (  
                        <div className="pixelCard">  
                        <CardGroup>
                            <Card style={{ 'margin-top': '10px' }}>  
                              <Card.Link href={search.src.original}>
                                <Card.Img variant="top" src={search.src.original} alt={search.photographer} />   
                                </Card.Link>
                            </Card> 
                        </CardGroup> 
                        </div>  
                    ))}  
                </div>  
            </div>  
        </form>  
        <div className="pagination">
            <Pagination
               activePage={ currentPage }
               itemsCountPerPage={ imgPerPage }
               totalItemsCount={ result.length }
               pageRangeDisplayed={ 9 }
               onChange={ paginate }
            />
         </div>
        {/* <Pagination imgPerPage={imgPerPage} totalImages={result.length} paginate={paginate} /> */}
        </div>
    )  
}  
  
export default PixelApi