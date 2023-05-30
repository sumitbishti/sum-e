import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";
import { FormField } from "../components";
import { Loader } from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
	setForm,
	generateImageReducer,
	postImage,
} from "../features/post/postSlice";

const createPost = () => {
	const dispatch = useDispatch();
	const { loading, generatingImg, form } = useSelector((store) => store.post);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			postImage(navigate);
		} else {
			alert("Please generate an image with proper details");
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
	};
	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		dispatch(setForm({ ...form, prompt: randomPrompt }));
	};

	const generateImage = (e) => {
		e.preventDefault();
		if (form.prompt) {
			dispatch(generateImageReducer());
		} else {
			alert("Please provide proper prompt");
		}
	};

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
				<p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
					Create imaginitive and visually stunning images through SUM-E AI.
				</p>
			</div>

			<form className="mt-16 max-w-3xl" onSubmit={generateImage}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Your name"
						type="text"
						name="name"
						placeholder="John Doe"
						value={form.name}
						handleChange={handleChange}
					/>
					<FormField
						labelName="prompt"
						type="text"
						name="prompt"
						placeholder="A delicious dish with humans in it"
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>

					<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className="w-full h-full object-contain"
							/>
						) : (
							<img
								src={preview}
								alt="preview"
								className="w-9/12 h-9/12 object-contain opacity-40"
							/>
						)}

						{generatingImg && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loader />
							</div>
						)}
					</div>
				</div>
				<div className="mt-5 flex gap-5">
					<button
						className="bg-green-700 rounded-md text-white font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						type="submit"
						onClick={generateImage}
					>
						{generatingImg ? "Generating..." : "Generate Image"}
					</button>
				</div>
				<div className="mt-8">
					<p className="mt-2 text-[#666e75] text-[14px]">
						Share your amazing creation with the community
					</p>
					<button
						type="button"
						onClick={handleSubmit}
						className="mt-3 bg-[#6469ff] rounded-md text-sm w-full font-medium text-white text-center sm:w-auto px-5 py-2.5"
					>
						{loading ? "Sharing..." : "Share with Community"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default createPost;
