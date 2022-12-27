import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import { app } from "../../firebase";

const ref = firebase.firestore(app).collection("blogs");
const storageRef = firebase.storage().ref();

const initialState = {
    blogs: [],
    recentBlogs: [],
    currentPageBlogs: [],
    blogToEdit: {},
    currentPage: 1,
    totalPages: null,
    wrongPage: false,
    searchResults: [],
    loading: false,
    errorMessage: "",
    filterStatus: "",
    statuses: ['All', 'Travel', 'Health', 'Lifestyle', 'Food', 'Sports', 'Self-Improvement']
}

const getPageBounds = pageNumber => {
    // 1 = 0-9
    // 2 = 10-19
    // 3 = 20-29
    // 4 = 30-39
    let lowerBound;
    let upperBound = pageNumber * 10 - 1;
    if (pageNumber === 1) {
        lowerBound = 0;
    } else {
        lowerBound = (pageNumber - 1) * 10;
    }
    return {lowerBound, upperBound};
}

export const fetchBlogs = createAsyncThunk('/blogs/fetchBlogs', async () => {
    try {
        const blogs = []
        const response = await ref.orderBy("timeCreated", "desc").get();
        response.forEach(response => blogs.push(response.data()));
        return blogs;
    } catch (error) {
        return error;
    }
})

export const fetchBlogToEdit = createAsyncThunk('/blogs/fetchBlogToEdit', async id => {
    try {
        const response = await ref.doc(id).get();
        return response.data();
    } catch (error) {
        return error;
    }
})

export const fetchRecentBlogs = createAsyncThunk('/blogs/fetchRecentBlogs', async () => {
    try {
        const recentBlogs = []
        const response = await ref.orderBy("timeCreated", "desc").limit(6).get();
        response.forEach(response => recentBlogs.push(response.data()));
        return recentBlogs;
    } catch (error) {
        return error;
    }
})

export const searchBlogs = createAsyncThunk('/blogs/searchBlogs', async (searchValue) => {
    try {
        const results = [];
        const response = await ref.get();
        const searchKey = searchValue.toLowerCase();
        response.forEach(response => results.push(response.data()));
        const searchResults = results.filter(result => {
            return result.name.toLowerCase().includes(searchKey) || 
            result.desc.toLowerCase().includes(searchKey) || 
            result.topic.toLowerCase().includes(searchKey)
        })
        return searchResults;
    } catch (error) {
        return error;
    }
})

export const addBlog = createAsyncThunk('/blogs/addBlog', async (blogDetails) => {
    const { image } = blogDetails;
    const dateCreated = new Date().toDateString();
    const timeCreated = new Date().getTime();
    const id = (Math.floor(Math.random() * 10000) + 1).toString();
    await storageRef.child(image.name).put(image);
    const url = await storageRef.child(image.name).getDownloadURL();
    const newBlog = {
        ...blogDetails,
        dateCreated,
        timeCreated,
        id,
        url,
    }
    delete newBlog.image;
    try {
        return await ref.doc(id).set(newBlog);
    } catch (error) {
        return error;
    }
})

export const deleteBlog = createAsyncThunk('/blogs/deleteBlog', async (blogId) => {
    try {
        return await ref.doc(blogId).delete();
    } catch (error) {
        return error;
    }
})

export const editBlog = createAsyncThunk('/blogs/editBlog', async (updatedBlog) => {
    try {
        return await ref.doc(updatedBlog.id).update(updatedBlog);
    } catch (error) {
        return error;
    }
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        filterBlogs: (state, action) => {
            const { category, pageNumber, type } = action.payload;
            const { lowerBound, upperBound } = getPageBounds(pageNumber ? pageNumber : 1)
            // If user navigates to category using navigation
            if (type === "navigate") {
                // Update filter status & page number
                state.filterStatus = category;
                state.currentPage = 1;
                if (category === 'All') {
                    state.totalPages = Math.ceil(state.blogs.length / 10)
                    state.currentPageBlogs = state.blogs.slice(lowerBound, upperBound + 1);
                } else {
                    // Get filtered blogs based on category
                    const filterBlogs = state.blogs.filter(blog => blog.topic === category);
                    state.totalPages = Math.ceil(filterBlogs.length / 10);
                    state.currentPageBlogs = filterBlogs.slice(lowerBound, upperBound + 1);
                }
            // If user navigates to category through URL
            } else if (type ===  "direct") {
                // Category - All
                if (category === undefined) {
                    // Update filter status & page number
                    state.filterStatus = "All";
                    // Calculate total number of pages based on category
                    state.totalPages = Math.ceil(state.blogs.length / 10);
                    // If page number does not exist, render page 1
                    if (pageNumber > state.totalPages) {
                        state.currentPage = 1;
                        state.currentPageBlogs = state.blogs.slice(0, 10);
                        state.wrongPage = true;
                    } else {
                        state.currentPage = pageNumber;
                        state.currentPageBlogs = state.blogs.slice(lowerBound, upperBound + 1);
                    }
                // Category - Others
                } else {
                    state.filterStatus = category;
                    const filteredBlogs = state.blogs.filter(blog => blog.topic === category);
                    // Calculate total number of pages based on category
                    state.totalPages = Math.ceil(filteredBlogs.length / 10);
                    // If page number does not exist, render page 1
                    if (pageNumber > state.totalPages) {
                        state.currentPage = 1;
                        state.currentPageBlogs = filteredBlogs.slice(0, 10);
                        state.wrongPage = true;
                    } else {
                        state.currentPage = pageNumber;
                        state.currentPageBlogs = filteredBlogs.slice(lowerBound, upperBound + 1);
                    }
                }
            }
        },
        resetFilter: state => {
            state.filterStatus = "";
        },
        resetSearch: state => {
            state.searchResults = [];
        },
        setBlogPage: (state, action) => {
            // Check if user clicks on a page that he is already on
            if (action.payload !== state.currentPage) {
                // Change current page to what user clicked
                state.currentPage = action.payload;
                const { lowerBound, upperBound } = getPageBounds(action.payload);
                // Check if user is in all or other category
                if (state.filterStatus === "All") {
                    state.currentPageBlogs = state.blogs.slice(lowerBound, upperBound + 1);
                } else {
                    const filteredBlogs = state.blogs.filter(blog => blog.topic === state.filterStatus);
                    state.currentPageBlogs = filteredBlogs.slice(lowerBound, upperBound + 1);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Blogs
            .addCase(fetchBlogs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                // Set all blogs and 6 most recent blogs
                state.loading = false;
                state.blogs = action.payload;
                state.recentBlogs = action.payload.slice(0, 6);
                // Check which page the user is accessing from
                // If the user is browsing "All" category
                if (state.filterStatus === "All") {
                    state.currentPageBlogs = action.payload.slice(0, 10);
                    state.totalPages = Math.ceil(action.payload.length / 10);
                } else if (state.filterStatus !== "" && state.filterStatus !== "All") {
                    state.currentPageBlogs = state.blogs.filter(blog => blog.topic === state.filterStatus);
                    state.totalPages = Math.ceil((state.currentPageBlogs.length / 10));
                }
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Fetch Blog To Edit
            .addCase(fetchBlogToEdit.pending, state => {
                state.blogToEdit = {};
                state.loading = true;
            })
            .addCase(fetchBlogToEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.blogToEdit = action.payload;
            })
            .addCase(fetchBlogToEdit.rejected, state => {
                state.loading = false;
            })
            // Fetch Recent Blogs
            .addCase(fetchRecentBlogs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchRecentBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.recentBlogs = action.payload;
            })
            .addCase(fetchRecentBlogs.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })
            // Add Blogs
            .addCase(addBlog.pending, state => {
                state.loading = true;
            })
            .addCase(addBlog.fulfilled, state => {
                state.loading = false;
            })
            .addCase(addBlog.rejected, state => {
                state.loading = false;
            })
            // Remove Blog
            .addCase(deleteBlog.pending, state => {
                state.loading = true;
            })
            .addCase(deleteBlog.fulfilled, state => {
                state.loading = false;
            })
            .addCase(deleteBlog.rejected, state => {
                state.loading = false;
            })
            // Edit Blog
            .addCase(editBlog.pending, state => {
                state.loading = true;
            })
            .addCase(editBlog.fulfilled, state => {
                state.loading = false;
            })
            .addCase(editBlog.rejected, state => {
                state.loading = false;
            })
            // Search Blog
            .addCase(searchBlogs.pending, state => {
                state.loading = true;
            })
            .addCase(searchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchBlogs.rejected, state => {
                state.loading = false;
            })
    }
})

export const { filterBlogs, resetFilter, resetSearch, setBlogPage } = blogsSlice.actions;
export default blogsSlice.reducer;