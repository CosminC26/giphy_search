import React, { useEffect, useState } from "react";
import axios from "axios";

import { Loader } from "./Loader";

export const Giphy = () => { 

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs'
    const GIPHY_API_KEY = "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe"
    


    useEffect(() => {
        
          // showing in page some giphy
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
      
            try {
              const results = await axios(`${GIPHY_API_BASE}/trending`, {
                params: {
                  api_key: GIPHY_API_KEY,
                  limit: 10
                }
              });
      
              
              setData(results.data.data);
            } catch (err) {
              setIsError(true);
              setTimeout(() => setIsError(false), 4000);
            }
      
            setIsLoading(false);
          };
      
          fetchData();
        }, []);
      

        // render Loader in component

        const renderGifs = () => {
          if (isLoading) {
            return <Loader />;
          }
          return data.map(el => {
            return (
              <div key={el.id} className="gif">
                <img src={el.images.fixed_height.url} />
              </div>
            );
          });
        };

        // catch error
        const renderError = () => {
          if (isError) {
            return (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Unable to get Gifs, please try again in a few minutes
              </div>
            );
          }
        };
      
        
        //  search function
        const handleSearchChange = event => {
          setSearch(event.target.value);
        };
      


        const handleSubmit = async event => {
          event.preventDefault();
          setIsError(false);
          setIsLoading(true);
      


          try {
            const results = await axios(`${GIPHY_API_BASE}/search`, {
              params: {
                api_key: GIPHY_API_KEY,
                q: search,
                limit: 10
              }
            });
            setData(results.data.data);
          } catch (err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
          }
      
          setIsLoading(false);
        };
      
        //  render component
        return (
            <div className="m-2">
              {renderError()}
              <form className="form-inline justify-content-center m-2">
                <input
                  value={search}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="search"
                  className="form-control"
                />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary mx-2"
                >
                  Go
                </button>
                
              </form>
              
              <div className="container gifs">{renderGifs()}</div>
            </div>
          );

};