
import { StyleSheet, Dimensions } from 'react-native';

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
    selectorText: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'center'
    },
    selectorButton: {
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 3,
        margin: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 2
    },
    selectorTextSelected: {
        fontSize: 13,
        color: '#222',
        alignSelf: 'center'
    },
    selectorButtonSelected: {
        backgroundColor: '#78EBFC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 3,
        margin: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        flex: 3
    },
    selectorTitleText: {
        fontSize: 15,
        color: '#ccc',
        alignSelf: 'flex-start'
    },
    productStepDown: { borderRadius: 50, width: 100, height: 100, borderWidth: 2, borderColor: '#dc7676', },
    productStepUp: { borderRadius: 50, width: 100, height: 100, borderWidth: 2, borderColor: '#76dc76', },
    productStepText: { textAlign: "center", textAlignVertical: "center", fontSize: 50, alignSelf: "stretch", flex: 1 },
    counterText: { fontSize: 50, margin: 10, textAlignVertical: "center", },
    itemActionButton: {
        backgroundColor: '#48BBEC',
        minWidth: 50,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5
    },
    itemActionButtonText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
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
    shop: {
        padding: 5,
        margin: 10,
        flexDirection: "column"
    },
    shopName: {

    },
    merchantShopImage: {
        height: 100,
        flex: 2,
        margin: 5
    },
    marketShop: {
        marginBottom: 15
    },
    tagItem: {
        marginRight: 10,
        backgroundColor: "#cccccc",
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5
    },
    marketShopImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    marketShopImageContainer: {
        height: 200,
        overflow: "hidden"
    },
    productImage: {
        height: 200,
        margin: 5
    },
    merchantShopDetails: {
        height: 60,
        flex: 3
    },
    itemActionBar: {
        flexDirection: "row",
        padding: 3,
        backgroundColor: "#898989"
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
    merchantOrderItem: {
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
        flexDirection: "row"
    },
    headerButton: {
        flexDirection: 'row',
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 3,
        marginRight: 3,
        paddingLeft: 5,
        paddingRight: 5,
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
        marginLeft: 5,
        marginRight: 5,
        padding: 2,
        flex: 1,
    },
    placed: {
        backgroundColor: '#dd2222'
    },
    rejected: {
        backgroundColor: '#22ddff'
    },
    accepted: {
        backgroundColor: '#22dd22'
    },
    preparing: {
        backgroundColor: '#22ff22'
    },
    ready: {},
    customerAccepted: {},
    map: {
        width: "100%",
        height: "80%",
        paddingBottom: 100
    },
    mapThumbnail: {
        width: 100,
        height: 100,
    },
    menuItem: {
        backgroundColor: "#ccc",
        borderBottomWidth: 1,
        padding: 2,
        flexDirection: "row",
        height: 26,
    },
    menuItemIcon: {
        flex: 1, 
        alignSelf: "flex-start"
    },
    menuItemCount: {
        borderWidth: 1, 
        borderRadius: 10, 
        width: 20, 
        height: 20, 
        textAlign: "center"
    }

});