// import { Preferences } from "@capacitor/preferences";

// set object
async function setObject(key, object) {
	await Preferences.set({
		key: key,
		value: JSON.stringify(object),
	})
		.then((res) => {
			console.log({ res: res, msg: `Saved object succesfully` });
			localStorage.setItem(key, JSON.stringify(object));
		})
		.catch((err) => console.log(err));
}

// set item
async function setItem(key, item) {
	await Preferences.set({
		key: key,
		value: item,
	})
		.then((res) => {
			console.log({ res: res, msg: `Saved Item succesfully` });
			localStorage.setItem(key, item);
		})
		.catch((err) => console.log(err));
}

// // get object
// async function getObject(key) {
// 	const ret = await Preferences.get({ key: key })
// 		.then((res) => console.log({ res: res, msg: `Gotten Object Successfully` }))
// 		.catch((err) => console.log(err));
// 	const obj = JSON.parse(ret.value);
// 	return obj;
// }

// //get item
// async function getItem(key) {
// 	const ret = await Preferences.get({ key: key })
// 		.then((res) => console.log({ res: res, msg: `Gotten Item Successfully` }))
// 		.catch((err) => console.log(err));
// 	return ret.value;
// }

//clear storage
async function clearStorage() {
	const ret = await Preferences.clear()
		.then((res) => {
			console.log({ res: res, msg: `Cleared Storage succesfully` });
			localStorage.clear();
		})
		.catch((err) => console.log(err));
}

// const storageUtils = { clearStorage, getItem, getObject, setItem, setObject };

// export default storageUtils;
