import app from ".";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}.`));
