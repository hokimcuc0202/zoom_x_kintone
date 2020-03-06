const common = {
    sendRequest: (url, method, header, data) => {
        return new Promise((resolve, reject) => {
            kintone.proxy(url, method, header, data, (resp) => {
            resolve(resp)
            }, (error) => {
            reject(error)
            });
        })
    },
    extractUrlValue: (key, url) => {
        if (typeof (url) === 'undefined')
          url = window.location.href;
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    },
    getFields: (event) => {
        const fields = []
        const record = event.records[0];
        for (const key in record) {
            if (record.hasOwnProperty(key)) {
                fields.push({
                    label: key,
                    value: key
                })
            }
        }
        return fields;
    }
}
module.exports = common;