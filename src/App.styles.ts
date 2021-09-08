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
})