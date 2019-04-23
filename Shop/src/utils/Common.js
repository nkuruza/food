export var Common = {
    serializeJSON: (data) => {
        return Object.keys(data).map((keyName) => {
            return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
    },
    formatMoney: (money) => {
        return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}