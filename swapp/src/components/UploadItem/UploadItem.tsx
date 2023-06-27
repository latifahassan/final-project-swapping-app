import supabase from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./UploadItem.css";
import { styled } from "@mui/system";
import { Box, TextField, Button } from "@mui/material";

const StyledForm = styled("form")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2),
	maxWidth: "100vw",
	margin: "o auto",
	marginBottom: "40px",
}));

const FileInputWrapper = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "150px",
	height: "150px",
	border: "1px solid black",
	borderRadius: "8px",
	transition: "border-color 0.3s ease",
});

const HiddenFileInput = styled("input")({
	display: "none",
});

export default function UploadItem() {
	const [user, setUser] = useState<any>(null);
	const [images, setImages] = useState<any[]>([]);
	const [isUserLoaded, setIsUserLoaded] = useState(false);
	const [title, setTitle] = useState("");
	const [uploadedFilePath, setUploadedFilePath] = useState("");

	useEffect(() => {
		console.log("setUploadedFilePath:", uploadedFilePath);
	}, [uploadedFilePath]);

	useEffect(() => {
		async function fetchUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setIsUserLoaded(true);
		}
		fetchUser();
	}, []);

	console.log(images);

	function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.target.value);
	}

	useEffect(() => {
		// this shows an up-to-date value for title. Adding a console log to handleTitleChange shows that the value of title is always one character behind the value of the text input
		console.log("title:", title);
	}, [title]);

	async function getImages() {
		const { data, error } = await supabase.storage
			.from("images")
			.list(user?.id + "/", {
				limit: 100,
				offset: 0,
				sortBy: { column: "name", order: "asc" },
			});
		if (data) {
			console.log("getImages function got data:", data);
			setImages(data);
		} else {
			console.log(error);
			alert("Error loading images.");
		}
	}

	async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		let file = e.target.files?.[0];
		if (user && file) {
			// Create a unique filename for the uploaded file using the uuid package, and make the path the same as the current user's ID
			const filePath = user?.id + "/" + uuid();
			const { data, error } = await supabase.storage
				.from("images")
				.upload(filePath, file);
			console.log("uploadImage function sent data to storage:", data);
			if (data) {
				setUploadedFilePath(filePath);
				getImages();
				console.log("getImages function got images:", images);
			} else {
				console.log(error);
			}
		} else if (!user) {
			alert("You must be logged in to upload an image.");
		}
	}

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		try {
			console.log(
				"handleFormSubmit function has been called on form submission."
			);
			e.preventDefault();
			console.log("user:", user);
			console.log("title:", title);
			console.log("uploadedFilePath:", uploadedFilePath);
			if (user && title && uploadedFilePath) {
				const { data: insertData, error: insertError } = await supabase
					.from("items")
					.insert([
						{
							title: title,
							user_id: user?.id,
							image: `https://utocnplrsihspihnbpne.supabase.co/storage/v1/object/public/images/${uploadedFilePath}`,
						},
					]);
				console.log("insertData variable from handleFormSubmit:", insertData);
				if (insertError) {
					console.error(insertError);
					alert("Error inserting new item.");
				}
				// Reset text input to empty string ready for next item that the user wants to list
				setTitle("");
				// Reset uploadedFilePath to empty string ready for next item that the user wants to list
				setUploadedFilePath("");
				getImages();
			} else if (!user) {
				alert("You must be logged in to list an item.");
			}
		} catch (error) {
			console.error("Error in handleFormSubmit:", error);
		}
	}

	return (
		<StyledForm onSubmit={handleFormSubmit}>
			<FileInputWrapper>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					width="100%"
					height="100%"
					textAlign="center"
				>
					<HiddenFileInput
						type="file"
						name="file"
						accept="image/png,image/jpeg,image/jpg,image/webp"
						onChange={uploadImage}
					/>
					<Box fontSize="14px" fontWeight="bold">
						Upload an image
					</Box>
				</Box>
			</FileInputWrapper>
			<TextField
				label="Item title"
				variant="outlined"
				name="title"
				value={title}
				onChange={handleTitleChange}
			/>
			<div className="buttonContainer">
				<Button
					type="submit"
					variant="contained"
					disabled={!isUserLoaded || !uploadedFilePath}
				>
					List it!
				</Button>
			</div>
			{!isUserLoaded && <p>Loading user session...</p>}
		</StyledForm>
	);
}
