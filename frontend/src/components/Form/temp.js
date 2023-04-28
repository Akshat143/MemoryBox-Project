const handleImageChange = (e) => {
    if (e.target?.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/memory-box/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };