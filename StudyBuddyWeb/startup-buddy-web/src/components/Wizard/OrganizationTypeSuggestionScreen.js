import { useEffect, useState } from "react";
import useHttp from "../http/useHttp";
import { Card, CardContent } from "@mui/material";
import classes from '../Wizard/Wizard.module.css';

const OrganizationTypeSuggestionScreen = () => {
    const [suggestions, setSuggestions] = useState([''])

    const { fetchData, response } = useHttp({
        autoRun: false,
        method: "get",
        url: "/OrganizationType/GetSuggestion",
        headers: {
            "content-type": "application/json",
        },
    });

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (response != null) {
            setSuggestions(response);
        }
    }, [response])

    return (
        <Card className={classes.wizard_container}>
            <CardContent>
                <h2>Din datele completate de tine, iti sugeram sa creezi compania sub forma uneia dintre aceste entitati juridice:</h2>
                {suggestions.map((suggestion, key) => <h3 key={key}>{suggestion}</h3>)}
            </CardContent>
        </Card>
    )
}

export default OrganizationTypeSuggestionScreen;