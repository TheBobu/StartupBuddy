import { useEffect, useState } from "react";
import useHttp from "../http/useHttp";
import {Card, CardContent} from "@mui/material";
import classes from '../Wizard/Wizard.module.css';

const ExportDataScreen = () => {
    const [file,setFile] = useState({name:'', content:'', size:0, contentType:''})
    const {fetchData, response } = useHttp({
        autoRun: false,
        method: "get",
        url: "/Export/GenerateArchive",
        headers: {
          "content-type": "application/json",
        },
      });
    
    useEffect(()=>{
        fetchData()
    },[])
    
    useEffect(()=>{
        if(response!=null){
            setFile(response);
        }
    },[response])


    return (
        <Card className={classes.wizard_container}>
            <CardContent>
            <h1>Download your portfolio</h1>
            <a download={file.name} href={`data:${file.contentType};base64,${file.content}`}>Download Archive</a>
            </CardContent>
        </Card>
    );
}

export default ExportDataScreen;