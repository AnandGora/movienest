import { useState } from "react";

const MovieRequestForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        comments: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/request-movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert("Error submitting request. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Movie Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Genre:
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />
            </label>
            <label>
                Comments:
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Request Movie</button>
        </form>
    );
};

export default MovieRequestForm;
