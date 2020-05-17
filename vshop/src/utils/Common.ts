export var Common = {
    serializeJSON: (data) => {
        return Object.keys(data).map((keyName) => {
            return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
    },
    formatMoney: (money:number) => {
        return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    formatDistance: (meters: number) => {
        let dist:number = meters;
        let unit = "m";
        if(meters > 1000){
            dist = meters / 1000;
            unit = "km";
        }
        return `${Math.round(dist * 10) / 10} ${unit}`
    }
}
export interface Props {
    navigation: any,
    item: any,
    onPressItem: any
}
export var MediaType = {
    APPLICATION_JSON: 'application/json',
    APPLICATION_WWW_FORM: ''
}