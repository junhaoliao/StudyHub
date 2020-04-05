
//hi I am working here
export const getRanking = (app) => {
    // the URL for the request

    const url = "/getRankings";
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //this.courseList = res.json();
                return res.json();
            } else {
                alert("Could not get course ranking");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState({
                likesRankings: json.likesRankings,
                usersRankings: json.usersRankings
            });
        })
        .catch(error => {
            console.log(error);
        });
};