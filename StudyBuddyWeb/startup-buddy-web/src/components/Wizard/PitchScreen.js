import React from "react";
import {Card, CardContent, Box} from "@mui/material";
import { Grid } from "@mui/material";

const PitchScreen = () => {
    return (
        <Card>
        <CardContent>
        <h1>Create a powerfull business presentation</h1>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Box paddingBottom={3} sx={{ mr: 2 }}>
            <div>
            Still, nearly all of us have to give business presentations every so often — especially salespeople. And the most daunting part of preparing for any presentation is that there’s always room to improve. 
            Even the most seasoned speakers headlining at conferences or reps who top the leaderboard every month can improve their storytelling, deliver their message more clearly, and perfect their physicality. And so can you.
            There are an infinite number of presentation tips out there, so we’ve distilled the vast pool of tips down to what will make the biggest impact on your presentation — and we’ve left you with actionable takeaways you can apply to your presentations today.
            </div>
            <h1>Guideline</h1>
            <div>
                <a href="https://blog.hubspot.com/sales/sales-presentation-titles-excerpt">How to Make a Business Presentation in 7 Easy Steps</a> <br></br>
                <a href="https://visme.co/blog/business-plan-presentation/">Business Plan Presentation</a> <br></br>
                <a href="https://visme.co/blog/business-presentation/">Types and tricks</a>
            </div>
            </Box>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );};

export default PitchScreen;