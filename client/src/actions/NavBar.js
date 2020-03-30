export const logout = () => {
    const url = "/RegularUser/logout";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                console.log("successfully log out");
            }
        })
        .catch(error => {
            console.log(error);
        });
};
