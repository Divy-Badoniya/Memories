import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from "react-redux"
import { getPosts, getPostsBySearch } from "../../Actions/posts"
import Paginate from '../Pagination/Pagination';
import useStyles from "./styles"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const [currentPostId, setCurrentPostId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery()
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const [searchTitle, setSearchTitle] = useState("")
    const [tagSearch, setTagSearch] = useState([])
    const navigate = useNavigate()

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            searchPost()
        }
    }

    const handleTagAdd = (tag) => setTagSearch([...tagSearch, tag])

    const handleTagDelete = (tag) => setTagSearch(tagSearch.filter((t) => t !== tag))

    const searchPost = () => {
        if (searchTitle.trim() || tagSearch) {
            dispatch(getPostsBySearch({ searchTitle: searchTitle==='' ? 'none' : searchTitle, tagSearch: tagSearch.join(',') }))
        } else {
            navigate('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={searchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} onKeyPress={handleKeyPress} />
                            <ChipInput style={{ margin: "10px 0px" }} value={tagSearch} label="Seacrh Tags" onAdd={handleTagAdd} onDelete={handleTagDelete} variant="outlined" />
                            <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <Form currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />
                        <Paper elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts currentPostId={currentPostId} setCurrentPostId={setCurrentPostId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home