import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Grid } from "@mui/material";

const FundRaisingScreen = () => {
    return (
        <Card>
        <CardContent>
        <h1>Fund Raising Posibilities</h1>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
            <h1>Guideline</h1>
            <div>
                <a href="https://www.ansarada.com/capital-raise/strategies">How to raise capital for a startup</a> <br></br>
                <a href="https://ifactor.ai">Types of fund raising</a> <br></br>
                <a href="http://biroulcontabil.ro/2015/07/07/modalitati-de-finantare-a-unei-afaceri/">Fund raising strategies</a>
            </div>
            </Box>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );};

export default FundRaisingScreen;