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
          password: json.password,
          gender: json.gender,
          GPA: json.GPA,
          levelOfEducation: json.levelOfEducation,
          fieldOfStudy: json.fieldOfStudy
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

  console.log("check course taking");
  const url_courseTaking = "/RegularUser/profile/courseTaking";
  fetch(url_courseTaking)
    .then(res => {
      if (res.status === 200) {
        console.log("find course taking");
        return res.json();
      }
    })
    .then(json => {
      if (json && json.courses) {
        console.log(json);
        Profile.setState({
          courseTaking: json.courses
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

  console.log("check course teaching");
  const url_courseTeaching = "/RegularUser/profile/courseTeaching";
  fetch(url_courseTeaching)
    .then(res => {
      if (res.status === 200) {
        console.log("find course teaching");
        return res.json();
      }
    })
    .then(json => {
      if (json && json.courses) {
        console.log(json);
        Profile.setState({
          courseTeaching: json.courses
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateProfileForm = (Profile, field) => {
  const value = field.value;
  const name = field.name;
  Profile.setState({
    [name]: value
  });
};

export const switchView = Profile => {
  if (Profile.state.edit) {
    Profile.setState({
      edit: false
    });
  } else {
    Profile.setState({
      edit: true
    });
  }
};

export const CancelButton = Profile => {
  readCookie(Profile);
  switchView(Profile);
};

// export const remove_courseTaking = (Profile, )
