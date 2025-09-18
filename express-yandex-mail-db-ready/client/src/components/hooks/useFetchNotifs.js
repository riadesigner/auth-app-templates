import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

import api from '../../utils/api'

export default function useFetchNotifs(){

    const ITEMS_ON_PAGE = 6;

    const [notifications, setNotifications] = useState([]);        
    const [currentPage, setCurrentPage] = useState(1);    
    const [nowLoading, setNowLoading] = useState(true);    

    const [paginationParams, setPaginationParams] = useState({
         "currentPage": 1, 
         "totalPages": 1, 
         "totalOrders": 1, 
         "hasNext": false, 
         "hasPrev": false, 
         "nextPage": 2, 
         "prevPage": 0
        })

    const isFirstRender = useRef(true);    

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // пропускаем первый рендер
        }   

        const fetchNotifications = async ()=>{
            setNowLoading(true)

            const query = [
                `/notifications?`,
                `page=${currentPage}&limit=${ITEMS_ON_PAGE}`,
                `&rnd=${Date.now()}`
                ].join('');

                const response = await api.get(query);
                setNowLoading(false)

                if (response && response.data.success) {            
                    const arrNotifications = response.data.notifications;
                    const pagination = response.data.pagination;
                    arrNotifications && setNotifications(arrNotifications);
                    pagination && setPaginationParams(pagination);
                }
        }

        fetchNotifications();

    },[currentPage]);

    return {
        nowLoading,
        notifications,
        currentPage, 
        setCurrentPage,
        paginationParams,        
        }

}