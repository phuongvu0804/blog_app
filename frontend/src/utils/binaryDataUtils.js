export const handleConvertBinaryData = (data) => {
    if (data && data.data && data.data.length > 0) {
        // because image field is not required
        try {
            const base64String = btoa(
                new Uint8Array(data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''),
            );
            return `data:image/png;base64,${base64String}`;
        } catch (error) {
            console.log('Error converting binary data to base64:', error);
        }
    }
    return null;
};
