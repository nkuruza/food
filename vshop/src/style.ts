
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    titleText: {
        fontSize: 20,
        color: '#ccc',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    product: {
        backgroundColor: '#ffffff',
    },
    merchant: {
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: '#ddd',
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    merchantAvi: {
        paddingTop: 5,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30
    },
    cartItemImage: {
        width: 30,
        height: 30,
        flex: 2,
    },
    cartItemTitle: {

    },
    cartItemDesc: {

    },
    cartItemText: {
        flex: 4,
        flexDirection: 'column'
    },
    imgX4: {
        width: 40,
        height: 40
    },
    cartItemQty: {
        margin: 5,
    },
    cartItemPrice: {
        margin: 5,
    },
    cartItem: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    itemSeparator: {
        borderWidth: 1,
        borderColor: '#222',
        width: '86%',
        marginLeft: '7%'
    },
    headerRight: {
    },
    headerButton: {
        flexDirection: 'row',
        flex: 1,
        width: 40, height: 20,
        borderRadius: 10,
    },
    orderItem: {
        flexDirection: 'row',
        flex: 1,
    },
    orderItemDetails: {

    },
    orderCustomer: {
        fontSize: 26,
        flex: 2
    },
    orderTotal: {  
        flex: 3
    },
    orderHeader: {
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
    },
    orderFooter: {
        flexDirection: 'row',
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'center',
    },
    orderFooterButton: {
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 1
    },
    orderStatus: {
        padding: 5,
        flex: 1
    },
    placed: {
        backgroundColor: '#dd2222'
    },
    viewed: {
        backgroundColor: '#22ddff'
    },
    accepted: {
        backgroundColor: '#22dd22'
    },
    preparing: {
        backgroundColor: '#22ff22'
    },
    ready: {},
    customerAccepted: {}
});