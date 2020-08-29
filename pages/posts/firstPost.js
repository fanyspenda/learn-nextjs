import Link from "next/link";
import Head from "next/head";
import { Layout } from "../../components/layout";

const FirstPost = () => {
	return (
		<Layout>
			<Head>
				<title>First Post</title>
			</Head>
			<h1>Hello, this is First Post Page</h1>
			<h2>Happy Learning!</h2>
			<Link href="/">
				<a>go back to home</a>
			</Link>
		</Layout>
	);
};

export default FirstPost;