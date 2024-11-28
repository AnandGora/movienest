import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MovieForm({ movie }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: movie?.title || "",
            slug: movie?.$id || "",  // Slug is set from $id only if editing, else will be generated.
            category: movie?.category || [],
            genre: movie?.genre || [],
            director: movie?.director || [],
            actors: movie?.actors || [],
            release_year: movie?.release_year || "",
            movie_poster_url: movie?.movie_poster_url || "",
            description: movie?.description || "",
            download_link: movie?.download_link || [],
            status: movie?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
    
            // Prepare the data for submission
            const formattedData = {
                ...data, 
                genre: Array.isArray(data.genre) ? data.genre : [data.genre],
                category: Array.isArray(data.category) ? data.category : [data.category],
                director: Array.isArray(data.director) ? data.director : [data.director],
                actors: Array.isArray(data.actors) ? data.actors : [data.actors],
                download_link: Array.isArray(data.download_link) ? data.download_link : [data.download_link],
                slug: movie ? movie.slug : slugTransform(data.title), // Generate slug if new movie
            };
    
            let dbmovie;
    
            if (movie && movie.$id) {
                // Update movie if it exists
                dbmovie = await appwriteService.updateMovie(movie.$id, formattedData);
            } else {
                // Create new movie if no movie exists
                dbmovie = await appwriteService.createMovie({ ...formattedData, userId: userData.$id });
            }
    
            if (dbmovie) {
                // Redirect to the movie's page after creation/update
                navigate(`/movie/${dbmovie.$id}`);
            }
        } catch (error) {
            console.error("Error submitting movie:", error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Movie Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">Category :</label>
                <Select
                    options={["Bollywood", "Hollywood", "South Indian Hindi Dubbed"]} // Replace with your categories
                    isMulti={true} // Allow multiple selections
                    placeholder="Select Categories"
                    className="mb-4"
                    {...register("category", { required: true })}
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">Genre :</label>
                <Select
                    options={["Action", "Drama", "Comedy", "Horror", "Romance"]}
                    label="Genre :"
                    isMulti={true}
                    {...register("genre", { required: true })}
                />
                <Input
                    label="Director :"
                    placeholder="Director Name"
                    className="mb-4"
                    {...register("director", { required: true })}
                />
                <Input
                    label="Actors :"
                    placeholder="Main Actors (comma-separated)"
                    className="mb-4"
                    {...register("actors", { required: true })}
                />
                <Input
                    label="Release Year :"
                    placeholder="e.g., 2023"
                    type="text"  // Change to text since it's a string now
                    maxLength={4}  // Ensure only 4 characters are entered
                    className="mb-4"
                    {...register("release_year", {
                        pattern: {
                            value: /^[0-9]{4}$/,  // Regex to ensure YYYY format
                            message: "Release year must be in YYYY format"
                        }
                    })}
                />
                <Input
                    label="Movie Poster URL :"
                    placeholder="Paste the image URL"
                    className="mb-4"
                    {...register("movie_poster_url", { required: true })}
                />
                <textarea
                    placeholder="Enter movie description..."
                    className="w-full p-2 mb-4 border rounded-lg"
                    {...register("description", { required: true })}
                />
                <Input
                    label="Download Link :"
                    placeholder="Movie Download Link"
                    className="mb-4"
                    {...register("download_link", { required: true })}
                />
            </div>
            <div className="w-1/3 px-2">
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={movie ? "bg-green-500" : undefined} className="w-full">
                    {movie ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
