exports.uploadResume = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(201).json({
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};
