//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// optional: trigger on button click
// btn.addEventListener("click", Main);

function Main(){

	// Clear old content
	  output.innerHTML = "";
	
	// Loading Spinner
	let loader = document.createElement('div');
	loader.id = "loading";
	loader.innerText = "Loading..."
	output.append(loader);

	Promise.all([
		DownloadImage(images[0].url),
		DownloadImage(images[1].url),
		DownloadImage(images[2].url),
	])
	.then((img) => {
		output.innerHTML = ""; // remove loader
		output.append(...img);
	})
	.catch((err) => {
		output.innerHTML = ""; // remove loader
		
		let error = document.createElement('div');
		error.id = "error";
		error.innerText = `${err.message}`
		output.append(error);
	})
}

function DownloadImage(imageURl){
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => resolve(img); // image loaded successfully
		img.onerror = () => reject(new Error(`Failed to load Image : ${imageURl}`))

		img.src = imageURl;
	})
}