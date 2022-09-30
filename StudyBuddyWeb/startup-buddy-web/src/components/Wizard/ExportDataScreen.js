import { useEffect, useState, useContext } from "react";
import useHttp from "../http/useHttp";
import {Card, CardContent} from "@mui/material";
import classes from '../Wizard/Wizard.module.css';
import { Grid } from "@mui/material";
import Controls from "../Controls/Controls";
import { TranslationContext } from "../../store/translation-context";
import { useHistory } from "react-router-dom";

const ExportDataScreen = () => {
    const { t } = useContext(TranslationContext);
    const history = useHistory();
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
            <Grid item xs={12}>
              <Controls.Button
                className={classes.submit_button}
                type='submit'
                text={t('General.Next')}
                onClick={()=>{history.push("/suggestionsScreen")}}
              />
            </Grid>
            </CardContent>

        </Card>
    );
}

export default ExportDataScreen;