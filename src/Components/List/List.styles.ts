import {StyleSheet} from 'aphrodite/no-important';


export default StyleSheet.create({
    listChildren: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        left: 25,
        borderLeft: '1px solid',
        paddingLeft: 15
    },
    activeChild: {
        fontWeight: 'bold',
    },
    nonActiveChild: {
        fontWeight: 'normal'
    },
    titleContainer: {
        cursor: 'pointer',
    }
});