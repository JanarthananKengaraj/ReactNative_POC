import React from "react";

class Api_Handler extends React.Component{
    constructor(props){
        super(props);
    }

    static async getAPI(api,method) {
        try {
            const response = await fetch(api,{
                method:method,
                headers:{
                    Accept:'application/json',
                    Content_Type: 'application/json'
                }
            })
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            return null;
        }
    };
}

export default (Api_Handler);