import React, { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

const useShowToast = () => {
    const Toast=useToast();
    const ShowToast=useCallback((title,description,status)=>{
        Toast({
            title,
            description,
            status,
            duration:3000,
            isClosable:true
        })
    },[Toast])
    return ShowToast;
}

export default useShowToast