function fetchData() {
    return new Promise((resole, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                resole("Data fetched Successfully");
            }
            else {
                reject("Error Fetching Data");
            }
        }, 5000)
    });
}
fetchData()
    .then((data) => {
        console.log(data)
        return "Kapil Sarkar"
    })
    .then((value) => {
        console.log(value)
    })

    .catch((error) => {
        console.error(error)
    });
