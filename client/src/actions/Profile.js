export const readCookie = Profile => {
  const url = "/RegularUser/profile";
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.username) {
        console.log(json);
        Profile.setState({
          login: true,
          username: json.username,
          gender: json.gender,
          GPA: json.GPA,
          levelOfEducation: json.levelOfEducation,
          fieldOfStudy: json.fieldOfStudy,
          courseTaking: json.courseTaking,
          courseTeaching: json.courseTeaching
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
