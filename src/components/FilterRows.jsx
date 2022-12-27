import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterBlogs } from "../features/blogs/blogsSlice";

const FilterRows = () => {
    const { statuses, filterStatus } = useSelector(state => state.blogsSlice);
    const dispatch = useDispatch();
    const useStyles = makeStyles({
        active: {
            borderBottom: '2px solid black',
            cursor: 'pointer'
        },
        filterItem: {
            cursor: 'pointer'
        }
    });

    const classes = useStyles();

    const clickHandler = statusType => {
        dispatch(filterBlogs({
            category: statusType,
            type: "navigate"
        }));
    }

    return statuses.map(statusType => (
        <Link to={statusType === "All" ? '/blogs/all/1' : `/blogs/category/${statusType}/1`} key={statusType}>
            <li
                className={`${filterStatus === statusType ? `${classes.active}` : `${classes.filterItem}`}`}
                onClick={() => clickHandler(statusType)}>
                {statusType}
            </li>
        </Link>
    ))
}

export default FilterRows;