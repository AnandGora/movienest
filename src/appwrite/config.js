import conf from '../conf/conf.js';
import { Client, ID, Databases, Query } from "appwrite";

export class Service{
    client = new Client(); 
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createMovie({title, slug, category, genre, director, actors, release_year, movie_poster_url, description, download_link, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    category,
                    genre,
                    director,
                    actors,
                    release_year,
                    movie_poster_url,
                    description,
                    download_link,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createMovie :: error", error);
        }
    }

    async updateMovie(slug, {title, category, genre, director, actors, release_year, movie_poster_url, description, download_link, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    category,
                    genre,
                    director,
                    actors,
                    release_year,
                    movie_poster_url,
                    description,
                    download_link,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateMovie :: error", error);
        }
    }

    async deleteMovie(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteMovie :: error", error);
            return false
        }
    }

    async getMovie(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getMovie :: error", error);
            return false
        }
    }

    async getMovies(queries = [Query.equal("status", "active")], limit = 8, offset = 0){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [...queries, Query.limit(limit), Query.offset(offset)]               
            )
        } catch (error) {
            console.log("Appwrite serive :: getmovies :: error", error);
            return false
        }
    }

}

const service = new Service()
export default service