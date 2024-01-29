// Your code here
async function getProducts(productsUrl, categoriesUrl) {
	const responseProducts = await fetch(productsUrl);
	const products = await responseProducts.json();
	const responseCategories = await fetch(categoriesUrl);
	const categories = await responseCategories.json();

	return products.map(({ name, category }) => {
		const { name: categoryName } = categories.find(
			({ id, name }) => id === category,
		);
		const product = { name, category: categoryName };
		return product;
	});
}

getProducts('https://danit.com.ua/products', 'https://danit.com.ua/categories')
	.then((result) => {
		const productsList = result
			.map((e) => `<li>Название: ${e.name}. Категория: ${e.category}.</li>`)
			.join('');
		document.body.insertAdjacentHTML('beforeend', `<ul>${productsList}</ul>`);
	})
	.catch((err) => console.log(err));
