import {StyleSheet} from 'aphrodite/no-important';


export default StyleSheet.create({
    container: {
        display: 'flex',
    },
    slider: {
        padding: '20px',
    },
    dataContainer: {
        flex: 1,
    },
    left: {
        flex: '0 0 300px',
        display: 'flex',
        flexDirection: 'column',
    },
    sideBar: {
        display: 'flex',
        height: 0,
        flexWrap: 'wrap',
        flex: 1
    },
    filteredData: {
        border: '1px solid black',
        height: '100px',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
})