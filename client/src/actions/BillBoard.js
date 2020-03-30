export const readCookie = BillBoard => {
    const url = "/RegularUser/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                BillBoard.setState({
                    login: true,
                    username: json.currentUser
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateMessage = (BillBoard, field) => {
    const value = field.value;
    const name = field.name;
    BillBoard.setState({
        [name]: value
    });
};
